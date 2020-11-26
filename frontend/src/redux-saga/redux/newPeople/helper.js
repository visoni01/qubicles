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
