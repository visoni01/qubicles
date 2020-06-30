import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Channel from './ForumChannel'
import Info from './ForumInfo'

const ForumWrap = ({ title, channels }) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const setShowInfoCB = useCallback(() => {
    setShowInfo((showInfo) => !showInfo)
  }, [ setShowInfo ])

  return (
    <div className='forum-wrap'>
      <div className='forum-container'>
        {/* toggle button to show group info */}
        <div className='toggle-button'>
          <FontAwesomeIcon icon={ showInfo ? faChevronUp : faChevronDown } onClick={ setShowInfoCB } />
        </div>
        {/* Heading */}
        <div className='channel-heading'>
          <h3>{ title }</h3>
        </div>
        {/* channels */}
        {channels.map((channel) => <Channel { ...channel } key={ `${ channel.title }-${ channel.description }` } />)}
      </div>
      {showInfo && <Info /> }
    </div>
  )
}

ForumWrap.propTypes = {
  title: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf.isRequired,
}

export default ForumWrap
