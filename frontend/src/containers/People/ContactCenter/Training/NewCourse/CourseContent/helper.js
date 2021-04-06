import _ from 'lodash'

export const checkDisabledAddSectionButton = ({ sections }) => (sections[ sections.length - 1 ].units.length < 1)

export const checkDisabledAddUnitButton = ({ units }) => {
  if (units.length > 0) {
    const lastUnit = units[ units.length - 1 ]
    if (lastUnit.type.id === 3) {
      return !(lastUnit.questions.length > 0)
    }
    return _.isEmpty(lastUnit.details)
  }
  return false
}

export const checkDisabledAddTestButton = ({ units }) => {
  if (!units.length > 0) {
    return true
  }
  const lastUnit = units[ units.length - 1 ]
  if (lastUnit.type.id === 3) {
    return !(lastUnit.questions.length > 0)
  }
  return _.isEmpty(lastUnit.details)
}

export const checkDisabledUnitSaveButton = ({ savedUnit, updatedUnit }) => {
  if (updatedUnit.isEmpty) {
    return (_.isEmpty(updatedUnit.title) || _.isEmpty(updatedUnit.details) || _.isEmpty(updatedUnit.type))
  }
  return (_.isEqual(savedUnit, updatedUnit))
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
        type: { id: 0, title: 'Article' },
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
      type: { id: 0, title: 'Article' },
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
        type: { id: 3, title: 'Test' },
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
