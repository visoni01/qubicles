import {
  XQodResourceDef, XQodUserSkill, XQodSkill,
  UserDetail, XQodApplication, XUserActivity
} from '../../db/models'
import { createNewEntity } from './common'
import { getOne } from './crud'
import { Op } from 'sequelize'
import _ from 'lodash'

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

export async function getUserSkills ({ user_id, candidate_id }) {
  let userSkills = await XQodUserSkill.findAll({
    include: [{
      model: XQodSkill,
      as: 'skill'
    },
    {
      model: XUserActivity,
      attributes: ['user_id', 'activity_value'],
      where: {
        activity_type: 'endorsement'
      },
      required: false,
      as: 'endorsement',
      include: [{
        model: UserDetail,
        attributes: ['first_name', 'last_name', 'profile_image', 'rating', 'work_title'],
        as: 'userData'
      }]
    }],
    where: {
      user_id: candidate_id,
      is_deleted: false
    },
    order: [['user_skill_id', 'ASC']]
  })

  userSkills = userSkills.map(user => user.get({ plain: true }))

  const skills = userSkills.map(userSkill => {
    const { skill, endorsement } = userSkill
    return ({
      skillId: skill.skill_id,
      skillName: skill.skill_name,
      endorsedCount: userSkill.endorsed,
      endorsements: endorsement.map(user => {
        return {
          id: user.user_id,
          comment: user.activity_value,
          userProfile: {
            name: user.userData.first_name + ' ' + user.userData.last_name,
            profilePic: user.userData.profile_image
          },
          rating: user.userData.rating,
          workTitle: user.userData.work_title
        }
      })
    })
  })
  const candidateSkills = {
    candidateId: parseInt(candidate_id),
    skills,
    canEndorse: parseInt(candidate_id) !== user_id
    // WIP only endorse when both agent are in same company
  }
  return candidateSkills
}

export async function updateUserSkills ({ user_id, candidate_id, updatedData: updatedSkills }) {
  let userSkills = await XQodUserSkill.findAll({
    attributes: ['skill_id'],
    where: { user_id: candidate_id }
  })

  userSkills = userSkills.map(item => item.get({ plain: true }))

  let promiseArray = []

  if (!userSkills.length) {
    const bulkDataToBeAdded = updatedSkills.map(item => {
      return {
        user_id: candidate_id,
        skill_id: item
      }
    })

    promiseArray = [() => XQodUserSkill.bulkCreate(bulkDataToBeAdded)]
  } else {
    const currentSkills = userSkills.map(item => item.skill_id)

    const skillsAlreadyAdded = _.intersection(currentSkills, updatedSkills)

    const skillsToBeAdded = _.difference(updatedSkills, currentSkills)

    const skillsToBeRemoved = _.difference(currentSkills, updatedSkills)

    if (skillsAlreadyAdded && skillsAlreadyAdded.length) {
      promiseArray = [
        ...promiseArray,
        () => XQodUserSkill.update({
          is_deleted: false
        }, {
          where: {
            user_id: candidate_id,
            skill_id: skillsAlreadyAdded
          }
        })
      ]
    }

    if (skillsToBeAdded && skillsToBeAdded.length) {
      const bulkDataToBeAdded = skillsToBeAdded.map(item => {
        return {
          user_id: candidate_id,
          skill_id: item
        }
      })

      promiseArray = [
        ...promiseArray,
        () => XQodUserSkill.bulkCreate(bulkDataToBeAdded)
      ]
    }

    if (skillsToBeRemoved && skillsToBeRemoved.length) {
      promiseArray = [
        ...promiseArray,
        () => XQodUserSkill.update({
          is_deleted: true
        }, {
          where: {
            user_id: candidate_id,
            skill_id: skillsToBeRemoved
          }
        })
      ]
    }
  }

  await Promise.all(promiseArray.map(promise => promise()))

  const candidateSkills = await getUserSkills({ user_id, candidate_id })

  return candidateSkills
}

export async function addUserEndorsement ({ user_id, candidate_id, updatedData }) {
  const { skillId, comment } = updatedData
  const promises = [
    () => XQodUserSkill.findOne({
      attributes: ['user_skill_id'],
      raw: true,
      where: {
        user_id: candidate_id,
        skill_id: skillId
      }
    }),
    () => XQodUserSkill.increment(
      'endorsed', {
        where: {
          user_id: candidate_id,
          skill_id: skillId
        }
      })
  ]

  let [userSkillId] = await Promise.all(promises.map(promise => promise()))

  if (userSkillId) {
    userSkillId = userSkillId.user_skill_id

    await XUserActivity.create({
      user_id,
      record_type: 'activity',
      record_id: userSkillId,
      activity_type: 'endorsement',
      activity_value: comment
    })

    const candidateSkills = await getUserSkills({ user_id, candidate_id })

    return candidateSkills
  }
}

export async function removeUserEndorsement ({ user_id, candidate_id, updatedData }) {
  const { skillId } = updatedData
  const promises = [
    () => XQodUserSkill.findOne({
      attributes: ['user_skill_id'],
      raw: true,
      where: {
        user_id: candidate_id,
        skill_id: skillId
      }
    }),
    () => XQodUserSkill.decrement(
      'endorsed', {
        where: {
          user_id: candidate_id,
          skill_id: skillId
        }
      })
  ]

  let [userSkillId] = await Promise.all(promises.map(promise => promise()))

  if (userSkillId) {
    userSkillId = userSkillId.user_skill_id

    await XUserActivity.destroy({
      where: {
        user_id,
        record_id: userSkillId
      }
    })

    const candidateSkills = await getUserSkills({ user_id, candidate_id })

    return candidateSkills
  }
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

export async function getAgentJobProfiles ({
  requiredLanguages = [],
  requiredHourlyRate,
  requiredRating,
  requiredAvailability,
  requiredTalentType,
  searchKeyword
}) {
  let resourceDefQuery = {}
  let userDetailQuery = {}

  if (searchKeyword) {
    userDetailQuery = {
      ...userDetailQuery,
      work_title: {
        [Op.startsWith]: searchKeyword
      }

    }
  }

  // Language filter
  if (requiredLanguages.length > 0) {
    resourceDefQuery = { ...resourceDefQuery, desired_languages: requiredLanguages }
  }
  if (requiredTalentType && requiredTalentType.employmentType) {
    resourceDefQuery = {
      ...resourceDefQuery,
      desired_employment_type: requiredTalentType.employmentType
    }
  }
  // Hourly rate filter
  if (requiredHourlyRate) {
    const { lessThanEq, greaterThanEq } = requiredHourlyRate
    if (lessThanEq && !greaterThanEq) {
      resourceDefQuery = {
        ...resourceDefQuery,
        desired_min_pay: {
          [Op.lte]: lessThanEq
        }
      }
    } else if (greaterThanEq && !lessThanEq) {
      resourceDefQuery = {
        ...resourceDefQuery,
        desired_min_pay: {
          [Op.gte]: greaterThanEq
        }
      }
    } else if (greaterThanEq && lessThanEq) {
      resourceDefQuery = {
        ...resourceDefQuery,
        desired_min_pay: {
          [Op.and]: [
            { [Op.lte]: lessThanEq },
            { [Op.gte]: greaterThanEq }
          ]
        }
      }
    }
  }
  // Availability Filter
  if (requiredAvailability && requiredAvailability.status) {
    resourceDefQuery = {
      ...resourceDefQuery,
      status: requiredAvailability.status
    }
  }

  // Rating Filter
  if (requiredRating) {
    const { greaterThanEq } = requiredRating
    if (greaterThanEq) {
      userDetailQuery = {
        ...userDetailQuery,
        rating: {
          [Op.gte]: greaterThanEq
        }
      }
    }
  }

  // Profile Visibility
  resourceDefQuery = {
    ...resourceDefQuery,
    is_visible: true
  }

  const agentJobProfiles = await XQodResourceDef.findAll({
    include: [{
      model: UserDetail,
      attributes: [
        'user_id',
        'first_name',
        'last_name',
        'city',
        'rating',
        'state',
        'primary_language',
        'work_title',
        'work_overview',
        'profile_image'
      ],
      where: userDetailQuery,
      include: [{
        model: XQodUserSkill,
        attributes: ['skill_id', 'endorsed'],
        as: 'userSkills',
        where: { is_deleted: false },
        required: false,
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
    ],
    where: resourceDefQuery
  })
  return agentJobProfiles.map(profile => profile.get({ plain: true }))
}

export async function getAgentResume ({ candidateId }) {
  const agentResume = await XQodResourceDef.findOne({
    include: [{
      model: UserDetail,
      attributes: [
        'user_id',
        'first_name',
        'last_name',
        'city',
        'state',
        'rating',
        'primary_language',
        'other_languages',
        'highest_education',
        'years_of_experience',
        'work_title',
        'work_overview',
        'profile_image'
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
    where: {
      user_id: candidateId
    }
  })
  return agentResume && agentResume.get({ plain: true })
}

export async function postAgentApplication ({
  user_id,
  client_id,
  job_id,
  cover_letter,
  video_pitch_url,
  status,
  status_reason,
  start_date,
  end_date
}) {
  const application = await createNewEntity({
    model: XQodApplication,
    data: {
      user_id,
      client_id,
      job_id,
      cover_letter,
      video_pitch_url,
      status,
      status_reason,
      start_date,
      end_date
    }
  })
  return application
}
