import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../Company/Settings/styles.scss'
import AccountView from './accountView'
import ChangeEmail from '../../Company/Settings/SettingsDrawers/changeEmail'
import ChangeNumber from '../../Company/Settings/SettingsDrawers/changeNumber'
import ChangePassword from '../../Company/Settings/SettingsDrawers/changePassword'
import ChangeAddress from '../../Company/Settings/SettingsDrawers/changeAddress'

const AccountSection = () => {
  const [ openDrawer, setOpenDrawer ] = useState({
    passwordDrawer: false,
    addressDrawer: false,
    emailDrawer: false,
    websiteDrawer: false,
    numberDrawer: false,
    phoneDrawer: false,
  })

  const {
    settings: accountSettingInfo,
    isLoading: isUpdateLoading,
    success: isUpdateSuccess,
    requestType,
    updatedDataType,
  } = useSelector((state) => state.agentDetails)

  return (
    <div>
      {(!isUpdateLoading || requestType === 'UPDATE') && (
        <>
          <AccountView
            openDrawer={ openDrawer }
            setOpenDrawer={ setOpenDrawer }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
          />
          <ChangePassword
            open={ openDrawer.passwordDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, passwordDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='agent'
          />
          <ChangeAddress
            open={ openDrawer.addressDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, addressDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='agent'
          />
          <ChangeEmail
            open={ openDrawer.emailDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, emailDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            requestType={ requestType }
            userType='agent'
          />
          <ChangeNumber
            open={ openDrawer.phoneDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, phoneDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='agent'
            phoneType='phoneDrawer'
          />
          <ChangeNumber
            open={ openDrawer.numberDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, numberDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='agent'
            phoneType='numberDrawer'
          />
        </>
      )}
    </div>
  )
}

export default AccountSection
