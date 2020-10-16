import React from 'react'
import {
  Grid, Box, Typography, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRedo, faUserFriends, faSearch, faSlidersH, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

const JobsPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Jobs'
          className='input-field'
        />
      </div>
      <Button
        className='search-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        New Job
      </Button>
    </div>
    <Box className='box'>

      <div className='section-heading display-inline-flex is-fullwidth'>
        <h3 className='section-title'>
          Accounting
        </h3>
      </div>
      <div className='mt-10 mb-30'>
        {[ ...Array(3).keys() ].map((e) => (
          <>
            <div className='display-inline-flex job-info is-fullwidth' key={ e }>
              <div className='job-details is-fullwidth'>
                <Typography className='job-title'>
                  Looking for Experienced Customer Service Specialist
                </Typography>
                <div>
                  <ul className='display-inline-flex action-buttons'>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faUserFriends } />
                      <span className='icon-value'>6/50</span>
                      {' '}
                      <span className='icon-title'>Hired</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faRedo } />
                      <span className='icon-value'>3</span>
                      {' '}
                      <span className='icon-title'>Evaluating</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faEnvelope } />
                      <span className='icon-value'>2</span>
                      {' '}
                      <span className='icon-title'>Pending Applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Divider className='job-divider' />
          </>
        ))}
      </div>

      {/* Client Services=== */}

      <div className='section-heading display-inline-flex is-fullwidth'>
        <h3 className='section-title'>
          Client Services
        </h3>
      </div>
      <div className='mt-10 mb-30'>
        {[ ...Array(3).keys() ].map((e) => (
          <>
            <div className='display-inline-flex job-info is-fullwidth' key={ e }>
              <div className='job-details is-fullwidth'>
                <Typography className='job-title'>
                  Looking for Client Service Manager
                </Typography>
                <div>
                  <ul className='display-inline-flex action-buttons'>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faUserFriends } />
                      <span className='icon-value'>6/50</span>
                      {' '}
                      <span className='icon-title'>Hired</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faRedo } />
                      <span className='icon-value'>3</span>
                      {' '}
                      <span className='icon-title'>Evaluating</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='action-icon' icon={ faEnvelope } />
                      <span className='icon-value'>3</span>
                      {' '}
                      <span className='icon-title'>Pending Applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Divider className='job-divider' />
          </>
        ))}
      </div>

    </Box>
  </>
)

export default JobsPage
