import { XUserActivity, Sequelize, XClient } from '../../db/models'
import { getUserDetails, getUserById } from './user'
import _ from 'lodash'
import { getAll, getOne } from './crud'

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
      record_type: 'client',
      activity_type: ['rating_culture', 'rating_leadership', 'rating_career', 'rating_compensation'],
      user_id: agent_user_id
    }
  }

  let reviewsList = await XUserActivity.findAll({
    where: activityQuery,
    attributes: [
      ['user_activity_id', 'id'],
      'record_id',
      'user_id',
      ['activity_custom', 'reviewText'],
      [Sequelize.fn('AVG', Sequelize.col('activity_value')), 'rating']
    ],
    group: [type === 'recieved' ? 'user_id' : 'record_id']
  })

  reviewsList = reviewsList.map(item => item.get({ plain: true }))

  const reviewDetails = Promise.all(reviewsList.map(async (review) => {
    const userDetail = await getUserDetails({ user_id: type === 'recieved' ? review.user_id : review.record_id })
    const client = await getOne({
      model: XClient,
      data: { client_id: type === 'recieved' ? review.user_id : review.record_id }
    })

    return {
      ...review,
      rating: parseFloat(review.rating).toFixed(1),
      userDetails: {
        profileName: client.client_name,
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

export const getAgentReviewByUser = ({ user_id, agent_user_id }) => {
  const agentReview = getAll({
    model: XUserActivity,
    data: {
      user_id: user_id,
      record_type: 'user',
      record_id: agent_user_id,
      activity_type: ['rating_performance', 'rating_teamplayer', 'rating_interaction', 'rating_dependability']
    }
  })
  return agentReview
}

export const getAddReviewAccessForAgent = async ({ user_id, agent_user_id }) => {
  const user = await getUserById({ user_id })
  if (!(user.user_code === 'employer')) {
    return false
  }

  const userReview = await getAgentReviewByUser({ user_id, agent_user_id })
  if (userReview.length > 0) {
    return false
  }

  // WIP Access Permission for employee or ex employee

  /* const isEmployee = await getOne({
    model: XQodApplication,
    data: {
      user_id,
      client_id,
      status: ['hired', 'resigned', 'terminated']
    }
  })

  if (!isEmployee) {
    return false
  } */

  return true
}
