/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import {
  TableContainer, TableHead, TableRow, TableCell, TableBody, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPhoneAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { dummySearchContactsResults } from '../../testData'

const ContactsSearch = ({ setActivePage }) => (
  <div>
    <div className='mb-30 mt-10'>
      <Button
        classes={ {
          root: 'MuiButtonBase-root button-primary-small',
          label: 'MuiButton-label button-primary-small-label',
        } }
        onClick={ () => setActivePage(0) }
      >
        <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
        Back
      </Button>
    </div>
    <h3 className='h3'>
      Search Results
      {' '}
      <span className='para light sz-lg'>
        (4 matches)
      </span>
    </h3>
    <TableContainer>
      <TableHead>
        <TableRow>
          {[ '#', 'Name', 'Phone', 'Status', 'Last Call', 'City', 'State', 'Zip' ].map((rowItem) => (
            <TableCell key={ rowItem }>
              <h4 className='h4'>{rowItem}</h4>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dummySearchContactsResults.map((rowItem) => (
          <TableRow key={ rowItem.id }>
            <TableCell>
              <span className='para'>{rowItem.id}</span>
            </TableCell>
            <TableCell>
              <FontAwesomeIcon icon={ faInfoCircle } className='custom-fa-icon mr-5' />
              <span className='para primary text-link' onClick={ () => setActivePage(2) }>{rowItem.name}</span>
            </TableCell>
            <TableCell>
              <FontAwesomeIcon icon={ faPhoneAlt } className='custom-fa-icon mr-5' />
              <span className='para primary'>{rowItem.phoneNumber}</span>
            </TableCell>
            <TableCell>
              <span className='para'>{rowItem.status}</span>
            </TableCell>
            <TableCell>
              <span className='para'>{rowItem.lastCall}</span>
            </TableCell>
            <TableCell>
              <span className='para'>{rowItem.city}</span>
            </TableCell>
            <TableCell>
              <span className='para'>{rowItem.state}</span>
            </TableCell>
            <TableCell>
              <span className='para'>{rowItem.zip}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  </div>
)

ContactsSearch.defaultProps = {
  setActivePage: () => {},
}

ContactsSearch.propTypes = {
  setActivePage: PropTypes.func,
}

export default ContactsSearch
