import React from 'react'
import PropTypes from 'prop-types'
import { Box, List, ListItem } from '@material-ui/core'
import settingMenuItems from '../../../../components/Profile/Company/SettingsMenu'

const SettingsLeft = ({ setSelectedMenuItem, selectedMenuItem }) => (
  <Box className='custom-box settings-menu'>
    <h2 className='h2'> Settings </h2>
    <List>
      {settingMenuItems.map((item) => (
        <ListItem
          key={ item.id }
          button
          onClick={ () => setSelectedMenuItem(item.id) }
          className='list-divider'
        >
          <div className='display-inline-flex is-fullwidth menu-item'>
            <item.icon className={ `custom-svg-icon ${ selectedMenuItem === item.id ? 'color-primary' : '' }` } />
            <h4 className={ `h4 pl-10 ${ selectedMenuItem === item.id ? 'primary' : '' }` }>
              {item.title}
            </h4>
          </div>
        </ListItem>
      ))}
    </List>
  </Box>
)

SettingsLeft.propTypes = {
  setSelectedMenuItem: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.number.isRequired,
}

export default SettingsLeft
