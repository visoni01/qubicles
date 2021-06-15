import React from 'react'
import {
  faChevronLeft, faAward,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box, Button, Divider,
} from '@material-ui/core'
import '../styles.scss'
import Introduction from '../../../../../components/CommonModal/Introduction'
import { testResumeIntroduction } from '../../testData'

const ResumeIntro = ({
  candidateId,
  candidateName,
  candidateRating,
  location,
  profileName,
  profileImage,
  profileDescription,
  ratePerHourDollar,
  highestEducation,
  yearsOfExpirience,
}) => (
  <>
    <Box className='custom-box resume-intro-root'>
      <div className='mb-20'>
        <Button
          onClick={ () => window.history.back() }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          Back
        </Button>
      </div>
      <Introduction
        key={ candidateId }
        imageName={ profileName }
        rating={ candidateRating }
        imageSrc={ profileImage }
        name={ candidateName }
        location={ location }
        date={ testResumeIntroduction.date }
      />
      <h4 className='h4 margin-top-bottom-10'>
        {profileName}
      </h4>
      <p className='para'>
        {profileDescription}
      </p>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between is-fullwidth'>
        <div>
          <h4 className='h4'> 7,233 </h4>
          <p className='para'> Total Calls </p>
          <h4 className='h4 mt-20'> $5K+ </h4>
          <p className='para'> Total Earnings </p>
        </div>
        <div>
          <h4 className='h4'> 469h </h4>
          <p className='para'> Hours Worked </p>
          <h4 className='h4 mt-20'>
            {ratePerHourDollar && `$${ ratePerHourDollar }/hour`}
          </h4>
          <p className='para'> Hourly Wage </p>
        </div>
      </div>

      <Divider className='divider' />
      <div className='agent-specifications'>
        <h4 className='h4 mt-10'>
          Highest Level of Education
        </h4>
        <p className='para personal-details'>
          {highestEducation}
        </p>
        <h4 className='h4 mt-20'>
          Years of Experience
        </h4>
        <p className='para personal-details'>{` ${ yearsOfExpirience } years`}</p>
      </div>
      <Divider className='divider' />
      <FontAwesomeIcon className='custom-fa-icon sz-xxl' icon={ faAward } />
    </Box>
  </>
)

ResumeIntro.defaultProps = {
  candidateId: null,
  candidateName: '',
  candidateRating: 0,
  location: '',
  profileName: '',
  profileImage: '',
  profileDescription: '',
  ratePerHourDollar: 0,
  highestEducation: '',
  yearsOfExpirience: '',
}
ResumeIntro.propTypes = {
  candidateId: PropTypes.number,
  candidateName: PropTypes.string,
  candidateRating: PropTypes.number,
  location: PropTypes.string,
  profileName: PropTypes.string,
  profileImage: PropTypes.string,
  profileDescription: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  highestEducation: PropTypes.string,
  yearsOfExpirience: PropTypes.string,
}

export default ResumeIntro
