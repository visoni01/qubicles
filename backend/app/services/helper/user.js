import { User, XClientUser, UserDetail, XClient, XUserActivity } from '../../db/models'
import config from '../../../config/app'
import jwt from 'jsonwebtoken'
import { getOne } from './crud'
import Sequelize, { Op } from 'sequelize'

export const getUserById = ({ user_id }) => {
  return User.findOne({ where: { user_id }, raw: true })
}

export const getClientIdByUserId = ({ user_id }) => {
  return XClientUser.findOne({ where: { user_id }, raw: true })
}

export const getClientUsers = ({ client_id }) => {
  return XClientUser.findAll({
    where: { client_id },
    raw: true
  })
}

export const getClientData = ({ client_id }) => {
  return XClient.findOne({
    where: { client_id },
    raw: true
  })
}

export const getUserDetailsByClientId = async ({ client_id }) => {
  const clientUser = await getOne({
    model: XClientUser,
    data: { client_id }
  })
  if (clientUser) {
    return UserDetail.findOne({ where: { user_id: clientUser.user_id }, raw: true })
  }
}

export const getUserDetails = ({ user_id }) => {
  return UserDetail.findOne({ where: { user_id }, raw: true })
}

export const getTokenAfterPostSignupCompleted = async ({ email, user_id, full_name, user_code }) => {
  await UserDetail.update({ is_post_signup_completed: true }, { where: { user_id } })
  const inviteLink = await getInviteLink({ user_id })
  const jwtToken = await jwt.sign({
    email,
    user_id,
    full_name,
    is_post_signup_completed: true,
    user_code,
    inviteLink
  },
  config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })

  return jwtToken
}

export const getNewTokenAfterUserCodeChanged = async ({ email, user_id, full_name, user_code }) => {
  const jwtToken = await jwt.sign({
    email,
    user_id,
    full_name,
    is_post_signup_completed: false,
    user_code
  },
  config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })

  return jwtToken
}

export const getInviteLink = async ({ user_id }) => {
  const baseInviteUrl = `${config.get('webApp.baseUrl')}/invite`
  let inviteLink = ''
  const { user: walletAddress } = await getOne({
    model: User,
    data: { user_id },
    attributes: ['user']
  })
  if (walletAddress) {
    inviteLink = `${baseInviteUrl}/${walletAddress}`
    return inviteLink
  }
}

export const getConnectionType = async ({ following_id, follower_id }) => {
  const followingData = await XUserActivity.findOne({
    where: {
      user_id: follower_id,
      record_id: following_id,
      activity_type: 'connection'
    },
    attributes: ['activity_value'],
    raw: true
  })

  return followingData && followingData.activity_value
}

export const getNoOfFollowersAndFollowings = async ({ user_id }) => {
  const followData = await XUserActivity.findOne({
    attributes: [
      [Sequelize.literal('COUNT(CASE WHEN `XUserActivity`.`record_id` = ' + user_id + ' THEN 1 END)'), 'noOfFollowers'],
      [Sequelize.literal('COUNT(CASE WHEN `XUserActivity`.`user_id` = ' + user_id + ' THEN 1 END)'), 'noOfFollowings']
    ],
    where: {
      activity_type: 'connection',
      activity_value: { [Op.in]: ['following', 'connected'] }
    },
    raw: true
  })

  return {
    noOfFollowers: followData.noOfFollowers,
    noOfFollowings: followData.noOfFollowings
  }
}

export const followOrUnfollowUser = async ({ following_id, follower_id, userCode }) => {
  const promises = [
    () => getConnectionType({ following_id, follower_id }),
    () => getConnectionType({ following_id: follower_id, follower_id: following_id })
  ]
  const [connectionType, reverseConnectionType] = await Promise.all(promises.map(promise => promise()))

  if (!connectionType) {
    await XUserActivity.create({
      user_id: follower_id,
      record_type: userCode,
      record_id: following_id,
      activity_type: 'connection',
      activity_value: reverseConnectionType === 'following' ? 'connected' : 'following',
      activity_permission: 'public'
    })

    if (reverseConnectionType === 'following') {
      await XUserActivity.update(
        { activity_value: 'connected' },
        {
          where: {
            user_id: following_id,
            record_id: follower_id,
            activity_type: 'connection'
          }
        }
      )
    }
  } else if (['following', 'connected'].includes(connectionType)) {
    await XUserActivity.destroy({
      where: {
        user_id: follower_id,
        record_id: following_id,
        activity_type: 'connection'
      }
    })

    if (reverseConnectionType === 'connected') {
      await XUserActivity.update(
        { activity_value: 'following' },
        {
          where: {
            user_id: following_id,
            record_id: follower_id,
            activity_type: 'connection'
          }
        }
      )
    }
  } else {
    return false
  }

  return true
}

export const blockOrUnblockUser = async ({ user_id, block_user_id }) => {
  const promises = [
    () => getConnectionType({ following_id: block_user_id, follower_id: user_id }),
    () => getConnectionType({ following_id: user_id, follower_id: block_user_id })
  ]
  const [connectionType, reverseConnectionType] = await Promise.all(promises.map(promise => promise()))

  if (['connected', 'following'].includes(connectionType)) {
    await XUserActivity.destroy({
      where: {
        user_id: user_id,
        record_id: block_user_id,
        activity_type: 'connection'
      }
    })
  }

  if (!reverseConnectionType) {
    await XUserActivity.create({
      user_id: block_user_id,
      record_type: 'user',
      record_id: user_id,
      activity_type: 'connection',
      activity_value: 'blocked',
      activity_permission: 'public'
    })
  } else if (reverseConnectionType === 'blocked') {
    await XUserActivity.destroy({
      where: {
        user_id: block_user_id,
        record_id: user_id,
        activity_type: 'connection'
      }
    })
  } else {
    await XUserActivity.update(
      { activity_value: 'blocked' },
      {
        where: {
          user_id: block_user_id,
          record_id: user_id,
          activity_type: 'connection'
        }
      }
    )
  }
}
