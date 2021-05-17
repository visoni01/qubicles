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

const updateUnitOrTestData = ({
  sections, sectionId, questions, updatedUnit,
}) => {
  const sectionIndex = _.findIndex(sections, [ 'id', sectionId ])
  const updatedSections = _.cloneDeep(sections)
  if (questions) {
    updatedSections[ sectionIndex ] = { ...updatedSections[ sectionIndex ], questions }
  } else if (updatedUnit) {
    const unitIndex = _.findIndex(sections[ sectionIndex ].units, [ 'unitId', updatedUnit.unitId ])
    updatedSections[ sectionIndex ].units[ unitIndex ] = updatedUnit
    updatedSections[ sectionIndex ].status = _.isEmpty(updatedSections[ sectionIndex ].status)
      ? 'inprogress'
      : updatedSections[ sectionIndex ].status
  }
  return updatedSections
}

export const getUpdatedCourse = ({ state, action }) => {
  switch (state.requestType) {
    case 'FETCH': {
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
            isEnrolled: true,
            courseDetails: { ...state.course.courseDetails, ...action.payload.courseDetails },
          }
        }

        case 'Section Test': {
          return {
            ...state.course,
            courseContent: {
              ...state.course.courseContent,
              sections: updateUnitOrTestData({
                sections: state.course.courseContent.sections,
                questions: action.payload.sectionTest,
                sectionId: action.payload.sectionId,
                updatedUnit: action.payload.unit,
              }),
            },
          }
        }

        case 'Buy Course': {
          return {
            ...state.course,
            ...action.payload.course,
          }
        }

        case 'Assessment Test': {
          return {
            ...state.course,
            assessmentTest: action.payload.assessmentTest,
          }
        }

        default: return state.course
      }
    }

    case 'UPDATE': {
      switch (state.dataType) {
        case 'Course Unit': {
          return {
            ...state.course,
            courseContent: {
              ...state.course.courseContent,
              sections: updateUnitOrTestData({
                sections: state.course.courseContent.sections,
                updatedUnit: action.payload.unit,
                sectionId: action.payload.sectionId,
                questions: action.payload.sectionTest,
              }),
            },
          }
        }

        case 'Section Test': {
          const sectionIndex = _.findIndex(state.course.courseContent.sections, [ 'id', action.payload.sectionId ])
          const updatedSections = _.cloneDeep(state.course.courseContent.sections)
          updatedSections[ sectionIndex ].status = 'completed'
          return {
            ...state.course,
            courseContent: {
              ...state.course.courseContent,
              sections: updatedSections,
            },
          }
        }

        default: return state.course
      }
    }

    default: return state.course
  }
}
