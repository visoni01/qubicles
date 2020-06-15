import { XUserActivity, User } from '../../../db/models'
import { Op } from 'sequelize'

// Client activity methods
// Rating Methods
export async function getClientRating ({ client_id }) {
  const allRatings = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'rating'
    },
    attributes: ['activity_value'],
    raw: true
  })
  const totalRaters = allRatings.length
  if (totalRaters === 0) {
    return { rating: 0, raters: 0 }
  }
  const sumRating = allRatings.reduce((a, b) => (a + parseInt(b.activity_value)), 0)
  return { rating: (sumRating / totalRaters), raters: totalRaters }
}

export async function rateClient ({ user_id, client_id, rating, ratingComment }) {
  const rateActivity = await XUserActivity.create({
    user_id,
    record_type: 'client',
    record_id: client_id,
    activity_type: 'rating',
    activity_value: rating,
    activity_custom: ratingComment
  })
  return rateActivity.get({ plain: true })
}

export async function getClientRatingsList ({ client_id }) {
  const clientRatingsList = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'rating'
    },
    attributes: ['activity_value', 'user_id', 'activity_custom', 'created_on'],
    raw: true
  })
  const ratingsList = []
  for (const rating of clientRatingsList) {
    const userName = await User.findOne({ where: { user_id: rating.user_id }, raw: true, attributes: ['full_name'] })
    ratingsList.push({
      user_id: rating.user_id,
      name: userName !== null ? userName.full_name : userName,
      rating: parseInt(rating.activity_value),
      comment: rating.activity_custom,
      rated_on: rating.created_on
    })
  }
  return ratingsList
}

// Like Methods
export async function likeClient ({ user_id, client_id }) {
  const likeActivity = await XUserActivity.create({
    user_id,
    record_type: 'client',
    record_id: client_id,
    activity_type: 'like',
    activity_value: '1'
  })
  return likeActivity.get({ plain: true })
}

export async function getClientLikes ({ client_id }) {
  const clientLikes = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'like'
    },
    attributes: ['activity_value'],
    raw: true
  })
  const totalLikes = clientLikes.reduce((a, b) => (a + parseInt(b.activity_value)), 0)
  return { likes: totalLikes }
}

export async function getClientLikesList ({ client_id }) {
  const clientLikesList = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'like'
    },
    attributes: ['activity_value', 'user_id'],
    raw: true
  })
  const userIds = clientLikesList.map(activity => activity.user_id)
  const likersList = await User.findAll({ where: { user_id: { [Op.in]: userIds } }, raw: true, attributes: ['full_name', 'user_id'] })
  return likersList
}

// Subscribe methods
export async function subscribeClient ({ user_id, client_id }) {
  const subscribeActivity = await XUserActivity.create({
    user_id,
    record_type: 'client',
    record_id: client_id,
    activity_type: 'subscribe',
    activity_value: '1'
  })
  return subscribeActivity.get({ plain: true })
}

export async function getClientSubscribers ({ client_id }) {
  const clientSubscribers = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'subscribe'
    },
    attributes: ['activity_value'],
    raw: true
  })
  const totalSubscribers = clientSubscribers.reduce((a, b) => (a + parseInt(b.activity_value)), 0)
  return { subscribers: totalSubscribers }
}

export async function getClientSubscribersList ({ client_id }) {
  const clientSubscribersList = await XUserActivity.findAll({
    where: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'subscribe'
    },
    attributes: ['activity_value', 'user_id'],
    raw: true
  })
  const userIds = clientSubscribersList.map(activity => activity.user_id)
  const subscribersList = await User.findAll({ where: { user_id: { [Op.in]: userIds } }, raw: true, attributes: ['full_name', 'user_id'] })
  return subscribersList
}
