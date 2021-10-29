/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Box, Divider, Button, CircularProgress,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import Introduction from '../../../../components/CommonModal/Introduction'
import PrimaryContact from '../../Company/LeftRightSection/primaryContact'
import ContactCenterSkeleton from
  '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/contactCenterSkeleton'
import {
  jobPostCompanyDetailsFetchStart, resetCompanyDetails, allChatsRequestStart,
} from '../../../../redux-saga/redux/actions'
import { formatCount } from '../../../../utils/common'
import { REQUEST_TYPES } from '../../../../utils/constants'
import { NEW_CHAT } from '../../../../redux-saga/redux/constants'

const OtherCompanyIntro = ({ clientId, imageName }) => {
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)

  const { companyDetails, success, isCompanyDetailsLoading } = useSelector((state) => state.companyDetailsForProfile)
  const { userDetails } = useSelector((state) => state.login)
  const { isLoading, dataType } = useSelector((state) => state.allChats)

  const dispatch = useDispatch()

  useEffect(() => () => dispatch(resetCompanyDetails()), [ dispatch ])

  useEffect(() => {
    dispatch(jobPostCompanyDetailsFetchStart({
      requestType: REQUEST_TYPES.FETCH,
      clientId,
    }))
  }, [ dispatch, clientId ])

  useEffect(() => {
    if (!isLoading && dataType === NEW_CHAT) {
      setIsNewChatLoading(false)
    }
  }, [ isLoading, dataType ])

  const handleFollow = useCallback(() => {
    dispatch(jobPostCompanyDetailsFetchStart({
      requestType: REQUEST_TYPES.UPDATE,
      clientId,
      isFollowing: companyDetails && !companyDetails.isFollowing,
    }))
  }, [ dispatch, clientId, companyDetails ])

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: NEW_CHAT,
      candidate: {
        id: companyDetails?.userId,
        clientId: companyDetails?.clientId,
        name: companyDetails?.companyName,
        profilePic: companyDetails?.companyImg,
        location: companyDetails?.location,
        title: companyDetails?.title,
        userCode: 'employer',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, companyDetails ])

  if ((_.isNull(isCompanyDetailsLoading) || isCompanyDetailsLoading) && !success) {
    return <ContactCenterSkeleton />
  }

  return (
    <>
      <Box className='custom-box contact-center-info-root'>
        <Introduction
          key={ clientId }
          imageName={ imageName }
          rating={ companyDetails.rating }
          imageSrc={ companyDetails.companyImg }
          name={ companyDetails.companyName }
          location={ companyDetails.location }
          date={ companyDetails.registrationDate }
        />
        <div className=' mt-20 mb-20'>
          {userDetails && userDetails.user_id !== companyDetails?.userId && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ handleSendMessage }
              disabled={ isNewChatLoading }
            >
              Message
              {isNewChatLoading && <CircularProgress size={ 20 } className='message-button-loader' />}
            </Button>
          )}
        </div>
        <div className=' mt-20 mb-20'>
          {userDetails && !_.isEqual(userDetails.user_code, 'employer') && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ handleFollow }
            >
              {companyDetails.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
        <h4 className='h4 margin-top-bottom-10'>{companyDetails.title}</h4>
        <p className='para'>{companyDetails.summary}</p>
        <Divider className='divider' />
        <div className='display-inline-flex justify-between is-fullwidth'>
          <div>
            <h4 className='h4'>{ formatCount(companyDetails.followers || 0) }</h4>
            <p className='para'> Followers </p>
            <h4 className='h4 mt-20'>{ formatCount(companyDetails.hires || 0) }</h4>
            <p className='para'> Hires </p>
            <h4 className='h4 mt-20'> 2M+ </h4>
            <p className='para'> Total Calss </p>
          </div>
          <div>
            <h4 className='h4'>{ formatCount(companyDetails.following || 0) }</h4>
            <p className='para'> Following </p>
            <h4 className='h4 mt-20'>{ formatCount(companyDetails.jobsPosted || 0) }</h4>
            <p className='para'> Jobs Posted </p>
          </div>
        </div>
      </Box>

      <Box className='mt-20'>
        <PrimaryContact heading='Primary Contacts' />
      </Box>
    </>
  )
}

OtherCompanyIntro.defaultProps = {
  clientId: null,
  imageName: 'good',

}
OtherCompanyIntro.propTypes = {
  clientId: PropTypes.number,
  imageName: PropTypes.string,
}

export default OtherCompanyIntro
