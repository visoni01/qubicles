import * as yup from 'yup'

const steps = {
  1: {
    fields: [ { label: 'Date of Birth', type: 'date', name: 'dob' }, {
      label: 'Gender',
      type: 'radio',
      name: 'gender',
      options: [
        [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Other', 'other', 'Other' ],
      ],
    }, { label: 'SSN', type: 'text', name: 'ssn' } ],
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
      type: 'checkbox',
      name: 'service',
      options: [
        [ 'As an Agent', 'agent', 'As an Agent' ],
        [ 'Trainer', 'trainer', 'Trainer' ],
        [ 'Supervisor', 'supervisor', 'Supervisor' ],
        [ 'QA or Support', 'qa-support', 'QA or Support' ],
      ],
    } ],
    schema: yup.object().shape( {
      info: yup.string(),
      use_service: yup.string(),
    } ),
  },
}

export default steps
