import React, { useEffect } from 'react'
import './style.scss'
import {
  Avatar, Box, Container, Grid,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faEllipsisV, faHeart, faImage, faShare, faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { newNavBar } from '../../hoc/navbar'
import postImage from '../../assets/images/demo-pic.jpeg'

const Dashboard = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <Box className='box'>
        <div>
          <FontAwesomeIcon icon={ faTimes } className='pull-right' />
          <h3 className='heading'>
            Background Screening
          </h3>
          <p className='detail'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          </p>
        </div>
        <div className='background-check-buttons custom-btn'>
          <button type='button' className='not-now-btn'>
            Not now
          </button>

          <button type='button' className='start-btn'>
            Start
          </button>
        </div>
      </Box>

      <Box className='box'>
        <h3 className='heading'>
          Your Community Reputation
        </h3>

        <Rating
          name='simple-controlled'
          value='4'
        />

        <div className='people-like'>
          <p className='like-people'>
            <b>14</b>
            {' '}
            people liked your company
          </p>
        </div>

        <div className='people-like'>
          <p className='like-people'>
            <b>14</b>
            {' '}
            people are following you
          </p>
        </div>
      </Box>

      <Box className='box'>
        <div className='announcement-section'>
          <h3 className='heading'>
            Latest Announcements
          </h3>
          <ul>
            <li className='display-inline-flex'>
              <span>
                <b>04 Sep</b>
              </span>
              <p>
                New Schedule During covid-19 pandemic
              </p>
            </li>

            <li className='display-inline-flex'>
              <span>
                <b>
                  04
                  Sep
                </b>
              </span>
              <p>
                New Schedule During covid-19 pandemic
              </p>
            </li>
          </ul>
        </div>
      </Box>

      <Box className='box'>
        <div className='posting-section'>
          <h3 className='mb-3 heading'>
            Job Posting
          </h3>

          <ul className='m-0 p-0'>
            <li>
              <p className='m-0'><b>Customer Specialist</b></p>
              <p className='m-0'>
                <b>34</b>
                {' '}
                applications received
              </p>
            </li>

            <li>
              <p className='m-0'><b>Call Center Supervisor</b></p>
              <p className='m-0'>
                <b>7</b>
                {' '}
                applications received
              </p>
            </li>
          </ul>
        </div>
      </Box>
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

export default newNavBar(Dashboard)
