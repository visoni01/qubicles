import profileReviewsReducer from './profileReview'
import profileRatingsReducer from './profileRatings'

const profileReviewsReducers = {
  profileReviews: profileReviewsReducer,
  profileRatings: profileRatingsReducer,
}

export default profileReviewsReducers
export * from './profileReview'
export * from './profileRatings'
