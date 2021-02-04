import * as yup from 'yup'
import { regExpPhone, regSplChar } from '../../../../../utils/common'

const steps = {
  1: {
    fields: [
      {
        label: 'Company Name', type: 'text', name: 'client_name', placeholder: 'Your Company Name',
      },
      {
        label: 'Company Address', type: 'text', name: 'address1', placeholder: 'Your Company Address',
      },
      {
        label: 'City', type: 'text', name: 'city', placeholder: 'City (optional)',
      },
      {
        label: 'State', type: 'text', name: 'state', placeholder: 'State (optional)',
      },
      {
        label: 'Zip', type: 'text', name: 'zip', placeholder: 'e.g. 45201',
      },
      { label: 'Contact Phone', type: 'text', name: 'phone_number' },
    ],
    schema: yup.object().shape({
      client_name: yup.string().max(45).required('*Required').matches(regSplChar, 'Special characters not allowed'),
      address1: yup.string().max(100).required('*Required'),
      city: yup.string().max(100).matches(regSplChar, 'Special characters not allowed'),
      state: yup.string().max(100).matches(regSplChar, 'Special characters not allowed'),
      // No validation for zip for now as it may vary from country to country
      zip: yup.string().matches(regSplChar, 'Special characters not allowed').required('*Required'),
      phone_number: yup.string().required('*Required').max(15)
        .matches(regExpPhone, 'Phone number is invalid, eg:- 4155552671'),
    }),
  },
  2: {
    fields: [
      {
        label: 'Company EIN (Employer ID Number)',
        type: 'text',
        name: 'client_ein',
        placeholder: 'Employer ID Number',
      },
    ],
    schema: yup.object().shape({
      client_ein: yup.string().required('*Required'),
    }),
  },
  3: {
    fields: [
      {
        label: 'How did you hear about us?',
        type: 'radio',
        name: 'source',
        checkTypes: [
          [ 'Search Engine', 'search_engine', 'Search Engine' ],
          [ 'Ad', 'ad', 'Ad' ],
          [ 'Referral', 'referral', 'Referral' ],
          [ 'Direct Mail', 'mail', 'Direct Mail' ],
          [ 'Email', 'email', 'Email' ],
          [ 'Article/Blog', 'article-blog', 'Article/Blog' ],
        ],
      },
      { label: 'Number of Employees', type: 'number', name: 'interactions_per_month' },
      { label: 'Website', type: 'text', name: 'website' },
    ],
    schema: yup.object().shape({
      source: yup.string().required('*Required'),
      interactions_per_month: yup.string().max(100).required('*Required')
        .matches(regSplChar, 'Special characters not allowed'),
      website: yup.string()
        .matches(
          // eslint-disable-next-line max-len
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          '*Enter valid website url',
        )
        .required('*Required'),
    }),
  },
}

export default steps
