import React from 'react'
import {
  faChevronLeft, faAward, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button, Divider,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { terry } from '../../../../../assets/images/avatar'
import '../styles.scss'

const ResumeIntro = () => (
  <>
    <Box className='box contact-center-info-root resume-intro-root'>
      <div className='mb-20'>
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          Back
        </Button>
      </div>
      <div className='display-inline-flex contact-center-head'>
        <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
        <div className='company-info'>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
          <h4>Terry Garret</h4>
          <p className='location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } />
            San Francisco, CA
          </p>
          <p className='date'> Member since 11/2020 </p>
        </div>
      </div>
      <h4 className='contact-center-title'>
        Customer Service Specialist
      </h4>
      <p className='description'>
        Over 25 years of experience. I am a seasoned marketing professional. I work well in  a dedicated home office
        with a desk. I am able to adhere to a time schedule and am flexible in my availability. I am college educated
        and have a medical background as well in pharmaceutical customer service. I have experience in fundraising,
        appointment setting, market research surverys, phone sales, cold calling, and businees to business sales and
        appointments. I have experience in voice-over work as well for different businesses. Especially enjoying real
        estate, insurance, and healthcare field assignments. I have also done data scraping and skip tracing handling
        collections accounts.
      </p>

      <div className='display-inline-flex agent-specifications is-fullwidth'>
        <div>
          <h4 className='heading'> 7,233 </h4>
          <p> Total Calls </p>
        </div>
        <div>
          <h4 className='heading'> 469h </h4>
          <p> Hours Worked </p>
        </div>
      </div>

      <Divider className='divider' />
      <div className='display-inline-flex agent-specifications is-fullwidth'>
        <div>
          <h4 className='heading'> 7,233 </h4>
          <p> Total Calls </p>
          <h4 className='heading mt-20'> $5K+ </h4>
          <p> Total Earnings </p>
        </div>
        <div>
          <h4 className='heading'> 469h </h4>
          <p> Hours Worked </p>
          <h4 className='heading mt-20'> 12.50$/hour </h4>
          <p> Hourly Wage </p>
        </div>
      </div>

      <Divider className='divider' />
      <div className='agent-specifications'>
        <h4 className='heading  mt-10'>
          Highest Level of Education
        </h4>
        <p className='personal-details'> high level graduate </p>
        <h4 className='heading mt-20'>
          Years of Experience
        </h4>
        <p className='personal-details'> 3+ years</p>
      </div>
      <Divider className='divider' />
      <FontAwesomeIcon className='badges' icon={ faAward } />
    </Box>
  </>
)

export default ResumeIntro
