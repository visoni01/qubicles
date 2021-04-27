/* eslint-disable complexity */
import _ from 'lodash'
import { getUniqueId } from '../../../../../../utils/common'

export const getArticleUnitsCount = ({ section }) => {
  const articleUnits = section.units.filter((unit) => {
    const unitTypeCheck = [ 'Article', 'Audio', 'Video' ].includes(unit.type)
    return unitTypeCheck && !unit.isEmpty
  })
  return articleUnits.length
}

export const checkDeleteSection = ({ sections }) => sections.length > 1

export const isEmptySection = ({ section }) => {
  const unitsAdded = section.units.length > 0
  const testAdded = !_.isEmpty(section.test)

  return !(unitsAdded && testAdded)
}

export const checkDisabledAddSectionButton = ({ sections }) => {
  const allSectionsSaved = sections.reduce((acc, curr) => acc && !curr.isEdit, true)
  const allSectionsNotEmpty = sections.reduce((acc, section) => {
    const emptySection = isEmptySection({ section })
    return acc && !emptySection
  }, true)

  return !(allSectionsSaved && allSectionsNotEmpty)
}

export const checkDisabledSaveSectionButton = ({ updatedSection }) => {
  const emptySection = isEmptySection({ section: updatedSection })
  const notEmptyTitle = !_.isEmpty(updatedSection.title)

  return !(notEmptyTitle && !emptySection)
}

export const isEqualSections = ({ previous, current }) => {
  const sectionContent = ({ isEdit, ...rest }) => rest
  return _.isEqual(sectionContent(previous), sectionContent(current))
}

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
  const isUniqueOptions = new Set(question.options.map((item) => item.value)).size === question.options.length

  if (question.questionType === 'multiple') {
    const isRightAnswerSelected = (question.options.map((option) => option.id)).includes(question.correctOption)
    return !(
      !isEmptyQuestionText
      && notEmptyOptions
      && isRightAnswerSelected
      && isUniqueOptions
    )
  }
  if (question.questionType === 'checkbox') {
    const isRightAnswerSelected = question.correctOptions.length > 0
    return !(
      !isEmptyQuestionText
      && notEmptyOptions
      && isRightAnswerSelected
      && isUniqueOptions
    )
  }

  if (question.questionType === 'scale') {
    const isRightAnswerSelected = question.scale.correctValue <= question.scale.maxValue
    && question.scale.correctValue >= question.scale.minValue
    return !(
      !isEmptyQuestionText
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

export const checkDisabledAddTestButton = ({ test }) => !(_.isEmpty(test))

export const checkDisabledUnitSaveButton = ({ savedUnit, updatedUnit }) => {
  const allFieldsAreFilled = !_.isEmpty(updatedUnit.title)
   && !_.isEmpty(updatedUnit.details) && !_.isEmpty(updatedUnit.type)

  const unitChanged = !_.isEqual(savedUnit, updatedUnit)

  if (updatedUnit.isEmpty) {
    return (!allFieldsAreFilled)
  }

  return (!unitChanged || !allFieldsAreFilled)
}

export const getNewEmptyQuestion = () => {
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
    scale: {
      minValue: -50, maxValue: 50, correctValue: 0, minRange: -100, maxRange: 100,
    },
  }
  return newQuestionSchema
}

export const addEmptyContentSectionToSections = ({ sections }) => {
  const newSectionSchema = {
    id: getUniqueId(),
    title: `Section ${ sections.length + 1 }`,
    isEdit: true,
    sectionNum: '1',
    sectionIsActive: true,
    units: [ ],
    test: {},
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

export const deleteSectionInSections = ({ sections, sectionToDelete }) => {
  // Cannot Delete last section
  if (sections.length <= 1) return sections
  const updatedSections = sections.filter((section) => section.id !== sectionToDelete.id)
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
    isOpen: true,
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
  const newQuestion = getNewEmptyQuestion()

  const newTestSchema = {
    title: 'Test',
    length: 0,
    questions: [ newQuestion ],
    isEmpty: true,
    isOpen: true,
  }

  return ({
    ...section,
    test: { ...newTestSchema },
  })
}

// text, paragraph, multiple, checkbox, scale, date, time
export const addQuestionToTest = ({ test }) => {
  const newQuestion = getNewEmptyQuestion()
  return ({
    ...test,
    questions: [ ...test.questions, newQuestion ],
  })
}

export const deleteQuestionFromTest = ({ test, question }) => {
  const updatedUnitQuestions = test.questions.filter((q) => q.id !== question.id)

  return updatedUnitQuestions
}

export const saveQuestionInTest = ({ test, question }) => {
  const updatedUnitQuestions = test.questions.map((q) => {
    if (q.id === question.id) {
      let { answerText } = question
      if (question.questionType === 'multiple') {
        const correctAnswer = question.options.filter((item) => item.id === question.correctOption)
        answerText = correctAnswer.length && correctAnswer[ 0 ].value
      }
      if (question.questionType === 'checkbox') {
        const correctAnswer = question.options.filter((item) => question.correctOptions.includes(item.id))
        answerText = correctAnswer.length && correctAnswer.map((item) => item.value).join(',')
      }
      return { ...question, isSaved: true, answerText }
    }
    return q
  })

  return updatedUnitQuestions
}

export const unSaveQuestionInTest = ({ test, question }) => {
  const updatedUnitQuestions = test.questions.map((q) => {
    if (q.id === question.id) {
      return { ...question, isSaved: false }
    }
    return q
  })

  return updatedUnitQuestions
}

export const courseContentFilterBeforeSave = ({ courseContent }) => {
  const filteredSections = courseContent.sections.filter((section) => !isEmptySection({ section }))
  console.log('FILTERD SECTIONS==', filteredSections)
  return { ...courseContent, sections: filteredSections }
}
