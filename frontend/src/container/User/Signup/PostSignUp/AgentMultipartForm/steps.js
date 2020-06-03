import * as yup from 'yup'

const steps = {
  1: {
    fields: [ { label: 'Date of Birth', type: 'date', name: 'birth_date' }, {
      label: 'Gender',
      type: 'radio',
      name: 'gender',
      options: [
        [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Others', 'others', 'Others' ],
      ],
    }, { label: 'SSN', type: 'number', name: 'ssn' } ],
    schema: yup.object().shape( {
      birth_date: yup.date(),
      ssn: yup.string(),
      gender: yup.string(),
    } ),
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
    schema: yup.object().shape( {
      street_address: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip: yup.string(),
      home_phone: yup.string(),
      mobile_phone: yup.string(),
    } ),
  },
  3: {
    fields: [
      { label: 'Years of Experience', type: 'text', name: 'experience' },
      { label: 'Highest Level of Education', type: 'text', name: 'education' },
      {
        label: 'Primary Language', type: 'select', name: 'primary_language', options: [ { label: 'English', value: 'English' }, { label: 'French', value: 'French' }, { label: 'Spanish', value: 'Spanish' } ],
      },
      { label: 'Other Languages Spoken', type: 'text', name: 'other_language' },
    ],
    schema: yup.object().shape( {
      experience: yup.string(),
      education: yup.string(),
      primary_language: yup.string(),
      other_language: yup.string(),
    } ),
  },
  5: {
    fields: [ {
      label: 'How did you hear about us?',
      type: 'checkbox',
      name: 'info',
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
      type: 'checkbox',
      name: 'use_service',
      options: [
        [ 'As an agent', 'agenr', 'As an agent' ],
        [ 'Trainer', 'trainer', 'Trainer' ],
        [ 'Supervisor', 'supervisor', 'Supervisor' ],
        [ 'QA or support', 'qa-support', 'QA or support' ],
      ],
    } ],
    schema: yup.object().shape( {
      info: yup.string(),
      use_service: yup.string(),
    } ),
  },
}

export default steps
