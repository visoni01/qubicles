import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faBriefcase, faLaptop, faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ROUTE_PATHS from '../../../routes/routesPath'

export default function PeopleNavigationActions() {
  return (
    <Box className='custom-box actions-box people-navigation-actions'>
      <h2 className=' h2 mb-30'> People </h2>
      <div className='people-info'>
        <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon sz-md shallow' />
        <span className='para bold'>5,223</span>
        <span className='para'>Open Jobs</span>
      </div>
      <div className='people-info'>
        <FontAwesomeIcon icon={ faComments } className='custom-fa-icon sz-md shallow' />
        <span className='para bold'>839</span>
        <span className='para'>Groups</span>
      </div>
      <div className='people-info'>
        <FontAwesomeIcon icon={ faLaptop } className='custom-fa-icon sz-md shallow' />
        <span className='para bold'>731</span>
        <span className='para'>Courses</span>
      </div>
      <div className='people-info'>
        <FontAwesomeIcon icon={ faUser } className='custom-fa-icon sz-md shallow' />
        <span className='para bold'>533</span>
        <span className='para'>Agents</span>
      </div>
      <Divider className='divider' />
      <h4 className='h4 mb-10'>Quick Links</h4>

      <Link to={ ROUTE_PATHS.NEW_JOB }>
        <p className='primary-text-link mb-5'>New Job </p>
      </Link>

      <Link to={ ROUTE_PATHS.CREATE_COURSE }>
        <p className='primary-text-link mb-5'>New Group </p>
      </Link>

      <Link to={ ROUTE_PATHS.CREATE_COURSE }>
        <p className='primary-text-link mb-5'>New Course </p>
      </Link>
    </Box>
  )
}
