import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileReview from '../../OtherAgent/profileReview'
import { profileReviewsFetchStart } from '../../../../redux-saga/redux/actions'

const ListReviews = ({
  profileType, reviewType, id,
}) => {
  const dispatch = useDispatch()
  const [ reviewsList, setReviewsList ] = useState([])
  const { fetchLoading, recievedReviews, givenReviews } = useSelector((state) => state.profileReviews)

  useEffect(() => {
    if (reviewType === 'recieved') {
      setReviewsList(recievedReviews)
    } else {
      setReviewsList(givenReviews)
    }
  }, [ reviewType, recievedReviews, givenReviews ])

  useEffect(() => {
    dispatch(profileReviewsFetchStart({
      profileType,
      reviewType,
      id,
    }))
  }, [ dispatch, id, reviewType, profileType ])

  return (
    <div>
      <Divider className='divider' />
      {!fetchLoading && reviewsList.length > 0 ? (
        reviewsList.map((reviewData) => (
          <ProfileReview
            key={ reviewData.id }
            reviewText={ reviewData.reviewText }
            rating={ reviewData.rating }
            userDetails={ reviewData.userDetails }
          />
        ))
      ) : (
        <div className='padding-10 mt-10'>
          <h3 className='h3'>No reviews yet...</h3>
        </div>
      )}
    </div>
  )
}

ListReviews.propTypes = {

  id: PropTypes.number.isRequired,
  profileType: PropTypes.string.isRequired,
  reviewType: PropTypes.string.isRequired,
}

export default ListReviews
