/* eslint-disable react/forbid-prop-types */
import React from 'react'
import {
  Avatar, Box, Button, Divider,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {
  terry, sally, kareem, ray, helen,
} from '../../../../assets/images/avatar'
import './styles.scss'
import ROUTE_PATHS from '../../../../routes/routesPath'

const JobApplication = () => (
  <>
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

export default JobApplication
