import _ from 'lodash'

/* eslint-disable complexity */
const checkAndSetErrors = ({ setErrors, newJobData, status }) => {
  let newErrors = {}
  let errorFlag = false

  setErrors(() => {
    if (_.isEmpty(newJobData.categoryName)) {
      newErrors = { ...newErrors, category: { message: '*Required' } }
      errorFlag = true
    }
    if (newJobData.needed <= 0 && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, needed: { message: '*Invalid' } }
      errorFlag = true
    }
    if (_.isEmpty(newJobData.title)) {
      newErrors = { ...newErrors, title: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(newJobData.description.trim()) && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, description: { message: '*Required' } }
      errorFlag = true
    }
    if (newJobData.payAmount <= 0 && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, payAmount: { message: '*Invalid' } }
      errorFlag = true
    }
    if (_.isEqual(newJobData.durationType, 'months') && newJobData.durationMonths <= 0 && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, durationMonths: { message: '*Invalid' } }
      errorFlag = true
    }
    if ((_.isEmpty(newJobData.jobSkillsData) || _.isEmpty(newJobData.jobSkillsData.requiredSkills))
    && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, requiredSkills: { message: '*Required' } }
      errorFlag = true
    }
    if ((_.isEmpty(newJobData.jobCoursesData) || _.isEmpty(newJobData.jobCoursesData.requiredCourses))
    && !_.isEqual(status, 'draft')) {
      newErrors = { ...newErrors, requiredCourses: { message: '*Required' } }
      errorFlag = true
    }
    return newErrors
  })
  return errorFlag
}

export default checkAndSetErrors
