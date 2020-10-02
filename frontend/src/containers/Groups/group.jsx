import React from 'react'
import {
  Grid, Box, Typography, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEllipsisV, faEye, faHeart, faSearch, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import GroupsList from './groups'
import TrendingTopics from './trendingTopics'
import { newNavBar } from '../../hoc/navbar'

const SelectedGroup = () => (
  <>
    <div>
      <Box className='box'>
        <div className='section-heading display-inline-flex width-100-per'>
          <h3 className='section-title'>
            Group's Name
          </h3>
          <IconButton className='action-button'>
            <FontAwesomeIcon icon={ faEllipsisV } />
          </IconButton>
        </div>
        <Typography>
          description
        </Typography>
      </Box>
      <div className='display-inline-flex width-100-per search-topic-bar'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
          <InputBase
            placeholder='Search'
            className='input-field'
          />
        </div>
        <Button
          className='button-primary-small new-topic-button'
          classes={ { label: 'MuiButton-label button-primary-small-label' } }
        >
          New Topic
        </Button>
      </div>
    </div>
    <Box className='box'>
      <div className='section-heading display-inline-flex width-100-per'>
        <h3 className='section-title'>
          Topics in Group
        </h3>
        <IconButton className='action-button'>
          <FontAwesomeIcon icon={ faSlidersH } />
        </IconButton>
      </div>
      <div className='mt-10'>
        {[ ...Array(10).keys() ].map((e) => (
          <>
            <div className='display-inline-flex topic-info width-100-per' key={ e }>
              <Avatar className='topic-owner-avatar' />
              <div className='topic-details width-100-per'>
                <Typography className='topic-title'>
                  Topic's name
                </Typography>
                <div className='display-inline-flex width-100-per'>
                  <Typography>
                    Owner's name
                  </Typography>
                  <Typography>
                    Date
                  </Typography>
                </div>
                <div>
                  <ul className='display-inline-flex action-buttons'>
                    <li>
                      <FontAwesomeIcon icon={ faHeart } />
                      274
                    </li>

                    <li>
                      <FontAwesomeIcon icon={ faComment } />
                      17
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faEye } />
                      349
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Divider className='topic-divider' />
          </>
        ))}
      </div>
    </Box>
  </>
)

export default SelectedGroup
