import { XForumGroup, XForumTopic, User } from '../../db/models'
import { getAll, getOne } from './crud'
import { createNewEntity, updateEntity } from './common'
import { find, uniq } from 'lodash'

export async function createForumGroup ({ group_title, owner_id, group_description, permission }) {
  const newGroup = await createNewEntity({
    model: XForumGroup,
    data: {
      owner_id,
      group_title,
      group_description,
      permission
    }
  })
  return newGroup
}

export async function getOneForumGroup ({ group_id, user_id }) {
  const group = await getOne({
    model: XForumGroup,
    data: {
      group_id,
      is_deleted: false
    }
  })

  return group
}

export async function getAllForumGroups ({ user_id }) {
  let groups = await getAll({
    model: XForumGroup,
    data: {
      is_deleted: false
    }
  })

  groups = groups.map((group) => ({
    id: group.group_id,
    title: group.group_title,
    description: group.group_description
  }))

  return groups
}

export async function updateForumGroup ({ group_id, group_title, owner_id, group_description, permission }) {
  const updatedGroup = await updateEntity({
    model: XForumGroup,
    data: {
      group_id,
      owner_id,
      group_title,
      group_description,
      permission
    }
  })

  return updatedGroup
}

export async function deleteForumGroup ({ user_id, group_id }) {
  const deletedGroup = await XForumGroup.update({ is_deleted: true }, {
    where: {
      group_id
    }
  })

  return deletedGroup
}

export async function getOwnersName (ownerIds) {
  return getAll({
    model: User,
    data: {
      user_id: ownerIds
    },
    attributes: ['user_id', 'full_name']
  })
}

export async function getForumGroupTopics ({ user_id, group_id }) {
  let ownerIds = Array(0)
  let groupTopics = await getAll({
    model: XForumTopic,
    data: {
      owner_id: user_id,
      group_id
    }
  })

  groupTopics = groupTopics.map(({ owner_id, topic_id, topic_title, topic_description, createdAt }) => {
    ownerIds.push(owner_id)
    return ({
      id: topic_id,
      title: topic_title,
      description: topic_description,
      ownerId: owner_id,
      createdAt
    })
  })

  // Remove duplicate Ids
  ownerIds = uniq(ownerIds)

  // Get owners' names
  const ownersNames = await getOwnersName(ownerIds)
  groupTopics = groupTopics.map(({ ownerId, ...rest }) => {
    const ownerName = find(ownersNames, (owner) => owner.user_id === ownerId)
    return {
      ...rest,
      ownerName: ownerName && ownerName.full_name
    }
  })

  return groupTopics
}

export async function createForumTopic ({ topic_title, owner_id, topic_description, group_id }) {
  const newTopic = await createNewEntity({
    model: XForumTopic,
    data: {
      owner_id,
      group_id,
      topic_title,
      topic_description
    }
  })
  return newTopic
}
