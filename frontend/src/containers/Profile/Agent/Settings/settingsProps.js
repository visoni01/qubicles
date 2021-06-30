import PropTypes from 'prop-types'

export const accountSettingInfoPropTypes = PropTypes.shape(
  {
    street: PropTypes.string,
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
  street: '8364 street',
  city: 'San Francisco',
  zip: 475896,
  state: 'CA',
  email: 'joshrudler@yopmail.com',
  homePhone: 9587456351,
  mobilePhone: 9587456325,
  smsNotification: false,
  emailNotification: false,
  website: '',
}
