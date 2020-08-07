import React from 'react'
import demoPic from '../../assets/images/demo-pic.jpeg'
import profileLogo1 from '../../assets/images/ray.jpg'
import './style.scss'

const PostsList = () => (
  <div className='post-item animated preFadeInLeft fadeInLeft'>
    <div className='is-flex is-start is-vcenter padding-10'>
      <img
        className='feed-avatar'
        src={ profileLogo1 }
        alt='feed-avatar'
      />
      <div className='item-title full-width'>
        <span> Posted by </span>
        <span>Ray O&apos;Driscol</span>
        <span className='feed-time-small float-right'>45 minutes ago</span>
        <br />
      </div>
    </div>
    <div className='is-flex is-start is-vcenter'>
      <p>
        <span
          className='post-title'
        >
          <span>
            How team building boosts productivity
          </span>
        </span>
        <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem
        Ipsum is simply
        dummy text Lorem Ipsum ...
      </p>
    </div>
    <div className='is-flex is-start is-vcenter'>
      <div className='feed-image-container'>
        <div className='soft-overlay' />
        <img src={ demoPic } alt='demo-pic' />
      </div>
    </div>
  </div>
)

export default PostsList
