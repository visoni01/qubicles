import _ from 'lodash'

export const updateApplicationsListHelper = ({
  currentCategoryId, applicationList, updatedApplication, applicationCategoryId,
}) => {
  if (applicationCategoryId === currentCategoryId) {
    return applicationList.filter((app) => app.application.applicationId !== updatedApplication.applicationId)
  }
  return applicationList
}

export const updateApplicationFilterHelper = ({
  currentCategoryId, categoryFilter, applicationCategoryId, updatedApplication,
}) => {
  let updatedFilter = categoryFilter
  if (categoryFilter.statusTypes.includes(updatedApplication.status)) {
    updatedFilter = { ...updatedFilter, initialFetch: false }
  }
  if (currentCategoryId === applicationCategoryId) {
    updatedFilter = { ...updatedFilter, offset: updatedFilter.offset - 1 }
  }
  return updatedFilter
}

export const updateCourseUnitData = ({
  sections, sectionId, updatedUnit,
}) => {
  const sectionIndex = _.findIndex(sections, [ 'id', sectionId ])
  const unitIndex = _.findIndex(sections[ sectionIndex ].units, [ 'unitId', updatedUnit.unitId ])
  const updatedSections = _.cloneDeep(sections)
  updatedSections[ sectionIndex ].units[ unitIndex ] = updatedUnit
  return updatedSections
}

export const getUpdatedCourse = ({ state, action }) => {
  switch (state.dataType) {
    case 'Course Info': {
      return {
        ...action.payload.course,
        currentUnitIndex: null,
        currentSectionIndex: null,
        isIntroVideoActive: null,
        isSectionTestActive: null,
      }
    }
    case 'Start Course': {
      return {
        ...state.course,
        courseDetails: { ...state.course.courseDetails, ...action.payload.courseDetails },
      }
    }
    case 'Course Unit': {
      return {
        ...state.course,
        courseContent: {
          ...state.course.courseContent,
          sections: updateCourseUnitData({
            sections: state.course.courseContent.sections,
            updatedUnit: action.payload.unit,
            sectionId: action.payload.sectionId,
          }),
        },
      }
    }
    default: return state.course
  }
}
