/* eslint-disable consistent-return */
import React, { useEffect } from 'react'
import {
  Avatar, Box, Button, Divider, Chip,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {
  terry, sally, kareem, ray, helen,
} from '../../../../assets/images/avatar'
import './styles.scss'
import ROUTE_PATHS from '../../../../routes/routesPath'
import { newJobDetailsFetchStart } from '../../../../redux-saga/redux/actions'
import { getTimeFromNow } from '../../../../utils/common'

const JobPost = ({
  jobId, courses,
}) => {
  const { jobDetails } = useSelector((state) => state.newJobDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(newJobDetailsFetchStart({ jobId }))
  }, [ dispatch ])

  return (
    <>
      <Box className='custom-box job-post-root'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 job-post-heading'>
            {jobDetails.title}
          </h3>
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => dispatch(newJobDetailsFetchStart({ jobId })) }
          >
            Edit Post
          </Button>
        </div>
        <p className='para light'>
          Posted
          {' '}
          {getTimeFromNow(jobDetails.createdOn)}
        </p>
        <Divider className='divider' />

        <div className='job-post-description is-fullwidth display-inline-flex'>
          <h4 className='h4 margin-top-bottom-10 text-link'> Account Sales </h4>
          <p className='para' dangerouslySetInnerHTML={ { __html: jobDetails.description } } />
        </div>
        <Divider className='divider' />

        <div className='display-inline-flex job-post-specifications is-fullwidth'>
          <div>
            <h4 className='h4'>
              $
              {jobDetails.payAmount}
              /hr
            </h4>
            <p className='para'>Payment</p>
            <h4 className='h4 mt-20'>{_.capitalize(jobDetails.durationType)}</h4>
            <p className='para'>Duration</p>
          </div>
          <div>
            <h4 className='h4'>{_.capitalize(jobDetails.jobType)}</h4>
            <p className='para'>Job Type</p>
            <h4 className='h4 mt-20'>{_.capitalize(jobDetails.locationType)}</h4>
            <p className='para'>Location</p>
          </div>
          <div>
            <h4 className='h4'>{_.capitalize(jobDetails.experienceType)}</h4>
            <p className='para'>Experience Level</p>
            <h4 className='h4 mt-20'>
              {jobDetails.fulfilled}
              {jobDetails.needed}
            </h4>
            <p className='para'>Needed</p>
          </div>
        </div>

        <div>
          <h3 className='h3 mt-10'> Required Skills</h3>
          <div className='tags-set mb-20'>
            { jobDetails.jobSkillsData
              && jobDetails.jobSkillsData.map((tag) => {
                if (tag.skill_preference === 'required') { return (<Chip key={ tag.job_skill_id } label={ tag[ 'XQodSkill.skill_name' ] } className='tag-chip' />) }
              })}
          </div>
          <h3 className='h3 mt-10'> Bonus Skills</h3>
          <div className='tags-set mb-20'>
            { jobDetails.jobSkillsData
              && jobDetails.jobSkillsData.map((tag) => {
                if (tag.skill_preference === 'plus') { return (<Chip key={ tag.job_skill_id } label={ tag[ 'XQodSkill.skill_name' ] } className='tag-chip' />) }
              })}
          </div>
        </div>
        <div className='display-inline-flex course-section is-fullwidth'>
          <h3 className='h3 mt-15 mb-10'> Required Course</h3>
          <div className='mb-10'>
            <span className='primary-text-link mr-10'>
              {courses.requiredCourses[ 0 ].courseName}
            </span>
            <p className='para light'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
            <span className='primary-text-link mr-10'>
              { courses.requiredCourses[ 1 ].courseName}
            </span>
            <p className='para light'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
          </div>
          <h3 className='h3 mt-10 mb-10'> Bonus Course </h3>
          <div className='mb-10'>
            <span className='primary-text-link mr-10'>
              { courses.bonusCourses.courseName}
            </span>
            <p className='para light'>
              { courses.bonusCourses.courseAuthor}
            </p>
          </div>
        </div>
      </Box>

      <Box className='mt-30 custom-box job-application-root'>
        <h3 className='h3'>
          Pending (2)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
          <div className='candidate-info'>
            <div className='head-with-link'>
              <div className='candidate-head'>
                <h4 className='h4'>Terry Garret</h4>
                <Rating
                  className='rating-star'
                  name='read-only'
                  readOnly
                  size='small'
                  value={ 5 }
                  precision={ 0.1 }
                />
              </div>
              <Link to={ ROUTE_PATHS.VIEW_JOB_APPLICATION }>
                <span className='primary-text-link float-right'>View full application </span>
              </Link>
            </div>
            <p className='para light  sz-sm '> Customer Service Specialist </p>
          </div>
        </div>
        <p className='para light'> Received 1 days ago</p>
        <p className='para'>
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
              className='message-button mr-20'
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
            <div className='head-with-link'>
              <div className='candidate-head'>
                <h4 className='h4'>Randy Williamson</h4>
                <Rating
                  className='rating-star'
                  name='read-only'
                  readOnly
                  size='small'
                  value={ 5 }
                  precision={ 0.1 }
                />
              </div>
              <Link to={ ROUTE_PATHS.VIEW_JOB_APPLICATION }>
                <span className='primary-text-link float-right'>View full application </span>
              </Link>
            </div>
            <p className='para light  sz-sm '> Customer Service Specialist </p>
          </div>
        </div>
        <p className='para light'> Received 1 days ago</p>
        <p className='para'>
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
              className='message-button mr-20'
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

      <Box className='mt-30 custom-box job-application-root'>
        <h3 className='h3'>
          Evaluating (2)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Chad Green' src={ sally } />
          <div className='candidate-info'>
            <div className='head-with-link'>
              <div className='candidate-head'>
                <h4 className='h4'>Terry Garret</h4>
                <Rating
                  className='rating-star'
                  name='read-only'
                  readOnly
                  size='small'
                  value={ 5 }
                  precision={ 0.1 }
                />
              </div>
              <Link to={ ROUTE_PATHS.VIEW_JOB_APPLICATION }>
                <span className='primary-text-link float-right'>View full application </span>
              </Link>
            </div>
            <p className='para light  sz-sm '> Customer Service Specialist </p>
          </div>
        </div>
        <p className='para light'> Received 1 days ago</p>
        <p className='para'>
          I am an Expert Virtual Assistant and Customer Service professional with a wealth of experience and
          training in different areas. I have a proven track record for meeting timelines and exceeding
          expectations...
        </p>
        <div className='pending-application-buttons mt-10'>
          <p className='para italic'> Pretraining </p>
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
            <div className='head-with-link'>
              <div className='candidate-head'>
                <h4 className='h4'>Ray Hill</h4>
                <Rating
                  className='rating-star'
                  name='read-only'
                  readOnly
                  size='small'
                  value={ 5 }
                  precision={ 0.1 }
                />
              </div>
              <Link to={ ROUTE_PATHS.VIEW_JOB_APPLICATION }>
                <span className='primary-text-link float-right'>View full application </span>
              </Link>
            </div>
            <p className='para light  sz-sm '> Customer Service Specialist </p>
          </div>
        </div>
        <p className='para light'> Received 1 days ago</p>
        <p className='para'>
          I have been working B2B Cold Calling Appointment Setting and Lead Generating various industries from over
          20 years working from the call center environment and my home office managing leads from beginning to end...
        </p>
        <div className='pending-application-buttons mt-10'>
          <p className='para italic'> Screening </p>
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

      <Box className='mt-30 custom-box job-application-root'>
        <h3 className='h3'>
          Hired (1)
        </h3>
        <div className='display-inline-flex job-application-head'>
          <Avatar className='profile-pic' alt='Helen Murphy' src={ helen } />
          <div className='candidate-info'>
            <div className='head-with-link'>
              <div className='candidate-head'>
                <h4 className='h4'>Helen Murphy</h4>
                <Rating
                  className='rating-star'
                  name='read-only'
                  readOnly
                  size='small'
                  value={ 5 }
                  precision={ 0.1 }
                />
              </div>
              <Link to={ ROUTE_PATHS.VIEW_JOB_APPLICATION }>
                <span className='primary-text-link float-right'>View full application </span>
              </Link>
            </div>
            <p className='para light  sz-sm '> Customer Service Specialist </p>
          </div>
        </div>
        <p className='para light'> Received 1 days ago</p>
        <p className='para'>
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
  jobId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  courses: PropTypes.object.isRequired,
}

export default JobPost
