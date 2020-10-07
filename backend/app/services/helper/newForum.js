import { XForumGroup } from '../../db/models'
import { getAll, getOne } from './crud'
import { createNewEntity, updateEntity } from './common'

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
