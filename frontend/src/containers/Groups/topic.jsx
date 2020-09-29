import React from 'react'
import {
  faChevronLeft, faComment, faEye, faHeart, faImage,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button, Divider, Typography,
} from '@material-ui/core'

const SelectedTopic = () => (
  <>
    <Box className='box topic-details-box'>
      <div className='mb-20'>
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          General
        </Button>
      </div>
      <div className='display-inline-flex width-100-per topic-owner'>
        <Avatar className='mr-10' />
        <p className='owner-name'>
          Kathy Hill
        </p>
        <p className='topic-create-date'>
          September 06 2020, 15:36
        </p>
      </div>
      <h3 className='topic-title'>
        Adipiscing consequet augue
      </h3>
      <p className='topic-description'>
        Whether you're looking for work in a contact center, seeking cloud-based contact center software or you're in
        the market for talent, we've got you covered. Powered by blockchain smart contracts with no middlemen involved,
        our patent-pending technology ensures the right agent is matched to the right position at the right time.
        Members of our team have been on the battlefield as agents, supervisors and executives. We know firsthand how
        irate customers respond, what makes employees happy, the key performance metrics for contact centers, and how
        the right technology can make a difference.
      </p>
      <div className='action-buttons'>
        <ul className='display-inline-flex action-buttons width-100-per'>
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
    </Box>
    <Box className='box'>
      <div className='textarea-input'>
        <Avatar className='avatar' />
        <textarea placeholder='Write Something...' />
        <input type='file' name='' className='position-absolute' />
        <p className='galley-icon'>
          <FontAwesomeIcon icon={ faImage } />
        </p>
      </div>
      <Button
        className='post-comment-button'
        classes={ {
          root: 'MuiButtonBase-root button-primary-small',
          label: 'MuiButton-label button-primary-small-label',
        } }
      >
        Post
      </Button>
    </Box>
    <Box className='box comments-list'>
      <h3>
        Comments
      </h3>
      <div>
        {[ ...Array(10).keys() ].map((e) => (
          <>
            <div key={ e } className='commentor-info'>
              <div className='display-inline-flex mb-10'>
                <Avatar className='mr-10' />
                <div>
                  <p className='commentor-name'>
                    Bruce Hoffman
                  </p>
                  <p className='comment-date'>
                    September 06 2020, 15:36
                  </p>
                </div>
              </div>
              <p className='comment-description'>
                It's a new world, powered by the trust and transparency of smart contracts and blockchain technology.
              </p>
            </div>
            <Divider />
          </>
        ))}
      </div>
    </Box>
  </>
)

export default SelectedTopic
