import talentCardsReducer from './talent/talentCards'
import agentResumeSkillsReducer from './talent/agentResumeSkills'
import jobReducer from './job/job'
import jobsWithCategoriesReducer from './job/jobsPage'
import jobSkillsReducer from './job/jobSkills'
import agentResumeReducer from './talent/agentResume'
import agentResumeCoursesReducer from './talent/agentResumeCourses'
import talentFilterReducer from './talent/talentFilter'
import jobFilterReducer from './agent/job/jobFilter'
import jobCategoriesOnlyReducer from './job/jobCategories'
import createJobDataReducer from './job/createJob'
import fetchAgentJobsReducer from './agent/job/getJobs'
import fetchTopCompaniesReducer from './agent/job/getTopCompanies'
import jobApplicationReducer from './application/jobApplication'
import jobApplicationListReducer from './application/jobApplicationList'
import agentJobApplicationsReducer from './application/agentJobApplications'
import agentTopDataReducer from './talent/getAgentTopData'
import trainingCourseReducer from './training/course'
import allCoursesReducer from './training/allCourses'
import viewAllCoursesReducer from './training/viewAllCourses'
import viewCourseReducer from './training/viewCourse'
import testEntriesReducer from './training/testEntries'
import enrolledCoursesReducer from './training/enrolledCourses'
import courseRatingsReducer from './training/courseRatings'
import courseReviewsReducer from './training/courseReviews'
import requiredCoursesReducer from './training/requiredCourses'
import bonusCoursesReducer from './training/bonusCourses'
import companyCoursesReducer from './training/companyCourses'
import companiesListReducer from './training/companiesList'

const peopleReducers = {
  jobSkills: jobSkillsReducer,
  peopleTalentCards: talentCardsReducer,
  agentResumeSkills: agentResumeSkillsReducer,
  agentResumeCourses: agentResumeCoursesReducer,
  jobDetails: jobReducer,
  jobsWithCategories: jobsWithCategoriesReducer,
  agentResume: agentResumeReducer,
  talentFilter: talentFilterReducer,
  jobFilter: jobFilterReducer,
  jobCategoriesOnly: jobCategoriesOnlyReducer,
  createJobData: createJobDataReducer,
  fetchAgentJobs: fetchAgentJobsReducer,
  fetchTopCompanies: fetchTopCompaniesReducer,
  jobApplication: jobApplicationReducer,
  jobApplicationList: jobApplicationListReducer,
  agentJobApplications: agentJobApplicationsReducer,
  agentTopData: agentTopDataReducer,
  trainingCourse: trainingCourseReducer,
  allCourses: allCoursesReducer,
  viewAllCourses: viewAllCoursesReducer,
  viewCourse: viewCourseReducer,
  testEntries: testEntriesReducer,
  enrolledCourses: enrolledCoursesReducer,
  courseRatings: courseRatingsReducer,
  courseReviews: courseReviewsReducer,
  requiredCourses: requiredCoursesReducer,
  bonusCourses: bonusCoursesReducer,
  companyCourses: companyCoursesReducer,
  companiesList: companiesListReducer,
}

export default peopleReducers
export * from './talent/talentCards'
export * from './talent/agentResumeSkills'
export * from './talent/agentResumeCourses'
export * from './job/job'
export * from './job/jobsPage'
export * from './job/jobSkills'
export * from './talent/agentResume'
export * from './talent/talentFilter'
export * from './agent/job/jobFilter'
export * from './job/jobCategories'
export * from './job/createJob'
export * from './agent/job/getJobs'
export * from './agent/job/getTopCompanies'
export * from './application/jobApplication'
export * from './application/jobApplicationList'
export * from './application/agentJobApplications'
export * from './job/actions'
export * from './talent/getAgentTopData'
export * from './training/course'
export * from './training/allCourses'
export * from './training/viewAllCourses'
export * from './training/viewCourse'
export * from './training/testEntries'
export * from './training/enrolledCourses'
export * from './training/courseRatings'
export * from './training/courseReviews'
export * from './training/requiredCourses'
export * from './training/bonusCourses'
export * from './training/companyCourses'
export * from './training/companiesList'
