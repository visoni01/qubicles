import clientDetailsReducer from './profileSettings'
import companyDetailsForProfileReducer from './fetchCompanyDetails'

const companyProfileReducers = {
  clientDetails: clientDetailsReducer,
  companyDetailsForProfile: companyDetailsForProfileReducer,
}

export default companyProfileReducers
export * from './profileSettings'
export * from './fetchCompanyDetails'
