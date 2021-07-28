import {
  Box, Divider, IconButton, TextField,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { EditIcon, SearchIcon } from '../../../assets/images/common'
import UserCard from './userCard'
import { userList } from '../testData'
import '../styles.scss'

const LeftCard = () => {
  const [ openSearchField, setOpenSearchField ] = useState(false)

  const handleSearchClick = useCallback(() => {
    setOpenSearchField((prevState) => !prevState)
  }, [])

  return (
    <Box
      className='custom-box no-padding chat-left-section'
    >
      {/* Header */}
      <div className='is-flex is-between align-items-center chat-left-section-header'>
        <h3 className='h3'>
          Chats
        </h3>

        <div className='is-flex is-between'>
          <IconButton
            onClick={ handleSearchClick }
          >
            <SearchIcon className='search-icon' />
          </IconButton>

          <IconButton>
            <EditIcon />
          </IconButton>

          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {openSearchField && (
        <TextField
          className='search-field'
          defaultValue=''
          onChange=''
          placeholder='Search...'
          margin='dense'
          variant='outlined'
        />
      )}

      {/* User List */}
      <div className='user-list'>
        {userList && userList.map((item, index) => (
          <div
            key={ item.id }
          >
            <UserCard
              id={ item.id }
              name={ item.name }
              imageUrl={ item.imageUrl }
              allRead={ item.allRead }
              latestMessage={ item.latestMessage }
              time={ item.time }
            />
            {index !== userList.length - 1 ? <Divider className='user-list-divider' /> : ''}
          </div>
        ))}
      </div>

      {userList && !userList.length && (
        <p className='para sz-xl mt-20 mb-20 text-center'>
          No conversations yet...
        </p>
      )}
    </Box>
  )
}

export default LeftCard
