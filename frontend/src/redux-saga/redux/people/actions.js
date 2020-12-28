import { createAction } from 'redux-actions'
import { SET_TALENT_SKILL_TAGS, GET_TALENT_SKILL_TAGS } from '../constants'

export const getTalentSkillTags = createAction(GET_TALENT_SKILL_TAGS)
export const setTalentSkillTags = createAction(SET_TALENT_SKILL_TAGS)
