import PropTypes from 'prop-types'

export const testQuestionPropType = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answerText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  isSaved: PropTypes.bool.isRequired,
  correctOptions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  correctOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  dateTime: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isDate: PropTypes.bool.isRequired,
    isTime: PropTypes.bool.isRequired,
  }),
})

export const informationSectionPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  category: PropTypes.number,
  categoryTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  visibility: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  goals: PropTypes.string.isRequired,
  outcomes: PropTypes.string.isRequired,
  requirements: PropTypes.string.isRequired,
  creatorId: PropTypes.number,
  language: PropTypes.string.isRequired,
  requiredCourses: PropTypes.arrayOf(PropTypes.any),
})

export const contentSectionPropType = PropTypes.shape({
  thumbnailImage: PropTypes.string,
  introductionVideo: PropTypes.string,
})

export const unitPropType = PropTypes.shape({
  unitId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  unitNum: PropTypes.string.isRequired,
  sectionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  details: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
})

export const testPropType = PropTypes.shape({
  title: PropTypes.string,
  sectionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  length: PropTypes.number.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
})

export const sectionPropType = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  sectionNum: PropTypes.string.isRequired,
  sectionIsActive: PropTypes.bool.isRequired,
  units: PropTypes.arrayOf(PropTypes.any).isRequired,
  test: PropTypes.shape({}).isRequired,
})

export const sectionsPropType = PropTypes.arrayOf(sectionPropType)

export const courseContentPropType = PropTypes.shape({
  sections: sectionsPropType.isRequired,
})

export const coursePropType = PropTypes.shape({
  courseId: PropTypes.number,
})

export const errorsPropTypes = PropTypes.shape({
  title: PropTypes.shape({
    message: PropTypes.string,
  }),
  summary: PropTypes.shape({
    message: PropTypes.string,
  }),
  goals: PropTypes.shape({
    message: PropTypes.string,
  }),
  outcomes: PropTypes.shape({
    message: PropTypes.string,
  }),
  requirements: PropTypes.shape({
    message: PropTypes.string,
  }),
  price: PropTypes.shape({
    message: PropTypes.string,
  }),
  categoryTitle: PropTypes.shape({
    message: PropTypes.string,
  }),
  language: PropTypes.shape({
    message: PropTypes.string,
  }),
  thumbnailImage: PropTypes.shape({
    message: PropTypes.string,
  }),
})
