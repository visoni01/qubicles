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

export const jobApplicationListData = (data) => {
  const jobApplications = {
    Pending: [],
    Evaluating: [],
    Hired: [],
    Archived: [],
  }
  data.map((jobApp) => {
    if ([ 'invited', 'applied' ].includes(jobApp.application.status)) {
      jobApplications.Pending.push(jobApp)
    }
    if ([ 'screening', 'training' ].includes(jobApp.application.status)) {
      jobApplications.Evaluating.push(jobApp)
    }
    if ([ 'hired', 'offered' ].includes(jobApp.application.status)) {
      jobApplications.Hired.push(jobApp)
    }
    if ([ 'terminated', 'rejected', 'declined' ].includes(jobApp.application.status)) {
      jobApplications.Archived.push(jobApp)
    }
    return jobApp
  })
  return jobApplications
}

export const formatAgentApplicationCards = ({ applications }) => {
  const agentApplications = applications.map((application) => {
    const { XQodJob, XClient, profilePicture } = application
    return ({
      application: {
        applicationId: application.application_id,
        agentUserId: application.user_id,
        clientId: application.client_id,
        jobId: application.job_id,
        coverLetter: application.cover_letter,
        status: application.status,
        createdOn: application.createdAt,
        updateOn: application.updatedAt,
      },
      jobDetails: {
        jobId: XQodJob.job_id,
        jobType: XQodJob.job_type,
        jobTitle: XQodJob.title,
        jobDescription: XQodJob.description,
        durationType: XQodJob.duration_type,
        location: `${ XQodJob.city }, ${ XQodJob.state } `,
        fulfilled: XQodJob.fulfilled,
        needed: XQodJob.needed,
        durationMonths: XQodJob.duration_months,
        payAmount: XQodJob.pay_amount,
      },
      clientDetails: {
        clientId: XClient.client_id,
        clientName: XClient.client_name,
        profileImage: profilePicture,
        rating: XClient.rating,
      },
    })
  })
  return agentApplications
}
