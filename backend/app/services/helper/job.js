import {
  XQodJob,
  XQodApplication,
  XQodCategory,
  XQodJobTitle,
  XQodJobSkill,
  XQodSkill
} from '../../db/models'
import { createNewEntity } from '../helper/common'

export async function getRecentJobsByClient ({ client_id, limit = 5 }) {
  const jobDetails = []
  const jobs = await XQodJob.findAll({
    where: {
      is_active: true,
      client_id
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

export async function addJobByClient (data) {
  const newJob = await createNewEntity({
    model: XQodJob,
    data
  })
  return newJob
}

export async function getJobPostingsByClient ({ client_id }) {
  const jobs = await XQodJob.findAll({
    where: { client_id },
    raw: true
  })
  return jobs
}

export async function getOpenJobPostings () {
  const openJobPostings = await XQodJob.findAll({
    where: {
      is_active: true,
      is_public: true
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
  const jobDetails = await XQodJob.findOne({ where: { job_id }, raw: true })
  return jobDetails
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

export async function getJobCategories () {
  const jobCategories = await XQodCategory.findAll({ raw: true })
  return jobCategories
}

export async function getJobTitles () {
  const jobTitles = await XQodJobTitle.findAll({ raw: true })
  return jobTitles
}

export async function getJobSkills () {
  const jobSkills = await XQodJobSkill.findAll({ raw: true })
  return jobSkills
}

export async function getSkills () {
  const skills = await XQodSkill.findAll({ raw: true })
  return skills
}

export async function getHiredUserIdsByClientId ({ client_id }) {
  const hiredUsers = XQodApplication.findAll({
    where: {
      client_id,
      status: 'hired'
    },
    raw: true,
    attributes: ['user_id']
  })
  const hiredUserIds = hiredUsers.map(user => user.user_id)
  return hiredUserIds
}
