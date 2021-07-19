import { User, XClientUser, UserDetail, XClient, XUserActivity, XUserNotification } from '../../db/models'
import config from '../../../config/app'
import jwt from 'jsonwebtoken'
import { getOne } from './crud'
import Sequelize, { Op } from 'sequelize'
import _ from 'lodash'

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

export const getConnectionType = async ({ user_to_follow_id, follower_id }) => {
  const followingData = await XUserActivity.findOne({
    where: {
      user_id: follower_id,
      record_id: user_to_follow_id,
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

export const followOrUnfollowUser = async ({ user_to_follow_id, follower_id, userCode }) => {
  const promises = [
    () => getConnectionType({ user_to_follow_id, follower_id }),
    () => getConnectionType({ user_to_follow_id: follower_id, follower_id: user_to_follow_id })
  ]
  const [connectionType, reverseConnectionType] = await Promise.all(promises.map(promise => promise()))

  if (!connectionType) {
    await XUserActivity.create({
      user_id: follower_id,
      record_type: userCode,
      record_id: user_to_follow_id,
      activity_type: 'connection',
      activity_value: reverseConnectionType === 'following' ? 'connected' : 'following',
      activity_permission: 'public'
    })

    if (reverseConnectionType === 'following') {
      await XUserActivity.update(
        { activity_value: 'connected' },
        {
          where: {
            user_id: user_to_follow_id,
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
        record_id: user_to_follow_id,
        activity_type: 'connection'
      }
    })

    if (reverseConnectionType === 'connected') {
      await XUserActivity.update(
        { activity_value: 'following' },
        {
          where: {
            user_id: user_to_follow_id,
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
    () => getConnectionType({ user_to_follow_id: block_user_id, follower_id: user_id }),
    () => getConnectionType({ user_to_follow_id: user_id, follower_id: block_user_id })
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
  } else if (_.isEqual(connectionType, 'blocked')) {
    return false
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

  return true
}

export const addUserNotification = async ({ user_id, notice }) => {
  await XUserNotification.create({
    user_id,
    notice
  })
}

export const getUserNotifications = async ({ user_id, offset }) => {
  const { rows, count } = await XUserNotification.findAndCountAll({
    attributes: [
      ['notification_id', 'id'],
      ['notice', 'message'],
      ['is_read', 'isRead']
    ],
    where: { user_id },
    order: [['created_on', 'DESC']],
    limit: 5,
    offset: parseInt(offset)
  })

  return {
    count,
    notifications: rows
  }
}

export const readUserNotifications = async ({ user_id, notification_ids }) => {
  await XUserNotification.update({
    is_read: true
  }, {
    where: {
      user_id,
      notification_id: notification_ids
    }
  })
}

export const deleteUserNotification = async ({ user_id, notification_id, offset }) => {
  await XUserNotification.destroy({
    where: { user_id, notification_id }
  })

  const notifications = await XUserNotification.findAll({
    attributes: [
      ['notification_id', 'id'],
      ['notice', 'message'],
      ['is_read', 'isRead'],
      ['created_on', 'createdAt']
    ],
    where: { user_id },
    order: [['created_on', 'DESC']],
    limit: 1,
    offset: parseInt(offset)
  })

  return notifications && notifications[0]
}
