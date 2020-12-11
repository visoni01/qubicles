import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'
import AccountView from './AccountView'
import ChangeEmail from './SettingsDrawers/ChangeEmail'
import ChangeWebsite from './SettingsDrawers/ChangeWebsite'
import ChangeNumber from './SettingsDrawers/ChangeNumber'
import ChangePassword from './SettingsDrawers/ChangePassword'
import ChangeAddress from './SettingsDrawers/ChangeAddress'

export default function AccountSection() {
  const [ openDrawer, setOpenDrawer ] = useState({
    passwordDrawer: false,
    addressDrawer: false,
    emailDrawer: false,
    websiteDrawer: false,
    numberDrawer: false,
  })
  const { settings, isLoading } = useSelector((state) => state.companyProfileSettings)
  const [ accountSettingInfo, setAccountSettingInfo ] = useState(settings)

  useEffect(() => {
    setAccountSettingInfo(settings)
  }, [ settings ])

  return (
    <div>
      {!isLoading && (
        <>
          <AccountView
            openDrawer={ openDrawer }
            setOpenDrawer={ setOpenDrawer }
            accountSettingInfo={ accountSettingInfo }
            setAccountSettingInfo={ setAccountSettingInfo }
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
