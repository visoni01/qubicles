import React, { useEffect, useCallback } from 'react'
import {
  Box, IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { groupsFetchingStart } from '../../../redux-saga/redux/actions'
import ListSkeleton from '../../../components/Forum/Skeletons/groupsList'

const Groups = ({ selectedGroup, setSelectedGroup }) => {
  const dispatch = useDispatch()
  const { groups, isLoading } = useSelector((state) => state.groups)

  useEffect(() => {
    dispatch(groupsFetchingStart())
  }, [ dispatch ])

  const newGroupForm = useCallback(() => setSelectedGroup('new'), [ setSelectedGroup ])

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <ListSkeleton />
      </Box>
    )
  }

  return (
    <Box className='group-list-root custom-box'>
      <div className='group-list-title mb-10'>
        <h3 className='h2'>Groups</h3>
        <IconButton onClick={ newGroupForm } className='add-new-group-icon'>
          <FontAwesomeIcon icon={ faPlus } className='custom-fa-icon light pointer sz-lg' />
        </IconButton>
      </div>
      <List
        disablePadding
      >
        {groups.length ? groups.map(({ id, title }, index) => (
          <ListItem
            button
            key={ id }
            classes={ { gutters: 'group-item' } }
            selected={ selectedGroup === index }
            onClick={ () => setSelectedGroup(index) }
          >
            <ListItemText
              primary={ title }
              classes={ { primary: 'h4 light fw-md groups-list-item' } }
            />
            {/** Notification number logic still not clear */}
            <div className='notification-number'>+2</div>
          </ListItem>
        )) : (
          <h4 className='h4 text-center padding-20'>
            No groups to show
          </h4>
        )}
      </List>
    </Box>
  )
}

Groups.defaultProps = {
  selectedGroup: 0,
}

Groups.propTypes = {
  selectedGroup: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  setSelectedGroup: PropTypes.func.isRequired,
}

export default Groups
