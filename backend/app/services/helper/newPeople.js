import {
  XQodResourceDef, XQodUserSkill, XQodSkill,
  UserDetail
} from '../../db/models'
import { createNewEntity } from './common'
import { getOne } from './crud'

export async function createAgentJobProfile ({
  user_id,
  skillIds,
  desired_min_pay,
  desired_max_pay,
  desired_languages,
  status,
  work_title,
  work_overview
}) {
  const agentResourceDef = await createNewEntity({
    model: XQodResourceDef,
    data: {
      user_id,
      desired_min_pay,
      desired_max_pay,
      desired_languages,
      status
    }
  })

  // Add Work title and overview
  await UserDetail.update({
    work_title,
    work_overview
  }, { where: { user_id } })

  // Add User skills
  await addUserSkills({ user_id, skillIds })
  return agentResourceDef
}

export async function addUserSkills ({ user_id, skillIds }) {
  // Add skills to user skills
  const skillEntities = skillIds.map(skillId => {
    return ({
      user_id,
      skill_id: skillId
    })
  })
  await XQodUserSkill.bulkCreate(skillEntities)
}

export async function getUserSkills ({ user_id }) {
  const userSkills = await XQodUserSkill.findAll({
    include: [{
      model: XQodSkill,
      attributes: ['skill_name']
    }],
    where: { user_id },
    raw: true
  })
  return userSkills
}

export async function addJobSkills (skillNames) {
  const skillEntities = skillNames.map(skillName => {
    return ({
      skill_name: skillName
    })
  })
  await XQodSkill.bulkCreate(skillEntities)
}

export async function getAgentResourceDef ({ agent_resource_id }) {
  const agentResourceDef = await getOne({
    model: XQodResourceDef,
    data: {
      resource_def_id: agent_resource_id
    }
  })
  return agentResourceDef
}

export async function getAgentJobProfiles () {
  const agentJobProfiles = await XQodResourceDef.findAll({
    include: [{
      model: UserDetail,
      attributes: [
        'user_id',
        'first_name',
        'last_name',
        'city',
        'state',
        'primary_language',
        'work_title',
        'work_overview'
      ],
      include: [{
        model: XQodUserSkill,
        attributes: ['skill_id', 'endorsed'],
        as: 'userSkills',
        include: [{
          model: XQodSkill,
          attributes: ['skill_name'],
          as: 'skill'
        }]
      }]
    }],
    attributes: [
      'resource_def_id',
      'status',
      'avg_peer_rating',
      'desired_min_pay',
      'desired_languages'
    ]
  })
  return agentJobProfiles.map(profile => profile.get({ plain: true }))
}
