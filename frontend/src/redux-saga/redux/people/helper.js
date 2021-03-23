import { SET_TALENT_SKILL_TAGS } from '../constants'

const getUpdatedTalentCards = ({ state, payload }) => {
  let talentCards

  switch (payload.type) {
    case SET_TALENT_SKILL_TAGS: {
      const { candidateId, skills } = payload
      talentCards = state.talentCards.map((card) => {
        if (card.candidateId === candidateId) {
          return ({
            ...card,
            skills,
          })
        }
        return card
      })
      break
    }

    default:
      talentCards = state.talentCards
  }
  return talentCards
}

export default getUpdatedTalentCards

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
