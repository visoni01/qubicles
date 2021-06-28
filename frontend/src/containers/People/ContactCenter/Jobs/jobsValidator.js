/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types'

export const jobCategoryCardValidator = {
  categoryName: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
      required: PropTypes.number,
      hired: PropTypes.number,
      evaluating: PropTypes.number,
      pending: PropTypes.number,
    }),
  ),
}

export const jobDetailsPropTypes = PropTypes.shape({
  jobId: PropTypes.number,
  categoryId: PropTypes.number,
  categoryName: PropTypes.string,
  companyDetails: PropTypes.shape({
    city: PropTypes.string,
    client_id: PropTypes.number,
    client_name: PropTypes.string,
    profile_image: PropTypes.string,
    rating: PropTypes.number,
    registration_date: PropTypes.string,
    state: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string,
  }),
  jobPostOwnerId: PropTypes.number,
  clientId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  jobType: PropTypes.string,
  employmentType: PropTypes.string,
  durationType: PropTypes.string,
  durationMonths: PropTypes.number,
  experienceType: PropTypes.string,
  locationType: PropTypes.string,
  payAmount: PropTypes.number,
  languages: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  fulfilled: PropTypes.number,
  needed: PropTypes.number,
  pending: PropTypes.number,
  evaluating: PropTypes.number,
  createdOn: PropTypes.string,
  jobApplicationStats: PropTypes.shape({
    evaluating: PropTypes.number,
    fulfilled: PropTypes.number,
    pending: PropTypes.number,
    totalApplications: PropTypes.number,
  }),
  jobSkillsData: PropTypes.shape({
    requiredSkills: PropTypes.arrayOf(PropTypes.shape({
      jobSkillId: PropTypes.number,
      skillPreference: PropTypes.string,
      skillId: PropTypes.number,
      skillName: PropTypes.string,
    })),
    bonusSkills: PropTypes.arrayOf(PropTypes.shape({
      jobSkillId: PropTypes.number,
      skillPreference: PropTypes.string,
      skillId: PropTypes.number,
      skillName: PropTypes.string,
    })),
  }),
  jobCoursesData: PropTypes.shape({
    requiredCourses: PropTypes.arrayOf(PropTypes.shape({
      jobCourseId: PropTypes.number,
      courseId: PropTypes.number,
      courseTitle: PropTypes.string,
      createdAt: PropTypes.string,
      creatorName: PropTypes.string,
    })),
    bonusCourses: PropTypes.arrayOf(PropTypes.shape({
      jobCourseId: PropTypes.number,
      courseId: PropTypes.number,
      courseTitle: PropTypes.string,
      createdAt: PropTypes.string,
      creatorName: PropTypes.string,
    })),
  }),
})
