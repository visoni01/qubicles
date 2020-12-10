import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'
import AccountView from './AccountView'

export default function AccountSection() {
  const [ openDrawer, setOpenDrawer ] = useState({
    passwordDrawer: false,
    addressDrawer: false,
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
        </>
      )}
    </div>
  )
}
