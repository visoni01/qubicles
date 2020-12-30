import React, { useState } from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Introduction from '../../../People/ContactCenter/Introduction'
import PrimaryContact from './primaryContact'
import EditProfileModal from './editProfileModal'

const ContactCenterEditProfile = ({
  clientId,
  companyRating,
  registrationDate,
}) => {
  const [ openEditProfileModal, setOpenEditProfileModal ] = useState(false)
  const { settings } = useSelector((state) => state.clientDetails)

  return (
    <>
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
            <p className='para'> Hires </p>
            <h4 className='h4 mt-20'> 2M+ </h4>
            <p className='para'> Total Calss </p>
          </div>
          <div>
            <h4 className='h4'> 156 </h4>
            <p className='para'> Following</p>
            <h4 className='h4 mt-20'>
              124
            </h4>
            <p className='para'> Jobs Posted </p>
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
      </Box>
      <Box className='mt-20'>
        <PrimaryContact heading='Primary Contacts' />
      </Box>
    </>
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
