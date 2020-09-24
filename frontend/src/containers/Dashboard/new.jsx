import React, { useEffect } from 'react'
import './style.scss'
import {
  Avatar, Box, Container, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faEllipsisV, faHeart, faImage, faShare, faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { newNavBar } from '../../hoc/navbar'
import CommunityRep from './CommunityRep'
import postImage from '../../assets/images/demo-pic.jpeg'
import LatestAnnouncement from './LatestAnnouncement'
import JobPostings from './JobPostings'
import { dashboardDataFetchingStart } from '../../redux-saga/redux/actions'
import CheckrVerification from './ChekrVerification'
import './newStyles.scss'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CheckrVerification />
        <CommunityRep />
        <LatestAnnouncement />
        <JobPostings />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <Box className='box'>
          <div className='textarea-input'>
            <Avatar className='avatar' />
            <textarea placeholder='Write Something...' />
            <input type='file' name='' className='position-absolute' />
            <p className='galley-icon'>
              <FontAwesomeIcon icon={ faImage } />
            </p>
          </div>
        </Box>

        <Box className='box'>
          <div className='display-inline-flex'>
            <Avatar className='avatar' />
            <div>
              <h4 className='user-name'>
                <b>Kathy Hill</b>
              </h4>
              <p className='date'>
                Sepetember 06 2020, 15:37 pm
              </p>
            </div>
          </div>

          <div className='post-content'>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              <span className='hash-tag'> #workshop </span>
            </p>
            <img src={ postImage } alt='Helen' />

            <div className='share-like'>
              <ul>
                <li>
                  <FontAwesomeIcon icon={ faHeart } />
                  274 Likes
                </li>

                <li>
                  <FontAwesomeIcon icon={ faComment } />
                  Comments
                </li>
                <li>
                  <FontAwesomeIcon icon={ faShare } />
                  3 Share
                </li>
              </ul>
            </div>

            <div className='textarea-input'>
              <Avatar className='avatar' />
              <textarea placeholder='Write Something...' />
              <input type='file' name='' className='position-absolute' />
              <span className='galley-icon'>
                <FontAwesomeIcon icon={ faImage } />
              </span>
            </div>
          </div>
        </Box>

        <Box className='box'>
          <div className='display-inline-flex'>
            <Avatar className='avatar' />
            <div>
              <h4 className='user-name'>
                <b>Kathy Hill</b>
              </h4>
              <p className='date'>
                Sepetember 06 2020, 15:37 pm
              </p>
            </div>
          </div>

          <div className='post-content'>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              <span className='hash-tag'> #workshop </span>
            </p>
            <img src={ postImage } alt='Helen' />

            <div className='share-like'>
              <ul>
                <li>
                  <FontAwesomeIcon icon={ faHeart } />
                  274 Likes
                </li>

                <li>
                  <FontAwesomeIcon icon={ faComment } />
                  Comments
                </li>
                <li>
                  <FontAwesomeIcon icon={ faShare } />
                  3 Share
                </li>
              </ul>
            </div>

            <div className='textarea-input'>
              <Avatar className='avatar' />
              <textarea placeholder='Write Something...' />
              <input type='file' name='' className='position-absolute' />
              <span className='galley-icon'>
                <FontAwesomeIcon icon={ faImage } />
              </span>
            </div>
          </div>
        </Box>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <Box className='box'>
          <div className='activity-section'>
            <h3 className='mb-3 heading'>
              Today's Activity
              <FontAwesomeIcon icon={ faEllipsisV } className='pull-right' />
            </h3>
            <div>
              <ul>
                <li>
                  <p className='green'>
                    3.282
                  </p>
                  <p>
                    Calls
                  </p>
                </li>
                <li>
                  <p className='green'>
                    680
                  </p>
                  <p>
                    Sales
                  </p>
                </li>
                <li>
                  <p className='yellow'>
                    558
                  </p>
                  <p>
                    Working
                  </p>
                </li>
              </ul>

              <ul>
                <li className=''>
                  <p className='green'>
                    754
                  </p>
                  <p>
                    Live
                  </p>
                </li>
                <li>
                  <p className='red'>
                    599
                  </p>
                  <p>
                    Online
                  </p>
                </li>
                <li>
                  <p className='yellow'>
                    260
                  </p>
                  <p>
                    On a Call
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Box>

        <Box className='box'>
          <div className='customer-service'>
            <h3 className='heading'>
              Customer  Service Overview
            </h3>

            <div className='customer-service-content'>
              <p>
                <span className='green-color'>
                  <b>0.20</b>
                  {' '}
                </span>
                Average speed of answer
              </p>

              <p>
                <span className='dark-color'>
                  <b>2.45</b>
                  {' '}
                </span>
                Marlon mars
              </p>
            </div>
          </div>
        </Box>

        <Box className='box'>
          <div className='customer-service'>
            <h3 className='heading'>
              Staff Productivity Highlights
            </h3>

            <div className='customer-service-content'>
              <p>
                <span className='dark-color'>
                  <b>0.20</b>
                  {' '}
                </span>
                Calls per agent
              </p>

              <p>
                <span className='dark-color'>
                  <b>2.45</b>
                  {' '}
                </span>
                Average talk time
              </p>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default newNavBar(Dashboard)
