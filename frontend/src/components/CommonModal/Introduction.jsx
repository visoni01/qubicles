import React, { useCallback } from 'react'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { defaultUser } from '../../assets/images/avatar'
import MenuOptions from '../../containers/Shared/menuOptions'
import { showSuccessMessage } from '../../redux-saga/redux/utils'
import { fetchAgentResumeStart } from '../../redux-saga/redux/people'
import { BlockIcon, CopyIcon } from '../../assets/images/profile'
import { LocationIcon } from '../../assets/images/common'
import { REQUEST_TYPES, USERS } from '../../utils/constants'
// import { formatDate } from '../../utils/common'

const Introduction = ({
  imageName, rating, imageSrc, name, location, userDetails, candidateId, hasBlockedUser,
  // date,
}) => {
  const dispatch = useDispatch()

  const handleCopyProfileUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)

    dispatch(showSuccessMessage({ msg: 'Url copied successfully!' }))
  }, [ dispatch ])

  const handleConfirmModal = useCallback(() => {
    dispatch(fetchAgentResumeStart({
      requestType: REQUEST_TYPES.UPDATE,
      candidateId,
      hasBlockedUser: !hasBlockedUser,
    }))
  }, [ dispatch, candidateId, hasBlockedUser ])

  return (
    <div className='is-flex is-between align-items-end'>
      <div className='display-inline-flex is-fullwidth align-items-center'>
        <Avatar className='profile-pic large' alt={ imageName } src={ imageSrc || defaultUser } />

        <div className='ml-10'>
          <Rating
            className='rating-star no-margin'
            name='read-only'
            readOnly
            size='small'
            value={ rating }
            precision={ 0.5 }
          />

          <h4 className='h4'>{name}</h4>

          {location && (
            <p className='para light'>
              <LocationIcon className='mr-5' />
              {location}
            </p>
          )}

          {/* WIP untill registration date doubt resolve */}
          {/* <p className='para light'>
            Member since
            {' '}
            {formatDate(date, 'MM/YYYY')}
          </p> */}
        </div>
      </div>

      {userDetails && !_.isEqual(userDetails.user_code, USERS.EMPLOYER)
        && candidateId && candidateId !== userDetails.user_id && (
        <div className='other-agent-menu mt-5'>
          <MenuOptions
            handleFirstOptionClick={ handleCopyProfileUrl }
            handleConfirmModal={ handleConfirmModal }
            confirmButtonText={ hasBlockedUser ? 'Unblock' : 'Block' }
            firstOption='Copy Profile Url'
            secondOption={ hasBlockedUser ? 'Unblock' : 'Block' }
            FirstIcon={ CopyIcon }
            SecondIcon={ BlockIcon }
            message={ `Are you sure you want to ${ hasBlockedUser ? 'unblock' : 'block' } this user ?` }
          />
        </div>
      )}
    </div>
  )
}

Introduction.defaultProps = {
  imageName: '',
  rating: null,
  imageSrc: '',
  name: '',
  location: '',
  userDetails: {
    user_code: '',
    user_id: '',
  },
  candidateId: null,
  hasBlockedUser: false,
  // date: contactCenterIntroduction.date,
}

Introduction.propTypes = {
  imageName: PropTypes.string,
  rating: PropTypes.number,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  userDetails: PropTypes.shape({
    user_code: PropTypes.string,
    user_id: PropTypes.number,
  }),
  candidateId: PropTypes.number,
  hasBlockedUser: PropTypes.bool,
  // date: PropTypes.string,
}

export default Introduction
