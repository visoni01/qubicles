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
        user_code: data.user_code,
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
      3: {
        years_of_experience: data.years_of_experience,
        highest_education: data.highest_education,
        primary_language: data.primary_language,
        other_languages: data.other_languages,
      },
      4: {
        source: data.source,
        service: data.service,
      },
    }
  }

  return stepsData
}
