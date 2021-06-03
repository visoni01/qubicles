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

// eslint-disable-next-line complexity
export const getUpdatedCourse = ({ state, action }) => {
  switch (state.requestType) {
    case 'FETCH': {
      switch (state.dataType) {
        case 'Course Info': {
          return {
            ...state.course,
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
            sectionsCompleted: state.course.sectionsCompleted + 1,
            courseContent: {
              ...state.course.courseContent,
              sections: updatedSections,
            },
            courseDetails: {
              ...state.course.courseDetails,
              status: action.payload.courseStatus === 'completed' ? 'completed' : state.course.courseDetails.status,
            },
          }
        }

        default: return state.course
      }
    }

    case 'CREATE': {
      switch (state.dataType) {
        case 'Assessment Test': {
          return {
            ...state.course,
            sectionsCompleted: state.course.courseContent.sections.length,
            courseContent: {
              ...state.course.courseContent,
              sections: state.course.courseContent.sections.map((section) => ({ ...section, status: 'completed' })),
            },
            courseDetails: {
              ...state.course.courseDetails,
              status: 'completed',
            },
          }
        }

        default: return state.course
      }
    }

    default: return state.course
  }
}

export const updateTestEntriesReducer = ({ state, action }) => {
  switch (state.requestType) {
    case 'FETCH': {
      switch (state.dataType) {
        case 'All Test Entries': {
          return {
            ...action.payload.testEntriesData,
          }
        }

        case 'Test Entry Answers': {
          const testEntryIndex = _.findIndex(
            state.courseTestEntries.testEntries,
            { testType: action.payload.testType, candidateId: action.payload.candidateId },
          )
          const updatedTestEntries = _.cloneDeep(state.courseTestEntries.testEntries)
          updatedTestEntries[ testEntryIndex ] = {
            ...updatedTestEntries[ testEntryIndex ],
            sections: action.payload.sections,
          }
          return {
            ...state.courseTestEntries,
            testEntries: updatedTestEntries,
          }
        }

        default: return state.courseTestEntries
      }
    }

    case 'UPDATE': {
      switch (state.dataType) {
        case 'Validate Answers': {
          const testEntryIndex = _.findIndex(
            state.courseTestEntries.testEntries,
            { sectionId: action.payload.sectionId, candidateId: action.payload.candidateId },
          )
          const updatedTestEntries = _.cloneDeep(state.courseTestEntries.testEntries)
          updatedTestEntries[ testEntryIndex ].testEntryAnswers = _.differenceWith(
            updatedTestEntries[ testEntryIndex ].testEntryAnswers,
            action.payload.validatedData,
            (arrVal, othVal) => arrVal.questionId === othVal.questionId,
          )
          if (_.isEmpty(updatedTestEntries[ testEntryIndex ].testEntryAnswers)) {
            updatedTestEntries.splice(testEntryIndex, 1)
          }
          return {
            ...state.courseTestEntries,
            testEntries: updatedTestEntries,
          }
        }

        default: return state.courseTestEntries
      }
    }

    default: return state.courseTestEntries
  }
}
