import { XUserActivity } from '../../db/models'
import { createNewEntity, getUserById, getClientUsers, getClientIdByUserId, getXQodApplications } from '../helper'
import { USER_LEVEL } from '../user/getSecurityContext'
import { Op } from 'sequelize'

export async function postStatusUpdate ({ user_id, activity_value, activity_custom, activity_permission }) {
  await createNewEntity({
    model: XUserActivity,
    data: {
      user_id,
      record_type: 'activity',
      record_id: 0,
      activity_type: 'status',
      activity_value,
      activity_custom,
      activity_permission
    }
  })
}

export async function likeStatus ({ user_id, record_id, activity_permission }) {
  await createNewEntity({
    model: XUserActivity,
    data: {
      user_id,
      record_type: 'activity',
      record_id,
      activity_type: 'like',
      activity_value: '1',
      activity_permission
    }
  })
}

export async function getStatusLikesCount ({ record_id }) {
  const totalLikes = await XUserActivity.sum('activity_value', {
    where: {
      record_type: 'activity',
      record_id,
      activity_type: 'like'
    },
    raw: true
  })
  return { likes: totalLikes }
}

export async function commentStatus ({ user_id, record_id, activity_permission, activity_value }) {
  await createNewEntity({
    model: XUserActivity,
    data: {
      user_id,
      record_type: 'activity',
      record_id,
      activity_type: 'comment',
      activity_value,
      activity_permission
    }
  })
}

export async function getStatusComments ({ user_id, record_id }) {
  const allComments = await XUserActivity.findAll({
    where: {
      record_type: 'activity',
      record_id,
      activity_type: 'comment'
    },
    order: [['created_on', 'DESC']],
    raw: true
  })
  const visibleComments = allComments.filter(comment => async function () {
    checkVisibility({
      activity_permission: comment.activity_permission,
      owner_id: comment.user_id,
      user_id
    })
  })
  return visibleComments
}

export async function getStatusUpdates ({ user_id }) {
  const allStatuses = await XUserActivity.findAll({
    where: {
      record_id: 0,
      record_type: 'activity',
      activity_type: 'status'
    },
    order: [['created_on', 'DESC']],
    raw: true
  })
  const visibleStatuses = allStatuses.filter(status => async function () {
    checkVisibility({
      activity_permission: status.activity_permission,
      owner_id: status.user_id,
      user_id
    })
  })
  return visibleStatuses
}

export async function checkVisibility ({ activity_permission, user_id, owner_id }) {
  let permission = false
  let activity, owner, user, userBelongstoCompany
  switch (activity_permission) {
    case 'public':
      permission = true
      break
    case 'followers':
      // Check if user is following the owner of the status
      activity = await XUserActivity.findOne({
        where: {
          user_id,
          record_type: 'user',
          record_id: owner_id,
          activity_type: 'connection',
          activity_value: { [Op.in]: ['following', 'connected'] }
        }
      })
      permission = !!(activity && activity.user_activity_id)
      break
    case 'company':
      // Check if current user and status owner belongs to same company
      owner = await getClientIdByUserId({ user_id: owner_id })
      userBelongstoCompany = await isUserBelongsToCompany({ user_id, client_id: owner.client_id })
      permission = userBelongstoCompany
      break
    case 'admins':
      // company constraint with user-level greater and equal to 8
      owner = await getClientIdByUserId({ user_id: owner_id })
      userBelongstoCompany = await isUserBelongsToCompany({ user_id, client_id: owner.client_id })
      user = await getUserById({ user_id: user_id })
      permission = userBelongstoCompany && (user.user_level >= USER_LEVEL.ADMIN)
      break
    case 'managers':
      // company constraint with user-level greater and equal to 7
      owner = await getClientIdByUserId({ user_id: owner_id })
      userBelongstoCompany = await isUserBelongsToCompany({ user_id, client_id: owner.client_id })
      user = await getUserById({ user_id: user_id })
      permission = userBelongstoCompany && (user.user_level >= USER_LEVEL.SUPERVISOR)
      break
  }
  return permission
}

export async function isUserBelongsToCompany ({ user_id, client_id }) {
  // Check for hired users and client users for a client_id
  const hiredUsers = await getXQodApplications({
    where: {
      client_id,
      status: 'hired'
    },
    attribute: ['user_id']
  })

  let isUserBelongsToCompany = hiredUsers.find((hiredUser) => hiredUser.user_id === user_id)
  if (!isUserBelongsToCompany) {
    const clientUsers = await getClientUsers({ client_id })
    isUserBelongsToCompany = clientUsers.find((clientUser) => clientUser.user_id === user_id)
  }

  return !!isUserBelongsToCompany
}

export async function deleteStatusPost ({ user_activity_id }) {
  const postStatus = await XUserActivity.update({ is_deleted: true },
    { where: { user_activity_id } })
  return postStatus
}
