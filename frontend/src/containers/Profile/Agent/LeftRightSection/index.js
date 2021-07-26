/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import Introduction from '../../../../components/CommonModal/Introduction'
import EditProfileModal from './editProfileModal'
import { fetchAgentResumeStart } from '../../../../redux-saga/redux/actions'
import { formatCount } from '../../../../utils/common'

const AgentEditProfile = ({
  userName,
  rating,
  name,
  location,
  registrationDate,
  title,
  summary,
  profilePic,
  highestEducation,
  yearsOfExperience,
  hourlyRate,
  preferredJob,
  remoteJobs,
  onVacation,
  profileVisible,
  candidateId,
  followers,
  following,
  isFollowing,
  hasBlockedUser,
}) => {
  const [ openEditProfileModal, setOpenEditProfileModal ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleFollow = useCallback(() => {
    dispatch(fetchAgentResumeStart({
      requestType: 'UPDATE',
      candidateId,
      isFollowing: !isFollowing,
    }))
  }, [ dispatch, candidateId, isFollowing ])

  return (
    <Box className='custom-box contact-center-info-root'>
      <Introduction
        imageName={ userName }
        rating={ rating }
        imageSrc={ profilePic }
        name={ name }
        location={ location }
        date={ registrationDate }
        userDetails={ userDetails }
        candidateId={ candidateId }
        hasBlockedUser={ hasBlockedUser }
      />
      <div className=' mt-20 mb-20'>
        {!candidateId && (
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
        )}
      </div>
      <div className=' mt-20 mb-20'>
        {candidateId && candidateId !== userDetails.user_id && (
          <Button
            className='wide-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Message
          </Button>
        )}
      </div>
      <div className=' mt-20 mb-20'>
        {userDetails && !_.isEqual(userDetails.user_code, 'employer')
        && candidateId && candidateId !== userDetails.user_id && !hasBlockedUser && (
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ handleFollow }
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
      <h4 className='h4 margin-top-bottom-10'>
        {title}
      </h4>
      <p className='para'>
        {summary}
      </p>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between is-fullwidth'>
        <div>
          <h4 className='h4'>
            { formatCount(followers) }
          </h4>
          <p className='para'> Followers</p>
          <h4 className='h4 mt-20'> 2K+ </h4>
          <p className='para'> Total Calls </p>
        </div>
        <div>
          <h4 className='h4'>
            { formatCount(following) }
          </h4>
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
          title,
          summary,
          profilePic,
          highestEducation,
          yearsOfExperience,
          hourlyRate,
          preferredJob,
          remoteJobs,
          onVacation,
          profileVisible,
        } }
      />
      <Divider className='divider' />
      {highestEducation && (
      <div className='mt-20'>
        <h4 className='h4 mb-5'>Highest level of Education</h4>
        <p className='para'>{ highestEducation }</p>
      </div>
      )}
      {yearsOfExperience && (
      <div className='mb-20 mt-20'>
        <h4 className='h4 mb-5'>Years of Experience</h4>
        <p className='para'>{`${ yearsOfExperience } years`}</p>
      </div>
      )}
      {(highestEducation || yearsOfExperience) && <Divider className='divider' />}
      {!candidateId && (
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
      )}
      {candidateId && <FontAwesomeIcon className='custom-fa-icon sz-xxl' icon={ faAward } />}
    </Box>
  )
}

AgentEditProfile.propTypes = {
  userName: PropTypes.string,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  registrationDate: PropTypes.string,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  highestEducation: PropTypes.string.isRequired,
  yearsOfExperience: PropTypes.string.isRequired,
  hourlyRate: PropTypes.number.isRequired,
  preferredJob: PropTypes.string,
  remoteJobs: PropTypes.bool,
  onVacation: PropTypes.bool,
  profileVisible: PropTypes.number,
  candidateId: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
  isFollowing: PropTypes.bool,
  hasBlockedUser: PropTypes.bool,
}

AgentEditProfile.defaultProps = {
  userName: null,
  candidateId: null,
  preferredJob: null,
  remoteJobs: null,
  onVacation: null,
  profileVisible: null,
  registrationDate: '',
  followers: 0,
  following: 0,
  isFollowing: false,
  hasBlockedUser: false,
}

export default AgentEditProfile
