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
    <div className='display-inline-flex is-fullwidth mt-10 search-job-bar'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Jobs'
          className='input-field'
        />
      </div>
      <Button
        className='button-primary-small new-job'
        classes={ { label: 'MuiButton-label button-primary-small-label' } }
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
                      <FontAwesomeIcon icon={ faUserFriends } />
                      6/50 Hired
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faRedo } />
                      3 Evaluating
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faEnvelope } />
                      2 Pending Apllication
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Divider className='job-divider' />
          </>
        ))}
      </div>
      <div className='section-heading display-inline-flex is-fullwidth'>
        <h3 className='section-title'>
          Client Services
        </h3>
      </div>
      <div className='mt-10'>
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
                      <FontAwesomeIcon icon={ faUserFriends } />
                      6/50 Hired
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faRedo } />
                      3 Evaluating
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faEnvelope } />
                      2 Pending Apllication
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
