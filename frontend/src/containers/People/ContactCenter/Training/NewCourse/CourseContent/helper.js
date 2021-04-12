import _ from 'lodash'

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
    const isRightAnswerSelected = (question.options.map((option) => option.id)).includes(question.answerText)
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
  if (sections.length > 0) {
    const lastSection = sections[ sections.length - 1 ]
    const newEmptySection = {
      id: lastSection.id + 1,
      title: 'Section',
      sectionNum: lastSection.sectionNum + 1,
      sectionIsActive: true,
      units: [],
    }
    return ([
      ...sections, newEmptySection,
    ])
  } return [ {
    id: 1,
    title: 'Section',
    sectionNum: 1,
    sectionIsActive: true,
    units: [],
  } ]
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
  if (section.units.length > 0) {
    const lastUnit = section.units[ section.units.length - 1 ]
    return {
      ...section,
      units: [ ...section.units, {
        unitId: lastUnit.unitId + 1,
        sectionId: section.id,
        unitNum: '1',
        title: 'Unit',
        details: '',
        length: 0,
        type: 'Article',
        isEmpty: true,
      } ],
    }
  }
  return {
    ...section,
    units: [ {
      unitId: 0,
      sectionId: section.id,
      unitNum: '1',
      title: 'Unit',
      details: '',
      length: 0,
      type: 'Article',
      isEmpty: true,
    } ],
  }
}

export const deleteUnitFromSection = ({ section, unitToDelete }) => {
  const updatedSection = {
    ...section,
    units: section.units.filter((unit) => unit.unitId !== unitToDelete.unitId),
  }
  return updatedSection
}

export const addNewTestToSection = ({ section }) => {
  if (section.units.length > 0) {
    const lastUnit = section.units[ section.units.length - 1 ]
    return {
      ...section,
      units: [ ...section.units, {
        unitId: lastUnit.unitId + 1,
        sectionId: section.id,
        unitNum: '1',
        title: 'Test',
        length: 0,
        type: 'Test',
        questions: [],
        isEmpty: true,
      } ],
    }
  }
  return {
    ...section,
    units: [ {
      unitId: 0,
      sectionId: section.id,
      unitNum: '1',
      title: 'Test',
      length: 0,
      type: { id: 3, title: 'Test' },
      questions: [],
      isEmpty: true,
    } ],
  }
}

// text, paragraph, multiple, checkbox, scale, date, time
export const addQuestionToTest = ({ unit }) => {
  let updatedQuestions = unit.questions
  const newQuestion = {
    unitId: unit.unitId,
    questionType: 'multiple',
    questionText: '',
    answerText: 0,
    options: [
      { id: 0, value: '' },
      { id: 1, value: '' },
    ],
    isSaved: false,
  }

  if (updatedQuestions.length > 0) {
    const lastQuestion = updatedQuestions[ updatedQuestions.length - 1 ]
    updatedQuestions = [
      ...updatedQuestions,
      {
        id: lastQuestion.id + 1,
        ...newQuestion,
      },
    ]
  } else {
    updatedQuestions = [ {
      id: 0,
      ...newQuestion,
    } ]
  }

  return {
    ...unit,
    questions: updatedQuestions,
  }
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
