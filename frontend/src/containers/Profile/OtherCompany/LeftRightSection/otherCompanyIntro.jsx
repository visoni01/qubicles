import React, { useEffect } from 'react'
import { Box, Divider, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Introduction from '../../../People/ContactCenter/Introduction'
import PrimaryContact from '../../Company/LeftRightSection/primaryContact'
import ContactCenterSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/contactCenterSkeleton'
import { jobPostCompanyDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const OtherCompanyIntro = ({
  clientId,
  imageName,
}) => {
  const { companyDetails, success, isCompanyDetailsLoading } = useSelector((state) => state.companyDetailsForProfile)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jobPostCompanyDetailsFetchStart({ clientId }))
  }, [ dispatch, clientId ])

  if (isCompanyDetailsLoading && !success) {
    return (
      <ContactCenterSkeleton />
    )
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
          <Button
            className='wide-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Message
          </Button>
        </div>
        <div className=' mt-20 mb-20'>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Unfollow
          </Button>
        </div>
        <h4 className='h4 margin-top-bottom-10'>
          {companyDetails.title}
        </h4>
        <p className='para'>
          {companyDetails.summary}
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
