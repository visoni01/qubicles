const getUpdatedCompanySettings = ({ state, action }) => {
  let { settings } = state
  const { updatedDataType, updatedData } = action.payload

  switch (updatedDataType) {
    case 'address': {
      settings = {
        ...settings,
        state: updatedData.state,
        city: updatedData.city,
        street: updatedData.street,
        zip: updatedData.zip,
      }
      break
    }

    case 'Sms Notification': {
      settings = {
        ...settings,
        smsNotification: updatedData.smsNotification,
      }
      break
    }

    case 'Email Notification': {
      settings = {
        ...settings,
        emailNotification: updatedData.emailNotification,
      }
      break
    }

    case 'number': {
      settings = {
        ...settings,
        phoneNumber: updatedData.phoneNumber,
      }
      break
    }

    case 'website': {
      settings = {
        ...settings,
        website: updatedData.website,
      }
      break
    }

    default: break
  }
  return settings
}

export default getUpdatedCompanySettings
