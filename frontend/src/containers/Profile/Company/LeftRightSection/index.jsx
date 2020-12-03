import React, { useState } from 'react'
import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { contactCenterIntroduction } from '../../../NewPeople/ContactCenter/testData'
import Introduction from '../../../NewPeople/ContactCenter/Introduction'
import PrimaryContact from './primaryContact'
import EditProfileModal from './editProfileModal'

const ContactCenterEditProfile = ({
  clientId,
  imageName,
  companyRating,
  location,
  companyName,
  registrationDate,
  title,
  summary,
}) => {
  const [ openEditProfileModal, setOpenEditProfileModal ] = useState(false)
  const handleEditProfileModal = () => {
    setOpenEditProfileModal(true)
  }

  return (
    <>
      <Box className='custom-box contact-center-info-root'>
        <Introduction
          key={ clientId }
          imageName={ imageName }
          rating={ companyRating }
          imageSrc={ contactCenterIntroduction.imageSrc }
          name={ companyName }
          location={ location }
          date={ registrationDate }
          title={ title }
          description={ summary }
          isEdit
          editText='Edit Profile'
          handleEditModal={ handleEditProfileModal }
        />
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
  imageName: 'good',
  companyRating: 5,
  location: 'San Francisco, CA',
  companyName: 'Good Call Center',
  registrationDate: '2020-11-18',
  title: 'innovative Call Center',
  summary: `Whether you are looking for work in a contact center, seeking cloud-based contact center software
  or you are in the market for talent, we have got you covered. Powered by blockchain smart contracts with no
  middlemen involved, our patent-pending technology ensures the right agent is matched to the right position at
  the right time. Members of our team have been on the battlefield as agents, supervisors and executives. We know
  firsthand how irate customers respond, what makes employees happy, the key performance metrics for contact centers,
  and how the right technology can make a difference.`,
}
ContactCenterEditProfile.propTypes = {
  clientId: PropTypes.number,
  imageName: PropTypes.string,
  companyRating: PropTypes.number,
  location: PropTypes.string,
  companyName: PropTypes.string,
  registrationDate: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
}

export default ContactCenterEditProfile
