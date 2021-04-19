import _ from 'lodash'
import { getUniqueId } from '../../../../../../utils/common'

export const getArticleUnitsCount = ({ section }) => {
  const articleUnits = section.units.filter((unit) => [ 'Article', 'Audio', 'Video' ].includes(unit.type))
  return articleUnits.length
}

export const getTestUnitsCount = ({ section }) => {
  const testUnits = section.units.filter((unit) => [ 'Test' ].includes(unit.type))
  return testUnits.length
}

export const checkDisabledAddSectionButton = ({ sections }) => (sections[ sections.length - 1 ].units.length < 1)

export const checkDisabledAddUnitButton = ({ units }) => {
  if (units.length > 0) {
    const lastUnit = units[ units.length - 1 ]
    if (lastUnit.type === 'Test') {
      return !(lastUnit.questions.length > 0)
    }
    return _.isEmpty(lastUnit.details)
  }
  return false
}

export const checkDisabledSaveQuestionButton = ({ question }) => {
  const isEmptyQuestionText = _.isEmpty(question.questionText)
  const notEmptyOptions = question.options.reduce((acc, curr) => acc && !_.isEmpty(curr.value), true)

  if (question.questionType === 'multiple') {
    const isRightAnswerSelected = (question.options.map((option) => option.id)).includes(question.correctOption)
    return !(
      !isEmptyQuestionText
      && notEmptyOptions
      && isRightAnswerSelected
    )
  }
  if (question.questionType === 'checkbox') {
    const isRightAnswerSelected = question.correctOptions.length > 0
    return !(
      !isEmptyQuestionText
      && notEmptyOptions
      && isRightAnswerSelected
    )
  }
  return false
}

export const checkDisabledSaveTestButton = ({ unit }) => {
  const isAllQuestionsSaved = unit.questions.reduce((acc, curr) => acc && curr.isSaved, true)
  if (unit.questions.length > 0) {
    return !(
      isAllQuestionsSaved
    )
  }
  return true
}

export const checkDisabledAddQuestionButton = ({ unit }) => {
  if (unit.questions.length > 0) {
    const lastQuestion = unit.questions[ unit.questions.length - 1 ]
    return !(lastQuestion.isSaved)
  }
  return false
}

export const checkDisabledAddTestButton = ({ units }) => {
  if (!units.length > 0) {
    return true
  }
  const lastUnit = units[ units.length - 1 ]
  if (lastUnit.type === 'Test') {
    return !(lastUnit.questions.length > 0)
  }
  return _.isEmpty(lastUnit.details)
}

export const checkDisabledUnitSaveButton = ({ savedUnit, updatedUnit }) => {
  const allFieldsAreFilled = !_.isEmpty(updatedUnit.title)
   && !_.isEmpty(updatedUnit.details) && !_.isEmpty(updatedUnit.type)

  const unitChanged = !_.isEqual(savedUnit, updatedUnit)

  if (updatedUnit.isEmpty) {
    return (!allFieldsAreFilled)
  }

  return (!unitChanged || !allFieldsAreFilled)
}

export const addEmptyContentSectionToSections = ({ sections }) => {
  const newSectionSchema = {
    id: getUniqueId(),
    title: 'Section',
    sectionNum: '1',
    sectionIsActive: true,
    units: [ ],
  }
  return ([
    ...sections, newSectionSchema,
  ])
}

export const updateSectionInSections = ({ updatedSection, sections }) => {
  const updatedSections = sections.map((section) => {
    if (section.id === updatedSection.id) {
      return updatedSection
    }
    return section
  })
  return updatedSections
}

export const updateUnitInSection = ({ updatedUnit, section }) => {
  const updatedUnits = section.units.map((unit) => {
    if (unit.unitId === updatedUnit.unitId) {
      return updatedUnit
    }
    return unit
  })
  return {
    ...section,
    units: updatedUnits,
  }
}

export const addNewUnitToSection = ({ section }) => {
  const articleUnitsCount = getArticleUnitsCount({ section })
  const newArticleUnitSchema = {
    unitId: getUniqueId(),
    unitNum: '1',
    title: 'Unit 1',
    details: '',
    length: 0,
    type: 'Article',
    isEmpty: true,
  }
  return ({
    ...section,
    units: [ ...section.units, { ...newArticleUnitSchema, title: `Unit ${ articleUnitsCount + 1 }` } ],
  })
}

export const deleteUnitFromSection = ({ section, unitToDelete }) => {
  const updatedSection = {
    ...section,
    units: section.units.filter((unit) => unit.unitId !== unitToDelete.unitId),
  }
  return updatedSection
}

export const addNewTestToSection = ({ section }) => {
  const testUnitsCount = getTestUnitsCount({ section })
  const newTestSchema = {
    unitId: getUniqueId(),
    unitNum: '1',
    title: 'Test',
    length: 0,
    type: 'Test',
    questions: [ ],
    isEmpty: true,
    isOpen: true,
  }

  return ({
    ...section,
    units: [ ...section.units, { ...newTestSchema, title: `Test ${ testUnitsCount + 1 }` } ],
  })
}

// text, paragraph, multiple, checkbox, scale, date, time
export const addQuestionToTest = ({ unit }) => {
  const newQuestionSchema = {
    id: getUniqueId(),
    questionType: 'multiple',
    questionText: '',
    answerText: '',
    options: [
      { id: getUniqueId(), value: '' },
      { id: getUniqueId(), value: '' },
    ],
    isSaved: false,
    correctOptions: [],
    correctOption: '',
  }
  return ({
    ...unit,
    questions: [ ...unit.questions, newQuestionSchema ],
  })
}

export const deleteQuestionFromTest = ({ unit, question }) => {
  const updatedUnitQuestions = unit.questions.filter((q) => q.id !== question.id)

  return updatedUnitQuestions
}

export const saveQuestionInTest = ({ unit, question }) => {
  const updatedUnitQuestions = unit.questions.map((q) => {
    if (q.id === question.id) {
      return { ...question, isSaved: true }
    }
    return q
  })

  return updatedUnitQuestions
}

export const unSaveQuestionInTest = ({ unit, question }) => {
  const updatedUnitQuestions = unit.questions.map((q) => {
    if (q.id === question.id) {
      return { ...question, isSaved: false }
    }
    return q
  })

  return updatedUnitQuestions
}
