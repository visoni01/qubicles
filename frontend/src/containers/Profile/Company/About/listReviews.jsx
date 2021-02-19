import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileReview from '../../OtherAgent/profileReview'
import { companyReviewsFetchStart } from '../../../../redux-saga/redux/actions'

const ListReviews = ({
  type, clientId,
}) => {
  const dispatch = useDispatch()
  const [ reviewsList, setReviewsList ] = useState([])
  const { recievedReviews, givenReviews } = useSelector((state) => state.companyReviews)

  useEffect(() => {
    if (type === 'recieved') {
      setReviewsList(recievedReviews)
    } else {
      setReviewsList(givenReviews)
    }
  }, [ type, recievedReviews, givenReviews ])

  useEffect(() => {
    dispatch(companyReviewsFetchStart({
      type,
      clientId,
    }))
  }, [ dispatch, clientId, type ])

  return (
    <div>
      {reviewsList.length > 0 && (
      <div>
        <Divider className='divider' />
        {reviewsList.map((reviewData) => (
          <ProfileReview
            key={ reviewData.id }
            reviewText={ reviewData.reviewText }
            rating={ reviewData.rating }
            userDetails={ reviewData.userDetails }
          />
        ))}
      </div>
      )}
    </div>
  )
}

ListReviews.propTypes = {
  clientId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}

export default ListReviews
