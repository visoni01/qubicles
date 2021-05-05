import _ from 'lodash'

/* eslint-disable complexity */
const checkAndSetErrors = ({ setErrors, informationSection, contentSection }) => {
  let newErrors = {}
  let errorFlag = false

  setErrors(() => {
    if (_.isEmpty(informationSection.title.trim())) {
      newErrors = { ...newErrors, title: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(informationSection.description.trim())) {
      newErrors = { ...newErrors, summary: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(informationSection.goals.trim())) {
      newErrors = { ...newErrors, goals: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(informationSection.outcomes.trim())) {
      newErrors = { ...newErrors, outcomes: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(informationSection.requirements.trim())) {
      newErrors = { ...newErrors, requirements: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isNull(informationSection.category)) {
      newErrors = { ...newErrors, categoryTitle: { message: '*Required' } }
      errorFlag = true
    }
    if (informationSection.price === '') {
      newErrors = { ...newErrors, price: { message: '*Required' } }
      errorFlag = true
    }
    if (informationSection.price < 0) {
      newErrors = { ...newErrors, price: { message: '*Invalid' } }
      errorFlag = true
    }
    if (_.isEmpty(informationSection.language)) {
      newErrors = { ...newErrors, language: { message: '*Required' } }
      errorFlag = true
    }
    if (_.isEmpty(contentSection.thumbnailImage)) {
      newErrors = { ...newErrors, thumbnailImage: { message: '*Required' } }
      errorFlag = true
    }
    return newErrors
  })
  return errorFlag
}

export default checkAndSetErrors
