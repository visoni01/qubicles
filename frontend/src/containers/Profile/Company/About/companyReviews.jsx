import React, { useState, useEffect } from 'react'
import {
  Button, Tabs, Tab,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ViewAllRatings from '../../OtherAgent/viewAllRatings'
import { companyRatingsFetchStart } from '../../../../redux-saga/redux/actions'
import Loader from '../../../../components/loaders/circularLoader'
import AddCompanyReview from './addReview'
import ListReviews from './listReviews'
import { clientRatingLabels } from '../../OtherAgent/ratingLabels'

const CompanyReviews = ({
  companyId,
}) => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)
  const {
    viewRatings, addReviewAccess, fetchLoading, fetchSuccess,
  } = useSelector((state) => state.companyRatings)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(companyRatingsFetchStart({
      clientId: companyId,
    }))
  }, [ dispatch, companyId ])

  if (!fetchLoading && fetchSuccess) {
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
              onClick={ () => setOpenReviewModal(true) }
            >
              Leave Review
            </Button>
            )}
          </div>
          <div className='custom-active-tabs'>
            <Tabs
              value={ activeTab }
              onChange={ (_, tab) => setActivetab(tab) }
            >
              <Tab label='Received' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
              <Tab label='Given' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
            </Tabs>
          </div>

          {/* View Company Ratings */}
          <div className='review-section-rating-view'>
            {fetchLoading && !fetchSuccess ? (
              <Loader
                className='custom-loader'
                size={ 75 }
                enableOverlay={ false }
                displayLoaderManually
              />
            ) : (
              <ViewAllRatings
                subRatingLabels={ clientRatingLabels }
                subRatingValues={ {
                  cultureRating: viewRatings.cultureRating,
                  leadershipRating: viewRatings.leadershipRating,
                  careerAdvancementRating: viewRatings.careerAdvancementRating,
                  compensationRating: viewRatings.compensationRating,
                } }
                totalAverageRating={ viewRatings.totalAverageRating }
                totalAverageRaters={ viewRatings.totalAverageRaters }
              />
            )}
          </div>

          {/* List Reviews */}
          <ListReviews
            clientId={ companyId }
            type={ activeTab === 0 ? 'recieved' : 'given' }
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
  } return (<></>)
}

CompanyReviews.propTypes = {
  companyId: PropTypes.number.isRequired,
}

export default CompanyReviews
