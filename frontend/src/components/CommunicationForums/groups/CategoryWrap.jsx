import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import ChannelListItem from './ChannelListItem'

const CategoryWrap = ({ id, title, channels }) => {
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
        {/* Channels list */}
        {channels.map((channel) => <ChannelListItem { ...channel } key={ `${ channel.id }` } />)}
      </div>
    </div>
  )
}

CategoryWrap.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.object ])).isRequired,
}

export default CategoryWrap
