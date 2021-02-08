import * as yup from 'yup'
import {
  regExpSSN, regSplChar,
} from '../../../../../utils/common'

const steps = {
  1: {
    fields: [
      {
        label: 'Date of Birth', type: 'date', name: 'dob', placeholder: 'DD/MM/YYYY',
      }, {
        label: 'SSN', type: 'text', name: 'ssn', placeholder: 'AAA-GG-SSSS',
      }, {
        label: 'Gender',
        type: 'radio',
        name: 'gender',
        options: [
          [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Other', 'other', 'Other' ],
        ],
      } ],
    schema: yup.object().shape({
      dob: yup.string().required('*Required'),
      gender: yup.string().required('*Required'),
      ssn: yup.string().required('*Required').matches(regExpSSN, 'SSN is invalid, eg:- 111-11-2001'),
    }),
  },
  2: {
    fields: [
      {
        label: 'Street Address', type: 'text', name: 'street_address', placeholder: 'e.g. 37 Main Road, apr. 2',
      }, {
        label: 'City', type: 'text', name: 'city', placeholder: 'City (optional)',
      },
      {
        label: 'State', type: 'text', name: 'state', placeholder: 'State (optional)',
      },
      {
        label: 'Zip', type: 'text', name: 'zip', placeholder: 'e.g. 15201',
      },
      {
        label: 'Home Phone', type: 'text', name: 'home_phone', placeholder: 'Phone number (optional)',
      },
      {
        label: 'Mobile Phone', type: 'text', name: 'mobile_phone', placeholder: 'Mobile number',
      },
    ],
    schema: yup.object().shape({
      street_address: yup.string(),
      city: yup.string().matches(regSplChar, 'Special characters not allowed'),
      state: yup.string().matches(regSplChar, 'Special characters not allowed'),
      zip: yup.string().matches(regSplChar, 'Special characters not allowed').required('*Required'),
      home_phone: yup.string(),
      mobile_phone: yup.string().required('*Required'),
    }),
  },
  3: {
    fields: [
      {
        label: 'Years of Experience', type: 'number', name: 'years_of_experience', placeholder: 'Experience (in years)',
      },
      {
        label: 'Highest Level of Education',
        type: 'singleSelect',
        name: 'highest_education',
        placeholder: 'Level of education',
        options: [
          { label: 'High school or equivalent', value: 'High school or equivalent' },
          { label: 'Technical or occupational certificate', value: 'Technical or occupational certificate' },
          { label: 'Associate degree', value: 'Associate degree' },
          { label: 'Some college coursework completed', value: 'Some college coursework completed' },
          { label: 'Bachelor\'s degree', value: 'Bachelor\'s degree' },
          { label: 'Master\'s degree', value: 'Master\'s degree' },
          { label: 'Doctorate', value: 'Doctorate' },
          { label: 'Professional', value: 'Professional' },
        ],
      },
      {
        label: 'Primary Language',
        type: 'singleSelect',
        name: 'primary_language',
        options: [
          { label: 'English', value: 'English' },
          { label: 'French', value: 'French' },
          { label: 'Spanish', value: 'Spanish' },
          { label: 'Arabic', value: 'Arabic' },
          { label: 'Bengali', value: 'Bengali' },
          { label: 'Chinese', value: 'Chinese' },
          { label: 'German', value: 'German' },
          { label: 'Hindi', value: 'Hindi' },
          { label: 'Indonesian', value: 'Indonesian' },
          { label: 'Japanese', value: 'Japanese' },
          { label: 'Portuguese', value: 'Portuguese' },
          { label: 'Russian', value: 'Russian' },
          { label: 'Urdu', value: 'Urdu' },
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
          { label: 'Arabic', value: 'Arabic' },
          { label: 'Bengali', value: 'Bengali' },
          { label: 'Chinese', value: 'Chinese' },
          { label: 'German', value: 'German' },
          { label: 'Hindi', value: 'Hindi' },
          { label: 'Indonesian', value: 'Indonesian' },
          { label: 'Japanese', value: 'Japanese' },
          { label: 'Portuguese', value: 'Portuguese' },
          { label: 'Russian', value: 'Russian' },
          { label: 'Urdu', value: 'Urdu' },
        ],
      },
    ],
    schema: yup.object().shape({
      years_of_experience: yup.string(),
      highest_education: yup.string().required('*Required'),
      primary_language: yup.string().required('*Required'),
      other_languages: yup.string(),
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
