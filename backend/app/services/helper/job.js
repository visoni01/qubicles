import {
  XQodJob,
  XQodApplication,
  XQodCategory,
  XQodJobTitle,
  XQodSkill,
  XQodJobSkill,
  XQodJobCourse

} from '../../db/models'
import { Op } from 'sequelize'
import { createNewEntity, getAll, aggregate, updateEntity } from '../helper'
import _ from 'lodash'

export async function getRecentJobsByClient ({ client_id, limit = 5 }) {
  const jobDetails = []
  const jobs = await XQodJob.findAll({
    where: {
      is_active: true,
      client_id,
      [Op.not]: [{ is_deleted: true }]
    },
    raw: true,
    attributes: ['job_id', 'title'],
    order: [['created_on', 'DESC']],
    limit
  })
  for (const job of jobs) {
    // Get count of applicants
    const totalApplicants = await XQodApplication.count('application_id', {
      where: {
        job_id: job.job_id,
        status: 'recruiting',
        is_active: true
      }
    })
    jobDetails.push({
      job_id: job.job_id,
      title: job.title,
      totalApplicants
    })
  }
  return jobDetails
}

export async function addJob (data) {
  const newJob = await createNewEntity({
    model: XQodJob,
    data
  })
  // Adding skills and courses data for newly added job.
  const requiredCoursesEntities = data.required_courses.map(courseId => {
    return ({
      job_id: newJob.job_id,
      course_id: courseId,
      course_preference: 'required'
    })
  })
  await XQodJobCourse.bulkCreate(requiredCoursesEntities)
  const bonusCoursesEntities = data.bonus_courses.map(courseId => {
    return ({
      job_id: newJob.job_id,
      course_id: courseId,
      course_preference: 'plus'
    })
  })
  await XQodJobCourse.bulkCreate(bonusCoursesEntities)
  const requiredSkillsEntities = data.required_skills.map(skillId => {
    return ({
      job_id: newJob.job_id,
      skill_id: skillId,
      skill_preference: 'required'
    })
  })
  await XQodJobSkill.bulkCreate(requiredSkillsEntities)
  const bonusSkillsEntities = data.bonus_skills.map(skillId => {
    return ({
      job_id: newJob.job_id,
      skill_id: skillId,
      skill_preference: 'plus'
    })
  })
  await XQodJobSkill.bulkCreate(bonusSkillsEntities)
  return newJob
}

export async function updateJob (data) {
  const updatedJob = await updateEntity({
    model: XQodJob,
    data
  })
  return updatedJob
}

export async function getAllJobsSubDetails ({ search_keyword, category_id }) {
  let query = { [Op.not]: [{ is_deleted: true }] }
  if (!_.isEmpty(search_keyword)) {
    query = { ...query, title: { [Op.startsWith]: search_keyword } }
  }

  if (!_.isEmpty(category_id)) {
    query = { ...query, category_id }
  }

  const allJobsSubDetails = await XQodJob.findAll({
    where: query,
    raw: true
  })
  return allJobsSubDetails
}

export async function getOpenJobPostings () {
  const openJobPostings = await XQodJob.findAll({
    where: {
      is_active: true,
      is_public: true,
      [Op.not]: [{ is_deleted: true }]
    },
    raw: true
  })
  return openJobPostings
}

export async function applyToJobPostingByUser ({
  user_id,
  job_id,
  cover_letter,
  video_pitch_url
}) {
  const newApplication = await createNewEntity({
    model: XQodApplication,
    data: {
      user_id,
      job_id,
      cover_letter,
      video_pitch_url,
      status: 'applied'
    }
  })
  return newApplication
}

export async function getApplicationsByJobId ({ job_id }) {
  const applicants = await XQodApplication.findAll({
    where: { job_id },
    raw: true
  })
  return applicants
}

export async function getApplicationsByUserId ({ user_id }) {
  const applications = await XQodApplication.findAll({
    where: { user_id },
    raw: true
  })
  return applications
}

export async function inviteUserForJob ({ job_id, user_id }) {
  const newApplication = await createNewEntity({
    model: XQodApplication,
    data: {
      user_id,
      job_id,
      status: 'invited'
    }
  })
  // TODO: Sending job invite email to user
  return newApplication
}

export async function handleApplicantResponse ({ application_id, status }) {
  await XQodApplication.update({
    status,
    where: { application_id }
  })
  switch (status) {
    case 'hired':
      // TODO: Send offer acceptance mail to employer
      break
    case 'rejected':
      // TODO: To be decided
      break
  }
}

export async function getJobById ({ job_id }) {
  const jobDetails = await XQodJob.findOne({ where: { job_id, [Op.not]: [{ is_deleted: true }] }, raw: true })
  return jobDetails
}

export async function getSkillsByJobId ({ job_id }) {
  const jobSKillsData = await XQodJobSkill.findAll({
    include: [{
      model: XQodSkill,
      attributes: ['skill_name']
    }],
    where: {
      job_id
    },
    raw: true
  })
  return jobSKillsData
}

export async function getCoursesByJobId ({ job_id }) {
  const jobCourses = await XQodJobCourse.findAll({ where: { job_id }, raw: true })
  return jobCourses
}

export async function getJobApplicationById ({ application_id }) {
  const jobApplicationDetails = await XQodApplication.findOne({ where: { application_id } })
  return jobApplicationDetails
}

export async function flagApplicationsById ({ application_id, status }) {
  await XQodApplication.update({
    status,
    where: { application_id }
  })
  switch (status) {
    case 'offered':
      // Send Email offer to applicant
      break
    case 'declined':
      break
    case 'evaluating':
      break
  }
}

export async function getAllJobCategories () {
  return getAll({ model: XQodCategory })
}

export async function getJobApplicationCount (data) {
  const res = await aggregate({ model: XQodApplication, data, aggFunction: 'count' })
  return res
}

export async function getJobTitles () {
  const jobTitles = await XQodJobTitle.findAll({ raw: true })
  return jobTitles
}

export async function getSkills () {
  const skills = await XQodSkill.findAll({ raw: true })
  return skills
}

export async function getSkillBySkillId ({ skill_id }) {
  const skill = await XQodSkill.findOne({ where: { skill_id }, raw: true })
  return skill
}

export async function getXQodApplications (queryObj) {
  let query = { raw: true }
  if (queryObj) {
    query = { ...query, ...queryObj }
  }
  return XQodApplication.findAll(query)
}

export async function getJobsDetailsByCategoryForClient ({ category_id }) {
  const jobs = await getAllJobsSubDetails({ category_id })
  return jobs
}

export async function getJobsDetailsForClient ({ user_id, client_id, category_id, search_keyword }) {
  const promises = [
    () => getAllJobsSubDetails({ search_keyword, category_id }),
    () => getAllJobCategories({ category_id })
  ]

  const [allJobs, jobCategories] = await Promise.all(promises.map(promise => promise()))
  const jobDetails = []

  for (const jobCategory of jobCategories) {
    const jobsByCategory = allJobs.filter(job => job.category_id === jobCategory.category_id)
    const jobs = await getFilteredJobs({ jobsByCategory })
    jobDetails.push({
      categoryId: jobCategory.category_id,
      categoryTitle: jobCategory.category_name,
      jobs
    })
  }
  return jobDetails
}

export async function getFilteredJobs ({ jobsByCategory }) {
  const filteredJobs = []
  for (const job of jobsByCategory) {
    const noOfApplications = await getJobApplicationCount({ job_id: job.job_id })
    filteredJobs.push({
      jobId: job.job_id,
      ownerId: job.user_id,
      categoryId: job.category_id,
      needed: job.needed,
      fulfilled: job.fulfilled,
      title: job.title,
      description: job.description,
      evaluating: 4,
      noOfApplications
    })
  }
  return filteredJobs
}

export function getJobsDetailsForUser ({ user_id, client_id }) {

}

export async function deleteJob ({ job_id }) {
  const jobs = await XQodJob.update({ is_deleted: true },
    { where: { job_id } })
  return jobs
}
