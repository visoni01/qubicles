import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Channel from './ForumChannel'
import Info from './ForumInfo'

const ForumWrap = ({ id, title, channels }) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const setShowInfoCB = useCallback(() => {
    setShowInfo((currentState) => !currentState)
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
        {channels.map((channel) => <Channel { ...channel } key={ `${ channel.id }-${ channel.description }` } />)}
      </div>
      {showInfo && <Info /> }
    </div>
  )
}

ForumWrap.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.object ])).isRequired,
}

export default ForumWrap