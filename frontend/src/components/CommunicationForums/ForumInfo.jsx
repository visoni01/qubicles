import React from 'react'

const Info = () => (
  <>
    <div className='latest-posts'>
      <div className='avatars'>
        <img className='avatar' src='https://via.placeholder.com/150x150' alt='' data-demo-src='assets/images/avatars/elie.jpg' />
        <img className='avatar' src='https://via.placeholder.com/150x150' alt='' data-demo-src='assets/images/avatars/helen.jpg' />
        <img className='avatar' src='https://via.placeholder.com/150x150' alt='' data-demo-src='assets/images/avatars/henry.jpg' />
        <div className='avatar'>
          <span>+3</span>
        </div>
      </div>
      <div className='latest-meta'>
        <span>
          <a>Elie</a>
          {' '}
          <a>Helen</a>
          {' '}
          and
          {' '}
          <a>3 more</a>
        </span>
        <span>published posts in this category</span>
      </div>
      <div className='forum-stats'>
        <div className='stat'>
          <i className='sl sl-icon-people' />
          <span>548</span>
        </div>
        <div className='stat'>
          <i className='sl sl-icon-speech' />
          <span>10857</span>
        </div>
        <div className='stat'>
          <i className='sl sl-icon-paper-clip' />
          <span>432</span>
        </div>
      </div>
    </div>
  </>
)

export default Info
