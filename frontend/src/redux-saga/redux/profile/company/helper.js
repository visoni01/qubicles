const getUpdatedCompanySettings = ({ state, action }) => {
  let { settings } = state
  const { updatedDataType, updatedData } = action.payload

  switch (updatedDataType) {
    case 'password': {
      settings = {
        ...settings,
      }
      break
    }

    case 'email': {
      settings = {
        ...settings,
      }
      break
    }

    default: {
      settings = {
        ...settings,
        ...updatedData,
      }
    }
  }
  return settings
}

export default getUpdatedCompanySettings
