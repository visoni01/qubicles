import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Divider, Button } from '@material-ui/core'
import Introduction from '../../../People/ContactCenter/Introduction'
import EditProfileModal from './editProfileModal'

const AgentEditProfile = () => {
  const [ openEditProfileModal, setOpenEditProfileModal ] = useState(false)
  const { settings } = useSelector((state) => state.agentDetails)

  return (
    <Box className='custom-box contact-center-info-root'>
      <Introduction
        imageName={ settings.userName }
        rating={ settings.rating }
        imageSrc={ settings.profilePic }
        name={ settings.fullName }
        location={ `${ settings.city }, ${ settings.state } ` }
        date={ settings.registrationDate }
      />
      <div className=' mt-20 mb-20'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ () => setOpenEditProfileModal(true) }
        >
          Edit Profile
        </Button>
      </div>
      <h4 className='h4 margin-top-bottom-10'>
        {settings.title}
      </h4>
      <p className='para'>
        {settings.summary}
      </p>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between is-fullwidth'>
        <div>
          <h4 className='h4'> 242 </h4>
          <p className='para'> Followers</p>
          <h4 className='h4 mt-20'> 2K+ </h4>
          <p className='para'> Total Calls </p>
        </div>
        <div>
          <h4 className='h4'> 156 </h4>
          <p className='para'> Following</p>
          <h4 className='h4 mt-20'>
            124
          </h4>
          <p className='para'>Hours Worked </p>
        </div>
      </div>
      <EditProfileModal
        open={ openEditProfileModal }
        handleClose={ () => setOpenEditProfileModal(false) }
        agentInfo={ {
          title: settings.title,
          summary: settings.summary,
          profilePic: settings.profilePic,
          highestEducation: settings.highestEducation,
          yearsOfExperience: settings.yearsOfExperience,
          hourlyRate: settings.hourlyRate,
          preferredJob: settings.preferredJob,
          remoteJobs: settings.remoteJobs,
          onVacation: settings.onVacation,
          profileVisible: settings.profileVisible,
        } }
      />
      <Divider className='divider' />
      <div className='mt-20'>
        <h4 className='h4 mb-5'>Highest level of Education</h4>
        <p className='para'>{ settings.highestEducation }</p>
      </div>
      <div className='mb-20 mt-20'>
        <h4 className='h4 mb-5'>Years of Experience</h4>
        <p className='para'>{`${ settings.yearsOfExperience } years`}</p>
      </div>
      <Divider className='divider' />
      <div>
        <div className='mt-20 mb-10'>
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            fullWidth
          >
            Verify ID
          </Button>

        </div>
        <div className='mt-10'>

          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            fullWidth
          >
            Start Background Check
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default AgentEditProfile
