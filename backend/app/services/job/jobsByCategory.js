import ServiceBase from '../../common/serviceBase'
import { getAllJobCategories, getAllJobsSubDetails, getJobApplicationCount } from '../helper/job'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class JobsByCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const client = await getClientIdByUserId({ user_id })
    if (client && client.client_id) {
      // User is an Employer
      const jobs = await getJobsDetailsForClient({ user_id, client_id: client.client_id })
      return jobs
    } else {
      // User is not an Employer
      const jobs = getJobsDetailsForUser({ user_id })
      return jobs
    }
  }
}

export async function getJobsDetailsForClient ({ user_id, client_id }) {
  const promises = [
    () => getAllJobsSubDetails(),
    () => getAllJobCategories()
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
      notifications: 23,
      title: job.title,
      description: job.description,
      noOfApplications
    })
  }
  return filteredJobs
}

export function getJobsDetailsForUser ({ user_id, client_id }) {

}
