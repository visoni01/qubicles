import React, { useState } from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import Introduction from '../../../People/ContactCenter/Introduction'
import EditProfileModal from './editProfileModal'
import { kareem } from '../../../../assets/images/avatar'

const settings = {
  companyName: 'Microsoft',
  profilePic: kareem,
  city: 'San Francisco',
  state: 'CA',
  title: 'Customer Service Agent',
  summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus deleniti, sapiente perferendis
  aliquam sunt maiores libero pariatur cum rerum, obcaecati ipsum corporis ex, commodi laboriosam vero repellat maxime
  quo eum qui. Cumque aperiam cum quos voluptatem temporibus ratione tenetur odio amet, ex repudiandae! Hic perspiciat`,
}

const ContactCenterEditProfile = ({
  clientId,
  companyRating,
  registrationDate,
}) => {
  const [ openEditProfileModal, setOpenEditProfileModal ] = useState(false)

  return (
    <Box className='custom-box contact-center-info-root'>
      <Introduction
        key={ clientId }
        imageName={ settings.companyName }
        rating={ companyRating }
        imageSrc={ settings.profilePic }
        name={ settings.companyName }
        location={ `${ settings.city }, ${ settings.state } ` }
        date={ registrationDate }
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
        companyInfo={ {
          title: settings.title,
          summary: settings.summary,
          profilePic: settings.profilePic,
        } }
      />
      <Divider className='divider' />
      <div className='mt-20'>
        <h4 className='h4 mb-5'>Highest level of Education</h4>
        <p className='para'>High School Graduate</p>
      </div>
      <div className='mb-20 mt-20'>
        <h4 className='h4 mb-5'>Years of Experience</h4>
        <p className='para'>3+ years</p>
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

ContactCenterEditProfile.defaultProps = {
  clientId: null,
  companyRating: 5,
  registrationDate: '2020-11-18',
}

ContactCenterEditProfile.propTypes = {
  clientId: PropTypes.number,
  companyRating: PropTypes.number,
  registrationDate: PropTypes.string,
}

export default ContactCenterEditProfile
