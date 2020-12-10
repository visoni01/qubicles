import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import settingMenuItems from '../../../../components/Profile/Company/SettingsMenu'

export default function Settings({
  selectedMenuItem, currentSectionRef, otherSectionRef, scrollToTop,
}) {
  useEffect(() => {
    if (selectedMenuItem === 0) {
      scrollToTop()
    } else if (currentSectionRef && currentSectionRef.current) {
      currentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })

  return (
    <Grid container spacing={ 4 }>
      {settingMenuItems.map((item) => (
        <Grid
          ref={ selectedMenuItem === item.id ? currentSectionRef : otherSectionRef }
          key={ item.id }
          item
          xs={ 12 }
          sm={ 12 }
          md={ 12 }
          lg={ 12 }
        >
          <item.component />
        </Grid>
      ))}
    </Grid>
  )
}

Settings.propTypes = {
  selectedMenuItem: PropTypes.number.isRequired,
  currentSectionRef: PropTypes.objectOf(PropTypes.any).isRequired,
  otherSectionRef: PropTypes.objectOf(PropTypes.any).isRequired,
  scrollToTop: PropTypes.func.isRequired,
}
