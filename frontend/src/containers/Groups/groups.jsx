import React, { useEffect, useCallback } from 'react'
import {
  Box, IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { groupsFetchingStart } from '../../redux-saga/redux/actions'

const Groups = ({ selectedGroup, setSelectedGroup }) => {
  const dispatch = useDispatch()
  const { groups } = useSelector((state) => state.groups)

  useEffect(() => {
    dispatch(groupsFetchingStart())
  }, [ dispatch ])

  const newGroupForm = useCallback(() => setSelectedGroup('new'), [])

  return (
    <Box className='group-list-root primary-box'>
      <div className='group-list-title'>
        <h3 className='h2 mb-10'>Groups</h3>
        <IconButton onClick={ newGroupForm }>
          <FontAwesomeIcon icon={ faPlus } className='add-icon' />
        </IconButton>
      </div>
      <List
        disablePadding
      >
        {Boolean(groups.length) && groups.map(({ id, title }, index) => (
          <ListItem
            button
            key={ id }
            classes={ { gutters: 'group-item' } }
            selected={ selectedGroup === index }
            onClick={ () => setSelectedGroup(index) }
          >
            <ListItemText
              primary={ title }
              classes={ { primary: 'group-name' } }
            />
            {/** Notification number logic still not clear */}
            <div className='notification-number'>+2</div>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

Groups.defaultProps = {
  selectedGroup: 0,
}

Groups.propTypes = {
  selectedGroup: PropTypes.string,
  setSelectedGroup: PropTypes.func.isRequired,
}

export default Groups
