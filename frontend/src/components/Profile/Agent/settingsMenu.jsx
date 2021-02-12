import React from 'react'
import PropTypes from 'prop-types'
import {
  Box, List, ListItem,
} from '@material-ui/core'
import settingMenuItems from './settingaMenuItems'

const ListRow = ({ item, setSelectedMenuItem, selectedMenuItem }) => (
  <ListItem
    key={ item.id }
    button={ !item.subSections }
    onClick={ () => setSelectedMenuItem(item.id) }
    className='list-divider'
    disableGutters
  >
    <div className='is-fullwidth'>
      <div className='display-inline-flex is-fullwidth menu-item'>
        <item.icon className={ `custom-svg-icon ${ selectedMenuItem === item.id ? 'color-primary' : '' }` } />
        <h4 className={ `h4 pl-10 ${ selectedMenuItem === item.id ? 'primary' : '' }` }>
          {item.title}
        </h4>
      </div>
    </div>
  </ListItem>
)

const SettingsLeft = ({
  setSelectedMenuItem, selectedMenuItem,
}) => (
  <Box className='custom-box settings-menu'>
    <h2 className='h2'>Settings </h2>
    <List>
      { settingMenuItems.map((item) => (
        <ListRow
          item={ item }
          key={ item.id }
          setSelectedMenuItem={ setSelectedMenuItem }
          selectedMenuItem={ selectedMenuItem }
        />
      ))}
    </List>
  </Box>
)

SettingsLeft.propTypes = {
  setSelectedMenuItem: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.number.isRequired,
}

ListRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subSections: PropTypes.array,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedMenuItem: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.number.isRequired,
}

export default SettingsLeft
