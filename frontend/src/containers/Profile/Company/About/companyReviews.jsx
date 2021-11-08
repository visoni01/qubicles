/* eslint-disable complexity */
import React, { useState, useEffect } from 'react'
import { Button, Tabs, Tab } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ViewAllRatings from '../../../../components/CommonModal/viewAllRatings'
import { profileRatingsFetchStart } from '../../../../redux-saga/redux/actions'
import AddCompanyReview from './addReview'
import ListReviews from './listReviews'
import { clientRatingLabels } from '../../../../components/Profile/Reviews/ratingLabels'
import CompanyRatingSkeleton from
  '../../../../components/People/ContactCenter/SkeletonLoader/Training/ratingSkeleton'
import { USERS } from '../../../../utils/constants'
import './styles.scss'

const CompanyReviews = ({ companyId }) => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)

  const {
    viewRatings, addReviewAccess, fetchLoading,
  } = useSelector((state) => state.profileRatings)
  const { fetchLoading: reviewLoading } = useSelector((state) => state.profileReviews)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileRatingsFetchStart({
      profileType: USERS.EMPLOYER,
      id: companyId,
    }))
  }, [ dispatch, companyId ])

  return (
    <>
      <div className='mb-25 custom-box resume-root reviews-root has-fullwidth'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 is-fullwidth'> Reviews </h3>
          {addReviewAccess && (
            <Button
              classes={ {
                root: 'button-secondary-small review-button',
                label: 'button-secondary-small-label',
              } }
              disabled={ fetchLoading || _.isNull(fetchLoading) || reviewLoading || _.isNull(reviewLoading) }
              onClick={ () => setOpenReviewModal(true) }
            >
              Leave Review
            </Button>
          )}
        </div>
        <div className='custom-active-tabs'>
          <Tabs
            value={ activeTab }
            onChange={ (__, tab) => setActivetab(tab) }
          >
            <Tab label='Received' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
            <Tab label='Given' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
          </Tabs>
        </div>

        {/* View Company Ratings */}
        {(fetchLoading || _.isNull(fetchLoading)) && <CompanyRatingSkeleton />}
        {!fetchLoading && (
          <ViewAllRatings
            subRatingLabels={ clientRatingLabels }
            subRatingValues={ {
              cultureRating: viewRatings.rating1,
              leadershipRating: viewRatings.rating2,
              careerAdvancementRating: viewRatings.rating3,
              compensationRating: viewRatings.rating4,
            } }
            totalAverageRating={ Number(viewRatings.totalAverageRating).toFixed(2) }
            totalAverageRaters={ viewRatings.totalAverageRaters }
          />
        )}

        {/* List Reviews */}
        <ListReviews
          id={ companyId }
          profileType={ USERS.EMPLOYER }
          reviewType={ activeTab === 0 ? 'received' : 'given' }
        />
      </div>

      {/* Leave Review */}
      <AddCompanyReview
        clientId={ companyId }
        openReviewModal={ openReviewModal }
        setOpenReviewModal={ setOpenReviewModal }
      />
    </>
  )
}

CompanyReviews.propTypes = {
  companyId: PropTypes.number.isRequired,
}

export default CompanyReviews
