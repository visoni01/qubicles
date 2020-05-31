import * as yup from 'yup'

const steps = {
  1: {
    fields: [ [ 'Date of Birth', 'date', 'birth_date' ], [ 'Gender', 'checkbox', 'gender', [
      [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Others', 'others', 'Others' ],
    ] ], [ 'SSN', 'text', 'ssn' ] ],
    schema: yup.object().shape( {
      birth_date: yup.string().required( '*Required' ),
      ssn: yup.string().required( '*Required' ),
      gender: yup.bool(),
    } ),
  },
  2: {
    fields: [
      [ 'Street Address', 'text', 'street_address' ],
      [ 'City', 'text', 'city' ],
      [ 'State', 'text', 'state' ],
      [ 'Zip', 'text', 'zip' ],
      [ 'Home Phone', 'text', 'home_phone' ],
      [ 'Mobile Phone', 'text', 'mobile_phone' ],
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
      [ 'Years of Experience', 'text', 'experience' ],
      [ 'Highest Level of Education', 'text', 'education' ],
      [ 'Primary Language', 'text', 'primary_language' ],
      [ 'Other Languages Spoken', 'text', 'other_language' ],
    ],
    schema: yup.object().shape( {
      experience: yup.string(),
      education: yup.string(),
      primary_language: yup.string(),
      other_language: yup.string(),
    } ),
  },
  5: {
    fields: [ [ 'How did you hear about us?', 'checkbox', 'info', [
      [ 'Search Engine', 'search_engine', 'Search Engine' ],
      [ 'Ad', 'ad', 'Ad' ],
      [ 'Referral', 'referral', 'Referral' ],
      [ 'Direct Mail', 'mail', 'Direct Mail' ],
      [ 'Email', 'email', 'Email' ],
      [ 'Article/Blog', 'article-blog', 'Article/Blog' ],
    ] ],
    [ 'How do you intend on using the service?', 'checkbox', 'use_service', [
      [ 'As an agent', 'agenr', 'As an agent' ],
      [ 'Trainer', 'trainer', 'Trainer' ],
      [ 'Supervisor', 'supervisor', 'Supervisor' ],
      [ 'QA or support', 'qa-support', 'QA or support' ],
    ] ] ],
    schema: yup.object().shape( {
      info: yup.string(),
      use_service: yup.string(),
    } ),
  },
}

export default steps
