import React from 'react'
import {
  Avatar, Box, Button, Divider, Chip,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {
  terry, sally, kareem, ray, helen,
} from '../../../../assets/images/avatar'
import './styles.scss'

const JobPost = () => (
  <>
    <Box className='box job-post-root'>
      <div className='display-inline-flex  is-fullwidth'>
        <h3 className='job-post-heading'>Looking for Experienced Customer service specialist </h3>
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-secondary-small edit-post',
            label: 'MuiButton-label button-secondary-small-label',
          } }
        >
          Edit Post
        </Button>
      </div>
      <p className='date'> Posted 2 days ago </p>
      <Divider className='divider' />

      <div className='job-post-description is-fullwidth display-inline-flex'>
        <Button className='account-button pull-right '> Account Sales </Button>

        <p>
          ICC is a strategic partner to the world's leading companies, bringing solutions and enhancing customer
          experience during each interaction. We are the largest interaction expert team in the market: multicultural,
          highly skilled, and deeply knowlegdeable, with a wide range of integrated omnichannel solutions, technology,
          and the highest security standards.
        </p>
        <br />
        <p>
          Whether you're looking for work in a contact center, seeking cloud-based contact center software or you're in
          the market for talent, we've got you covered. Powered by blockchain smart contracts with no middlemen
          involved, our patent-pending technology ensures the right agent is matched to the right position at the
          right time. Members of our team have been on the battlefield as agents, supervisors and executives.
          We know firsthand how irate customers respond, what makes employees happy, the key performance metrics
          for contact centers, and how the right technology can make a difference.
        </p>
      </div>
      <Divider className='divider' />

      <div className='display-inline-flex job-post-specifications is-fullwidth'>
        <div>
          <h4 className='heading'>$10/hr</h4>
          <p>Payment</p>
        </div>
        <div>
          <h4 className='heading'>Part Time</h4>
          <p>Job Type</p>
        </div>
        <div className='mr-30'>
          <h4 className='heading'>Entry</h4>
          <p>Experience Level</p>
        </div>
      </div>

      <div className='display-inline-flex job-post-specifications is-fullwidth'>
        <div>
          <h4 className='heading'>6 months</h4>
          <p>Duration</p>
        </div>
        <div className='mr-15'>
          <h4 className='heading'>Remote</h4>
          <p>Location</p>
        </div>
        <div className='mr-45'>
          <h4 className='heading'>6/50 hired</h4>
          <p>Needed</p>
        </div>
      </div>

      <div>
        <h3 className='mt-10'> Required Skills</h3>
        <div className='skills-tags mt-10'>
          <Chip label='Customer Service' className='skills-chips' />
          <Chip label='Phone Calling ' className='skills-chips' />
          <Chip label='Email Supoort' className='skills-chips' />
          <Chip label='Email Supoort' className='skills-chips' />
          <Chip label='Email Supoort' className='skills-chips' />
        </div>
        <h3 className='mt-10'> Bonus Skills</h3>
        <div className='skills-tags mt-10'>
          <Chip label='Customer Service' className='skills-chips' />
        </div>
      </div>
      <div className='display-inline-flex course-section '>
        <h3 className='mt-10'> Required Course</h3>
        <div className='margin-top-bottom-10'>
          <Button className='text-button mr-10'>How to talk to clients? </Button>
          <p>Chris Porter, 2020</p>
          <Button className='text-button'>Email Communication </Button>
          <p>Martha Riley, 2020</p>
        </div>
        <h3> Bonus Course </h3>
        <div className='margin-top-bottom-10'>
          <Button className='text-button'>Managing Difficult Situation </Button>
          <p>Roy Gordon, 2020</p>
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
          <b>Terry Garret</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
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
          variant='contained'
          className='button-secondary-small reject-button'
          classes={ { label: 'secondary-label' } }
        >
          Reject
        </Button>
        <div>
          <Button
            variant='contained'
            className='button-secondary-small message-button'
            classes={ { label: 'secondary-label' } }
          >
            Message
          </Button>
          <Button
            variant='contained'
            className='button-primary-small hire-button'
            classes={ { label: 'primary-label' } }
          >
            Hire
          </Button>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex job-application-head'>
        <Avatar className='profile-pic' alt='Randy Williamson' src={ kareem } />
        <div className='candidate-info'>
          <b>Randy Williamson</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
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
          variant='contained'
          className='button-secondary-small reject-button'
          classes={ { label: 'secondary-label' } }
        >
          Reject
        </Button>
        <div>
          <Button
            variant='contained'
            className='button-secondary-small message-button'
            classes={ { label: 'secondary-label' } }
          >
            Message
          </Button>
          <Button
            variant='contained'
            className='button-primary-small hire-button'
            classes={ { label: 'primary-label' } }
          >
            Hire
          </Button>
        </div>
      </div>
      <Divider className='divider' />
    </Box>

    <Box className='box job-application-root'>
      <h3>
        Evaluating (2)
      </h3>
      <div className='display-inline-flex job-application-head'>
        <Avatar className='profile-pic' alt='Chad Green' src={ sally } />
        <div className='candidate-info'>
          <b>Chad Green</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
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
            variant='contained'
            className='button-secondary-small message-button'
            classes={ { label: 'secondary-label' } }
          >
            Message
          </Button>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex job-application-head'>
        <Avatar className='profile-pic' alt='Ray Hill' src={ ray } />
        <div className='candidate-info'>
          <b>Ray Hill</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
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
            variant='contained'
            className='button-secondary-small message-button'
            classes={ { label: 'secondary-label' } }
          >
            Message
          </Button>
        </div>
      </div>
      <Divider className='divider' />
    </Box>

    <Box className='box job-application-root'>
      <h3>
        Hired (1)
      </h3>
      <div className='display-inline-flex job-application-head'>
        <Avatar className='profile-pic' alt='Helen Murphy' src={ helen } />
        <div className='candidate-info'>
          <b>Helen Murphy</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
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
      <div className='pending-application-buttons mt-10 hired-application'>
        <Button
          variant='contained'
          className='button-secondary-small message-button hire-message'
          classes={ { label: 'secondary-label' } }
        >
          Message
        </Button>
      </div>
      <Divider className='divider' />
    </Box>
  </>
)

export default JobPost
