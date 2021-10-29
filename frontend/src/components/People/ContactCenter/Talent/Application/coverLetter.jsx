/* eslint-disable react/no-danger */
import React from 'react'
import '../../../../../containers/People/ContactCenter/styles.scss'
import '../../../../../containers/People/ContactCenter/Talent/styles.scss'
import PropTypes from 'prop-types'

const CoverLetter = ({ application }) => (
  <div className='custom-box cover-letter-root has-fullwidth'>
    <h3 className='h3'>
      {application.status === 'invited' ? 'Invitation' : 'Cover Letter'}
    </h3>
    <p className='para mt-10 mb-10' dangerouslySetInnerHTML={ { __html: application.coverLetter } } />
  </div>
)

CoverLetter.propTypes = {
  application: PropTypes.shape().isRequired,
}

export default CoverLetter
