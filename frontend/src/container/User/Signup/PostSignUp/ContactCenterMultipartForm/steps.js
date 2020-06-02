import * as yup from 'yup'

const steps = {
  1: {
    fields: [
      [ 'Company Name', 'text', 'company_name' ],
      [ 'Company Address', 'text ', 'company_address' ],
      [ 'City', 'text', 'city' ],
      [ 'State', 'text', 'state' ],
      [ 'Zip', 'text', 'zip' ],
      [ 'Contact Phone', 'text', 'contact_phone' ],
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
      [ 'Company EIN (Employer ID Number)', 'text', 'company_ein' ],
    ],
    schema: yup.object().shape( {
      company_ein: yup.string(),
    } ),
  },
  3: {
    fields: [
      [ 'How did you hear about us?', 'checkbox', 'info', [
        [ 'Search Engine', 'search_engine', 'Search Engine' ],
        [ 'Ad', 'ad', 'Ad' ],
        [ 'Referral', 'referral', 'Referral' ],
        [ 'Direct Mail', 'mail', 'Direct Mail' ],
        [ 'Email', 'email', 'Email' ],
        [ 'Article/Blog', 'article-blog', 'Article/Blog' ],
      ] ],
      [ 'Number of employees', 'text', 'number_of_employees' ],
      [ 'Website', 'text', 'website' ],
    ],
    schema: yup.object().shape( {
      info: yup.string(),
      number_of_employees: yup.string(),
      website: yup.string(),
    } ),
  },
}

export default steps
