import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './style.scss'
import User from '../../redux-saga/service/user'
import { showErrorMessage } from '../../redux-saga/redux/snackbar'
import { userLogoutSuccessful } from '../../redux-saga/redux/login'

const UserAccount = ({ isOpen, toggleIsOpen }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const logOut = async () => {
    const { status } = await User.logout()
    if (status === 200) {
      history.push('/login')
      return dispatch(userLogoutSuccessful())
    }
    return dispatch(showErrorMessage())
  }

  return (
  // Temporary logout functionality.
    <Menu
      classes={ {
        paper: 'account-dropdown-list',
      } }
      open={ isOpen }
      onClose={ () => toggleIsOpen(!isOpen) }
    >
      <MenuItem onClick={ logOut }>Logout</MenuItem>
    </Menu>
  )
}

UserAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
}

export default UserAccount
