import PropTypes from 'prop-types'

export const accountSettingInfoPropTypes = PropTypes.shape(
  {
    companyId: PropTypes.number,
    companyName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    state: PropTypes.string,
    email: PropTypes.string,
    homePhone: PropTypes.string,
    mobilePhone: PropTypes.string,
    smsNotification: PropTypes.bool,
    emailNotification: PropTypes.bool,
    website: PropTypes.string,
  },
)

export const accountSettingInfoDefaultProps = {
  companyId: 0,
  companyName: '',
  address: '',
  city: '',
  zip: '',
  state: '',
  email: '',
  homePhone: '',
  mobilePhone: '',
  smsNotification: false,
  emailNotification: false,
  website: '',
}
