import { XUserActivity, Sequelize } from '../../db/models'
import { getUserDetails } from './user'
import _ from 'lodash'

export const fetchAgentRatings = async ({ agent_user_id }) => {
  let ratings = await XUserActivity.findAll({
    where: {
      record_type: 'user',
      record_id: agent_user_id,
      activity_type: ['rating_performance', 'rating_teamplayer', 'rating_interaction', 'rating_dependability']
    },
    attributes: [
      'activity_type',
      [Sequelize.fn('AVG', Sequelize.col('activity_value')), 'average_rating'],
      [Sequelize.fn('COUNT', Sequelize.col('activity_value')), 'count']
    ],
    group: ['activity_type']
  })

  ratings = ratings.map(item => item.get({ plain: true }))

  const result = {
    performance: 0,
    teamplayer: 0,
    interaction: 0,
    dependability: 0,
    totalAverageRating: 0,
    totalAverageRaters: 0
  }

  ratings.map(item => {
    result[item['activity_type'].split('_')[1]] = parseFloat(item.average_rating).toFixed(1)
    result.totalAverageRaters = item.count
  })

  result.totalAverageRating = result.totalAverageRaters === 0
    ? parseFloat(0)
    : parseFloat((Number(result.performance) +
      Number(result.teamplayer) +
      Number(result.interaction) +
      Number(result.dependability)
    ) / 4).toFixed(1)
  return result
}

export const fetchAgentReviews = async ({ user_id, agent_user_id, type }) => {
  let activityQuery = {
    record_type: 'user',
    activity_type: ['rating_performance', 'rating_teamplayer', 'rating_interaction', 'rating_dependability']
  }
  if (type === 'recieved') {
    activityQuery = {
      ...activityQuery,
      record_id: agent_user_id
    }
  } else if (type === 'given') {
    activityQuery = {
      ...activityQuery,
      user_id: user_id
    }
  }

  let reviewsList = await XUserActivity.findAll({
    where: activityQuery,
    attributes: [
      ['user_activity_id', 'id'],
      'user_id',
      ['activity_custom', 'reviewText'],
      [Sequelize.fn('AVG', Sequelize.col('activity_value')), 'rating']
    ],
    group: ['user_id']
  })

  reviewsList = reviewsList.map(item => item.get({ plain: true }))

  const reviewDetails = Promise.all(reviewsList.map(async (review) => {
    const userDetail = await getUserDetails({ user_id: review.user_id })
    return {
      ...review,
      rating: parseFloat(review.rating).toFixed(1),
      userDetails: {
        profileName: userDetail.first_name + ' ' + userDetail.last_name,
        profilePic: userDetail.profile_image,
        profileTitle: userDetail.work_title
      }
    }
  }))
  return reviewDetails
}

export const addAgentReviewAndRating = async ({ user_id, agent_user_id, reviewData }) => {
  const ratingTypes = [
    { ratingType: 'rating_performance', ratingValue: reviewData.performanceRating },
    { ratingType: 'rating_teamplayer', ratingValue: reviewData.teamPlayerRating },
    { ratingType: 'rating_interaction', ratingValue: reviewData.customerInteractionRating },
    { ratingType: 'rating_dependability', ratingValue: reviewData.dependabilityRating }
  ]

  const ratingActivities = ratingTypes.map((item, index) => {
    const ratingActivity = {
      user_id,
      record_type: 'user',
      record_id: agent_user_id,
      activity_type: item.ratingType,
      activity_value: item.ratingValue
    }

    // Adding review text to custom activity
    if (index === 0 && !_.isEmpty(reviewData.reviewText)) { ratingActivity.activity_custom = reviewData.reviewText }

    return ratingActivity
  })

  return XUserActivity.bulkCreate(ratingActivities)
}
