import * as yup from 'yup'
import { regExpPhone } from '../../../../../utils/common'

const steps = {
  1: {
    fields: [
      { label: 'Company Name', type: 'text', name: 'client_name' },
      { label: 'Company Address', type: 'text', name: 'address1' },
      { label: 'City', type: 'text', name: 'city' },
      { label: 'State', type: 'text', name: 'state' },
      { label: 'Zip', type: 'text', name: 'zip' },
      { label: 'Contact Phone', type: 'text', name: 'phone_number' },
    ],
    schema: yup.object().shape({
      client_name: yup.string().max(45).required('*Required'),
      address1: yup.string().max(100).required('*Required'),
      city: yup.string().max(100),
      state: yup.string().max(100),
      zip: yup.string().max(10).required('*Required'),
      phone_number: yup.string().max(15).required('*Required')
        .matches(regExpPhone, 'Phone number is invalid, eg:- 1234567890'),
    }),
  },
  2: {
    fields: [
      { label: 'Company EIN (Employer ID Number)', type: 'text', name: 'client_ein' },
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
      { label: 'Number of Employees', type: 'text', name: 'interactions_per_month' },
      { label: 'Website', type: 'text', name: 'website' },
    ],
    schema: yup.object().shape({
      source: yup.string().max(100).required('*Required'),
      interactions_per_month: yup.string().max(100).required('*Required'),
      website: yup.string().max(100).required('*Required'),
    }),
  },
}

export default steps
