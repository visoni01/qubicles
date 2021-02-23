/* eslint-disable import/prefer-default-export */

import {
  POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH,
} from '../redux/constants'

export const getPostSignUpStepsData = ({ type, data }) => {
  let stepsData = {}
  if (type === POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH) {
    stepsData = {
      1: {
        client_name: data.client_name,
        address1: data.address1,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone_number: data.phone_number,
      },
      2: {
        client_ein: data.client_ein,
      },
      3: {
        source: data.source,
        interactions_per_month: data.interactions_per_month,
        website: data.website,
      },
    }
  } else {
    stepsData = {
      1: {
        dob: data.dob,
        ssn: data.ssn,
        gender: data.gender,
      },
      2: {
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        home_phone: data.home_phone,
        mobile_phone: data.mobile_phone,
      },
      4: {
        id_url: data.id_url,
      },
      3: {
        years_of_experience: data.years_of_experience,
        highest_education: data.highest_education,
        primary_language: data.primary_language,
        other_languages: data.other_languages,
      },
      5: {
        source: data.source || 'search_engine',
        service: data.service,
      },
    }
  }

  return stepsData
}
