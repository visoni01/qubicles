import React, { useState, useEffect } from 'react'
import {
  Button, Tabs, Tab,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ViewAllRatings from '../../../../components/CommonModal/viewAllRatings'
import { profileRatingsFetchStart } from '../../../../redux-saga/redux/actions'
import Loader from '../../../loaders/circularLoader'
import { agentRatingLabels } from '../../../../components/Profile/Reviews/ratingLabels'
import ListReviews from '../../Company/About/listReviews'
import AddAgentReview from './addReview'
import '../../Company/About/styles.scss'

const AgentReviews = ({
  agentUserId,
}) => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)
  const {
    viewRatings, addReviewAccess, fetchLoading, fetchSuccess,
  } = useSelector((state) => state.profileRatings)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileRatingsFetchStart({
      profileType: 'agent',
      id: agentUserId,
    }))
  }, [ dispatch, agentUserId ])

  if (!fetchLoading) {
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
                subRatingLabels={ agentRatingLabels }
                subRatingValues={ {
                  performanceRating: viewRatings.rating1,
                  teamPlayerRating: viewRatings.rating2,
                  customerInteractionRating: viewRatings.rating3,
                  dependabilityRating: viewRatings.rating4,
                } }
                totalAverageRating={ viewRatings.totalAverageRating }
                totalAverageRaters={ viewRatings.totalAverageRaters }
              />
            )}
          </div>

          {/* List Reviews */}
          <ListReviews
            id={ agentUserId }
            profileType='agent'
            reviewType={ activeTab === 0 ? 'received' : 'given' }
          />
        </div>

        {/* Leave Review */}
        <AddAgentReview
          agentUserId={ agentUserId }
          openReviewModal={ openReviewModal }
          setOpenReviewModal={ setOpenReviewModal }
        />
      </>
    )
  } return (<></>)
}

AgentReviews.propTypes = {
  agentUserId: PropTypes.number.isRequired,
}

export default AgentReviews
