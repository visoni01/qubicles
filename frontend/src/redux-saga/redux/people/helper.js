/* eslint-disable complexity */
import _ from 'lodash'
import { REQUEST_TYPES } from '../../../utils/constants'
import {
  ALL_TEST_ENTRIES, ASSESSMENT_TEST, BUY_COURSE, COURSE_INFO, COURSE_UNIT, SECTION_TEST, START_COURSE,
  TEST_ENTRY_ANSWERS, VALIDATE_ANSWERS, SECTION_TEST_RESULT,
} from '../constants'

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
    case REQUEST_TYPES.FETCH: {
      switch (state.dataType) {
        case COURSE_INFO: {
          return {
            ...state.course,
            ...action.payload.course,
            currentUnitIndex: null,
            currentSectionIndex: null,
            isIntroVideoActive: null,
            isSectionTestActive: null,
          }
        }

        case START_COURSE: {
          return {
            ...state.course,
            isEnrolled: true,
            courseDetails: { ...state.course.courseDetails, ...action.payload.courseDetails },
          }
        }

        case SECTION_TEST: {
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

        case BUY_COURSE: {
          return {
            ...state.course,
            ...action.payload.course,
          }
        }

        case ASSESSMENT_TEST: {
          return {
            ...state.course,
            assessmentTest: action.payload.assessmentTest,
          }
        }

        case SECTION_TEST_RESULT: {
          return {
            ...state.course,
            courseContent: {
              ...state.course.courseContent,
              sections: state.course.courseContent.sections.map((section) => (section.id === action.payload.sectionId
                ? {
                  ...section,
                  isTestEvaluated: action.payload.isTestEvaluated,
                  testResult: action.payload.testResult,
                }
                : section)),
            },
          }
        }

        default: return state.course
      }
    }

    case REQUEST_TYPES.UPDATE: {
      switch (state.dataType) {
        case COURSE_UNIT: {
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

        case SECTION_TEST: {
          const sectionIndex = _.findIndex(state.course.courseContent.sections, [ 'id', action.payload.sectionId ])
          const updatedSections = _.cloneDeep(state.course.courseContent.sections)
          updatedSections[ sectionIndex ].status = 'completed'
          updatedSections[ sectionIndex ].isTestCompleted = true

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

    case REQUEST_TYPES.CREATE: {
      switch (state.dataType) {
        case ASSESSMENT_TEST: {
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
    case REQUEST_TYPES.FETCH: {
      switch (state.dataType) {
        case ALL_TEST_ENTRIES: {
          return {
            ...action.payload.testEntriesData,
          }
        }

        case TEST_ENTRY_ANSWERS: {
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

    case REQUEST_TYPES.UPDATE: {
      switch (state.dataType) {
        case VALIDATE_ANSWERS: {
          const testEntryIndex = _.findIndex(
            state.courseTestEntries.testEntries,
            { testType: action.payload.testType, candidateId: action.payload.candidateId },
          )
          const updatedTestEntries = _.cloneDeep(state.courseTestEntries.testEntries)

          updatedTestEntries[ testEntryIndex ].sections = state.courseTestEntries.testEntries[ testEntryIndex ].sections
            .map((section) => {
              const questions = section.questions.filter((question) => (
                _.findIndex(action.payload.validatedData, { questionId: question.questionId }) === -1
              ))
              return { ...section, questions }
            }).filter((section) => !_.isEmpty(section.questions))

          if (_.isEmpty(updatedTestEntries[ testEntryIndex ].sections)) {
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

export const updateAgentResumeReducer = ({ state, action }) => {
  let followers

  if (!_.isUndefined(action.payload.noOfFollowers)) {
    followers = action.payload.noOfFollowers
  } else if (!_.isUndefined(action.payload.isFollowing)) {
    if (!_.isUndefined(state.agentResume.followers)) {
      followers = (action.payload.isFollowing
        ? state.agentResume.followers + 1
        : state.agentResume.followers - 1)
    } else {
      followers = 0
    }
  }

  return {
    ...state.agentResume,
    isFollowing: !_.isUndefined(action.payload.isFollowing)
      ? action.payload.isFollowing
      : (state.agentResume && state.agentResume.isFollowing),
    hasBlockedUser: !_.isUndefined(action.payload.hasBlockedUser)
      ? action.payload.hasBlockedUser
      : (state.agentResume && state.agentResume.hasBlockedUser),
    following: !_.isUndefined(action.payload.noOfFollowings)
      ? action.payload.noOfFollowings
      : state.agentResume.following,
    followers,
  }
}
