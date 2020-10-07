import React from 'react'
import {
  Grid, Box, Typography, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEllipsisV, faEye, faHeart, faSearch, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import GroupsList from './groups'
import TrendingTopics from './trendingTopics'
import { newNavBar } from '../../hoc/navbar'
import { carolin } from '../../assets/images/avatar/index'

const SelectedGroup = ({ group }) => {
  const { title, description } = group

  return (
    <>
      <div>
        <Box className='primary-box padding-20 mb-20'>
          <div className='section-heading display-inline-flex width-100-per'>
            <h3 className='h3'>
              {title}
            </h3>
            <IconButton className='action-button'>
              <FontAwesomeIcon icon={ faEllipsisV } />
            </IconButton>
          </div>
          <p className='para'>
            {description}
          </p>
        </Box>
        <div className='display-inline-flex width-100-per search-topic-bar'>
          <div className='search-input primary-box'>
            <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
            <InputBase
              placeholder='Search'
              className='input-field'
            />
          </div>
          <Button
            className='new-topic-button'
            classes={ {
              label: 'MuiButton-label button-primary-small-label',
              root: 'MuiButtonBase-root button-primary-small',
            } }
          >
            New Topic
          </Button>
        </div>
      </div>
      <Box className='primary-box padding-20'>
        <div className='section-heading display-inline-flex width-100-per'>
          <h3 className='h3'>
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
                <Avatar className='mr-10' src={ carolin } />
                <div className='width-100-per'>
                  <h4 className='h4'>
                    Topic's name
                  </h4>
                  <div className='display-inline-flex width-100-per'>
                    <p className='para'>
                      Owner's name
                    </p>
                    <p className='date ml-20'>
                      Date
                    </p>
                  </div>
                  <div>
                    <ul className='display-inline-flex action-buttons'>
                      <li>
                        <FontAwesomeIcon icon={ faHeart } />
                        <p>
                          274 Likes
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faComment } />
                        <p>
                          17 Comments
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faEye } />
                        <p>
                          349 Views
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Divider className='mb-30' />
            </>
          ))}
        </div>
      </Box>
    </>
  )
}

SelectedGroup.defaultProps = {
  group: {
    title: '',
    description: '',
  },
}

SelectedGroup.propTypes = {
  group: {
    title: PropTypes.string,
    description: PropTypes.string,
  },
}

export default SelectedGroup
