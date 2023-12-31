import PropTypes from 'prop-types'

export const contentSectionPropType = PropTypes.shape({
  thumbnailImage: PropTypes.string,
  introductionVideo: PropTypes.string,
})

export const unitPropType = PropTypes.shape({
  unitId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  unitNum: PropTypes.string,
  sectionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  details: PropTypes.string,
  type: PropTypes.string,
  length: PropTypes.number,
  status: PropTypes.string,
})

export const sectionPropType = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  sectionNum: PropTypes.string,
  sectionIsActive: PropTypes.bool,
  units: PropTypes.arrayOf(PropTypes.any),
  status: PropTypes.string,
})

export const sectionsPropType = PropTypes.arrayOf(sectionPropType)

export const courseContentPropType = PropTypes.shape({
  sections: sectionsPropType.isRequired,
})

export const coursePropType = PropTypes.shape({
  courseId: PropTypes.number,
})

export const viewCoursePropType = PropTypes.shape({
  course: PropTypes.shape({
    courseId: PropTypes.number.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    studentsEnrolled: PropTypes.number.isRequired,
    canEdit: PropTypes.bool,
    updatedOn: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    informationSection: PropTypes.shape({
      price: PropTypes.number.isRequired,
      category: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      categoryTitle: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
    }).isRequired,
    contentSection: PropTypes.shape({
      thumbnailImage: PropTypes.any.isRequired,
    }).isRequired,
    courseDetails: PropTypes.shape({
      status: PropTypes.string.isRequired,
    }),
  }),
})

export const courseIdPropType = PropTypes.number
export const isEnrolledPropType = PropTypes.bool
export const introVideoPropType = PropTypes.string
export const courseTitlePropType = PropTypes.string
export const setOpenCoursePlayerPropType = PropTypes.func
export const setCurrentSectionPropType = PropTypes.func
export const setCurrentUnitPropType = PropTypes.func
export const isCoursePlayerOpenPropType = PropTypes.bool
export const courseStatusPropType = PropTypes.string
export const currentUnitIndexPropType = PropTypes.number
export const currentSectionIndexPropType = PropTypes.number
export const isIntroVideoActivePropType = PropTypes.bool
export const isSectionTestActivePropType = PropTypes.bool
export const openCoursePlayerPropType = PropTypes.bool
export const sectionIndexPropType = PropTypes.number
export const sectionIdPropType = PropTypes.number
export const creatorIdPropType = PropTypes.number
export const typePropType = PropTypes.string
export const isLoadingPropType = PropTypes.bool
export const dataTypePropType = PropTypes.string
export const isCreatorPropType = PropTypes.bool
export const isTestCompletedPropType = PropTypes.bool
