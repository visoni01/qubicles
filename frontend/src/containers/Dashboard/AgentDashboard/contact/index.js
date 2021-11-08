import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ContactForm from './contactForm'
import ContactsSearch from './contactsSearch'
import ContactInfo from './contactInfo'
import '../style.scss'

const Contacts = ({ open, onClose }) => {
  const [ activePage, setActivePage ] = useState(0)

  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ onClose }
      maxWidth='md'
      fullWidth
      className='custom-modal agent-root'
      classes={ { paper: 'contact-search-modal' } }
    >
      <div className='header'>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ onClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent classes={ { root: 'dialog-content' } }>
        {activePage === 0 && <ContactForm setActivePage={ setActivePage } />}
        {activePage === 1 && <ContactsSearch setActivePage={ setActivePage } />}
        {activePage === 2 && <ContactInfo setActivePage={ setActivePage } />}
      </DialogContent>
    </Dialog>
  )
}

Contacts.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Contacts
