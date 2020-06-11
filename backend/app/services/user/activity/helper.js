import { XUserActivity } from '../../../db/models'

// Client activity methods
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
  const sumRating = allRatings.reduce((a, b) => (parseInt(a.activity_value) + parseInt(b.activity_value)))
  return { rating: (sumRating / totalRaters), raters: totalRaters }
}

export async function rateClient ({ user_id, client_id, rating, ratingComment }) {
  const rateObj = await XUserActivity.create({
    user_id,
    record_type: 'client',
    record_id: client_id,
    activity_type: 'rating',
    activity_value: rating,
    activity_custom: ratingComment
  })
  return rateObj.get({ plain: true })
}
