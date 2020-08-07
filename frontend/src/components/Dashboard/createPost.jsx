import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import profileLogo2 from '../../assets/images/helen.jpg'
import './style.scss'

const CreatePost = () => (
  <div className='compose-card is-flex is-start is-vcenter post-section'>
    <figure className='avatar image is-hidden-mobile'>
      <img
        className='img-circle'
        src={ profileLogo2 }
        alt='profile-logo-2'
      />
    </figure>
    <div className='status-wrapper'>
      <textarea
        className='textarea is-grow'
        rows='5'
        placeholder='Write something ...'
      />
    </div>
    <div className='icon-button'>
      <i data-feather='upload-cloud' />
    </div>
    <div className='other-options'>
      <div className='upload-file'>
        <FontAwesomeIcon icon={ faCamera } />
        <span className='file-input-label'>Media</span>
        <input type='file' className='input-field' />
      </div>
    </div>
  </div>
)

export default CreatePost
