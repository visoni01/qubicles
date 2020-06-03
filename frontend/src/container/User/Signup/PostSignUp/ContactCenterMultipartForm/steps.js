import * as yup from 'yup'

const steps = {
  1: {
    fields: [
      { label: 'Company Name', type: 'text', name: 'company_name' },
      { label: 'Company Address', type: 'text', name: 'company_address' },
      { label: 'City', type: 'text', name: 'city' },
      { label: 'State', type: 'text', name: 'state' },
      { label: 'Zip', type: 'text', name: 'zip' },
      { label: 'Contact Phone', type: 'text', name: 'contact_phone' },
    ],
    schema: yup.object().shape( {
      company_name: yup.string(),
      company_address: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip: yup.string(),
      contact_phone: yup.string(),
    } ),
  },
  2: {
    fields: [
      { label: 'Company EIN (Employer ID Number)', type: 'text', name: 'company_ein' },
    ],
    schema: yup.object().shape( {
      company_ein: yup.string(),
    } ),
  },
  3: {
    fields: [
      {
        label: 'How did you hear about us?',
        type: 'radio',
        name: 'info',
        checkTypes: [
          [ 'Search Engine', 'search_engine', 'Search Engine' ],
          [ 'Ad', 'ad', 'Ad' ],
          [ 'Referral', 'referral', 'Referral' ],
          [ 'Direct Mail', 'mail', 'Direct Mail' ],
          [ 'Email', 'email', 'Email' ],
          [ 'Article/Blog', 'article-blog', 'Article/Blog' ],
        ],
      },
      { label: 'Number of employees', type: 'text', name: 'number_of_employees' },
      { label: 'Website', type: 'text', name: 'website' },
    ],
    schema: yup.object().shape( {
      info: yup.string(),
      number_of_employees: yup.string(),
      website: yup.string(),
    } ),
  },
}

export default steps
