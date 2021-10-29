import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AccountView from './accountView'
import ChangeEmail from './SettingsDrawers/changeEmail'
import ChangeWebsite from './SettingsDrawers/changeWebsite'
import ChangeNumber from './SettingsDrawers/changeNumber'
import ChangePassword from './SettingsDrawers/changePassword'
import ChangeAddress from './SettingsDrawers/changeAddress'
import './styles.scss'

const AccountSection = () => {
  const [ openDrawer, setOpenDrawer ] = useState({
    passwordDrawer: false,
    addressDrawer: false,
    emailDrawer: false,
    websiteDrawer: false,
    numberDrawer: false,
  })

  const {
    settings: accountSettingInfo,
    isFetchLoading: isLoading,
    isUpdateLoading,
    isUpdateSuccess,
    updatedDataType,
    isUpdateError,
  } = useSelector((state) => state.clientDetails)

  return (
    <div>
      {!isLoading && (
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
            userType='client'
          />
          <ChangeAddress
            open={ openDrawer.addressDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, addressDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='client'
          />
          <ChangeEmail
            open={ openDrawer.emailDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, emailDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            isUpdateError={ isUpdateError }
            updatedDataType={ updatedDataType }
            userType='client'
          />
          <ChangeWebsite
            open={ openDrawer.websiteDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, websiteDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
          />
          <ChangeNumber
            open={ openDrawer.numberDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, numberDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
            isUpdateLoading={ isUpdateLoading }
            isUpdateSuccess={ isUpdateSuccess }
            updatedDataType={ updatedDataType }
            userType='client'
          />
        </>
      )}
    </div>
  )
}

export default AccountSection
