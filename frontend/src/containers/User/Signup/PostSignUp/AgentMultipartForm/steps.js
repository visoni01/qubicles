import * as yup from 'yup'
import { regExpPhone, regExpSSN, regExpZip } from '../../../../../utils/common'

const steps = {
  1: {
    fields: [ { label: 'Date of Birth', type: 'date', name: 'dob' }, {
      label: 'SSN', type: 'text', name: 'ssn', placeholder: '111-11-2001',
    }, {
      label: 'Gender',
      type: 'radio',
      name: 'gender',
      options: [
        [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Other', 'other', 'Other' ],
      ],
    } ],
    schema: yup.object().shape({
      dob: yup.date().required('*Required'),
      gender: yup.string().required('*Required'),
      ssn: yup.string().required('*Required').matches(regExpSSN, 'SSN is invalid, eg:- 111-11-2001'),
    }),
  },
  2: {
    fields: [
      { label: 'Street Address', type: 'text', name: 'street_address' },
      { label: 'City', type: 'text', name: 'city' },
      { label: 'State', type: 'text', name: 'state' },
      { label: 'Zip', type: 'text', name: 'zip' },
      { label: 'Home Phone', type: 'text', name: 'home_phone' },
      { label: 'Mobile Phone', type: 'text', name: 'mobile_phone' },
    ],
    schema: yup.object().shape({
      street_address: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip: yup.string().required('*Required').matches(regExpZip, 'Zipcode is invalid, eg:- 90401'),
      home_phone: yup.string(),
      mobile_phone: yup.string().max(15).required('*Required')
        .matches(regExpPhone, 'Phone number is invalid, eg:- 5555555555'),
    }),
  },
  3: {
    fields: [
      { label: 'Years of Experience', type: 'text', name: 'years_of_experience' },
      { label: 'Highest Level of Education', type: 'text', name: 'highest_education' },
      {
        label: 'Primary Language',
        type: 'radio',
        name: 'primary_language',
        options: [
          [ 'English', 'english', 'English' ],
          [ 'French', 'french', 'French' ],
          [ 'Spanish', 'spanish', 'Spanish' ],
        ],
      },
      {
        label: 'Other Languages Spoken',
        type: 'select',
        name: 'other_languages',
        options: [
          { label: 'English', value: 'English' },
          { label: 'French', value: 'French' },
          { label: 'Spanish', value: 'Spanish' },
        ],
      },
    ],
    schema: yup.object().shape({
      years_of_experience: yup.string(),
      highest_education: yup.string(),
      primary_language: yup.string().required('*Required'),
      other_languages: yup.string().required('*Required'),
    }),
  },
  5: {
    fields: [ {
      label: 'How did you hear about us?',
      type: 'radio',
      name: 'source',
      options: [
        [ 'Search Engine', 'search_engine', 'Search Engine' ],
        [ 'Ad', 'ad', 'Ad' ],
        [ 'Referral', 'referral', 'Referral' ],
        [ 'Direct Mail', 'mail', 'Direct Mail' ],
        [ 'Email', 'email', 'Email' ],
        [ 'Article/Blog', 'article-blog', 'Article/Blog' ],
      ],
    },
    {
      label: 'How do you intend on using the service?',
      type: 'radio',
      name: 'service',
      options: [
        [ 'As an Agent', 'agent', 'As an Agent' ],
        [ 'Trainer', 'trainer', 'Trainer' ],
        [ 'Supervisor', 'supervisor', 'Supervisor' ],
        [ 'QA or Support', 'qa-support', 'QA or Support' ],
      ],
    } ],
    schema: yup.object().shape({
      source: yup.string().required('*Required'),
      service: yup.string().required('*Required'),
    }),
  },
}

export default steps
