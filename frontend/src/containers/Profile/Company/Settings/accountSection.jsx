import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'
import AccountView from './accountView'
import ChangeEmail from './SettingsDrawers/changeEmail'
import ChangeWebsite from './SettingsDrawers/changeWebsite'
import ChangeNumber from './SettingsDrawers/changeNumber'
import ChangePassword from './SettingsDrawers/changePassword'
import ChangeAddress from './SettingsDrawers/changeAddress'

const AccountSection = () => {
  const [ openDrawer, setOpenDrawer ] = useState({
    passwordDrawer: false,
    addressDrawer: false,
    emailDrawer: false,
    websiteDrawer: false,
    numberDrawer: false,
  })
  const { settings: accountSettingInfo, isFetchLoading: isLoading } = useSelector((state) => state.clientDetails)

  return (
    <div>
      {!isLoading && (
        <>
          <AccountView
            openDrawer={ openDrawer }
            setOpenDrawer={ setOpenDrawer }
            accountSettingInfo={ accountSettingInfo }
          />
          <ChangePassword
            open={ openDrawer.passwordDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, passwordDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
          />
          <ChangeAddress
            open={ openDrawer.addressDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, addressDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
          />
          <ChangeEmail
            open={ openDrawer.emailDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, emailDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
          />
          <ChangeWebsite
            open={ openDrawer.websiteDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, websiteDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
          />
          <ChangeNumber
            open={ openDrawer.numberDrawer }
            setOpen={ (openState) => setOpenDrawer((current) => ({ ...current, numberDrawer: openState })) }
            accountSettingInfo={ accountSettingInfo }
          />
        </>
      )}
    </div>
  )
}

export default AccountSection
