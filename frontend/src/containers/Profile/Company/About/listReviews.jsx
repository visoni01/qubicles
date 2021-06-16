import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileReview from '../../Reviews/profileReview'
import { profileReviewsFetchStart, resetReviews } from '../../../../redux-saga/redux/actions'
import CompanyReviewsSkeleton from
  '../../../../components/People/ContactCenter/SkeletonLoader/Training/reviewsSkeleton'

const ListReviews = ({
  profileType, reviewType, id,
}) => {
  const dispatch = useDispatch()
  const [ reviewsList, setReviewsList ] = useState([])
  const {
    fetchLoading, recievedReviews, givenReviews,
  } = useSelector((state) => state.profileReviews)

  useEffect(() => {
    if (reviewType === 'received') {
      setReviewsList(recievedReviews.reviews)
    } else {
      setReviewsList(givenReviews.reviews)
    }
  }, [ reviewType, recievedReviews, givenReviews ])

  useEffect(() => () => dispatch(resetReviews()), [ dispatch, profileType, id ])

  useEffect(() => {
    if ((reviewType === 'received' && !recievedReviews.initialLoad)
      || (reviewType === 'given' && !givenReviews.initialLoad)
    ) {
      dispatch(profileReviewsFetchStart({
        profileType,
        reviewType,
        id,
      }))
    }
  }, [ dispatch, id, reviewType, profileType, recievedReviews, givenReviews ])

  if (fetchLoading) {
    return (
      <>
        <Divider className='divider' />
        <CompanyReviewsSkeleton />
      </>
    )
  }

  return (
    <div>
      <Divider className='divider' />
      {reviewsList.length > 0 ? (
        reviewsList.map((reviewData) => (
          <ProfileReview
            key={ reviewData.id }
            reviewText={ reviewData.reviewText }
            rating={ reviewData.rating }
            userDetails={ reviewData.userDetails }
          />
        ))
      ) : (
        <>
          <div className='padding-10 mt-10'>
            <h3 className='h3'>No reviews yet...</h3>
          </div>
        </>
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
