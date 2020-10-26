import React, { useState } from 'react'
import {
  Avatar, Box, Button, Divider, Chip,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import {
  terry, sally, kareem, ray, helen,
} from '../../../../assets/images/avatar'
import './styles.scss'

const JobPost = ({
  jobPostHeading, createdAt, jobDescription,
  payment, duration, jobType,
  location, experienceLevel, needed,
  skillsTags, courses,
}) => {
  const [ visibleProfileTags, setVisibleProfileTags ] = useState(skillsTags.filter((tag, index) => index < 3))

  return (
    <>
      <Box className='box job-post-root'>
        <div className='display-inline-flex  is-fullwidth'>
          <h3 className='job-post-heading'>
            {jobPostHeading}
          </h3>
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Edit Post
          </Button>
        </div>
        <p className='date'>
          {createdAt}
        </p>
        <Divider className='divider' />

        <div className='job-post-description is-fullwidth display-inline-flex'>
          <Button className='account-button pull-right '> Account Sales </Button>
          <p>
            {jobDescription}
          </p>
        </div>
        <Divider className='divider' />

        <div className='display-inline-flex job-post-specifications is-fullwidth'>
          <div>
            <h4 className='h4'>{payment}</h4>
            <p>Payment</p>
            <h4 className='h4 mt-20'>{duration}</h4>
            <p>Duration</p>
          </div>
          <div>
            <h4 className='h4'>{jobType}</h4>
            <p>Job Type</p>
            <h4 className='h4 mt-20'>{location}</h4>
            <p>Location</p>
          </div>
          <div>
            <h4 className='h4'>{experienceLevel}</h4>
            <p>Experience Level</p>
            <h4 className='h4 mt-20'>{needed}</h4>
            <p>Needed</p>
          </div>
        </div>

        <div>
          <h3 className='mt-10'> Required Skills</h3>
          <div className='tags-set mb-20'>
            {visibleProfileTags.map((tag) => <Chip key={ tag } label={ tag } className='tag-chip' />)}
          </div>
          <h3 className='mt-10'> Bonus Skills</h3>
          <div className='tags-set mb-20'>
            {[ 'Customer Service' ].map((tag) => <Chip key={ tag } label={ tag } className='tag-chip' />)}
          </div>
        </div>
        <div className='display-inline-flex course-section '>
          <h3 className='mt-15 mb-10'> Required Course</h3>
          <div className='mb-20'>
            <Button className='text-button mr-10'>
              {courses.requiredCourses[ 0 ].courseName}
            </Button>
            <p className='paragraph-light-content'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
            <Button className='text-button'>
              { courses.requiredCourses[ 1 ].courseName}
            </Button>
            <p className='paragraph-light-content'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
          </div>
          <h3 className='mt-15 mb-10'> Bonus Course </h3>
          <div className='margin-bottom-15'>
            <Button className='text-button'>
              { courses.bonusCourses.courseName}
            </Button>
            <p className='paragraph-light-content'>
              { courses.bonusCourses.courseAuthor}
            </p>
          </div>
        </div>
      </Box>

      <Box className='box job-application-root'>
        <h3>
          Pending (2)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
          <div className='candidate-info'>
            <div className='candidate-head'>
              <h4>Terry Garret</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ 5 }
                precision={ 0.1 }
              />
            </div>
            <Button className='text-button'>View full application </Button>
            <p className='description'> Customer Service Specialist </p>
          </div>
        </div>
        <p className='date'> Received 1 days ago</p>
        <p>
          As someone who's has made over 100,000 sales calls and sold tens of millions of dollars of services and
          products. I clearly understand how challenging it can be to gain appointments, demos, and sales.
          You can see by my rating and reviews that I'm very effective at what I do...
        </p>
        <div className='pending-application-buttons'>
          <Button
            classes={ {
              root: 'button-secondary-small-red',
              label: 'button-secondary-small-label',
            } }
          >
            Reject
          </Button>
          <div>
            <Button
              className='message-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Message
            </Button>
            <Button
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
            >
              Hire
            </Button>
          </div>
        </div>
        <Divider className='divider' />
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Randy Williamson' src={ kareem } />
          <div className='candidate-info'>
            <div className='candidate-head'>
              <h4>Randy Williamson</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ 5 }
                precision={ 0.1 }
              />
            </div>
            <Button className='text-button'>View full application </Button>
            <p className='description'> Customer Service Specialist </p>
          </div>
        </div>
        <p className='date'> Received 1 days ago</p>
        <p>
          As someone who's has made over 100,000 sales calls and sold tens of millions of dollars of services and
          products. I clearly understand how challenging it can be to gain appointments, demos, and sales.
          You can see by my rating and reviews that I'm very effective at what I do...
        </p>
        <div className='pending-application-buttons'>
          <Button
            classes={ {
              root: 'button-secondary-small-red',
              label: 'button-secondary-small-label',
            } }
          >
            Reject
          </Button>
          <div>
            <Button
              className='message-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Message
            </Button>
            <Button
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
            >
              Hire
            </Button>
          </div>
        </div>
      </Box>

      <Box className='box job-application-root'>
        <h3>
          Evaluating (2)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Chad Green' src={ sally } />
          <div className='candidate-info'>
            <div className='candidate-head'>
              <h4>Chad Green</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ 5 }
                precision={ 0.1 }
              />
            </div>
            <Button className='text-button'>View full application </Button>
            <p className='description'> Customer Service Specialist </p>
          </div>
        </div>
        <p className='date'> Received 1 days ago</p>
        <p>
          I am an Expert Virtual Assistant and Customer Service professional with a wealth of experience and
          training in different areas. I have a proven track record for meeting timelines and exceeding
          expectations...
        </p>
        <div className='pending-application-buttons mt-10'>
          <p> Pretraining </p>
          <div>
            <Button
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Message
            </Button>
          </div>
        </div>
        <Divider className='divider' />
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Ray Hill' src={ ray } />
          <div className='candidate-info'>
            <div className='candidate-head'>
              <h4>Ray Hill</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ 5 }
                precision={ 0.1 }
              />
            </div>
            <Button className='text-button'>View full application </Button>
            <p className='description'> Customer Service Specialist </p>
          </div>
        </div>
        <p className='date'> Received 1 days ago</p>
        <p>
          I have been working B2B Cold Calling Appointment Setting and Lead Generating various industries from over
          20 years working from the call center environment and my home office managing leads from beginning to end...
        </p>
        <div className='pending-application-buttons mt-10'>
          <p> Screening </p>
          <div>
            <Button
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Message
            </Button>
          </div>
        </div>
      </Box>

      <Box className='box job-application-root'>
        <h3>
          Hired (1)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Helen Murphy' src={ helen } />
          <div className='candidate-info'>
            <div className='candidate-head'>
              <h4>Helen Murphy</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ 5 }
                precision={ 0.1 }
              />
            </div>
            <Button className='text-button'>View full application </Button>
            <p className='description'> Customer Service Specialist </p>
          </div>
        </div>
        <p className='date'> Received 1 days ago</p>
        <p>
          I am an Expert Virtual Assistant and Customer Service professional with a wealth of experience and
          training in different areas. I have a proven track record for meeting timelines and exceeding
          expectations...
        </p>
        <div className='mb-50'>
          <Button
            className='pull-right'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Message
          </Button>
        </div>
      </Box>

    </>
  )
}

JobPost.propTypes = {
  jobPostHeading: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  experienceLevel: PropTypes.string.isRequired,
  needed: PropTypes.string.isRequired,
  skillsTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  courses: PropTypes.object.isRequired,
}

export default JobPost
