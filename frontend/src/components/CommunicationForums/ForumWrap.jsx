import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Select } from '@material-ui/core'
import Channel from './ForumChannel'
import Info from './ForumInfo'
import DropDown from './actionDropdown'

const ForumWrap = ({ title, channels }) => {
  const [ showInfo, setShowInfo ] = useState(false)
  return (
    <div className='forum-wrap'>
      <div className='forum-container'>
        {/* toggle button to show group info */}
        <div className='toggle-button'>
          <FontAwesomeIcon icon={ showInfo ? faChevronUp : faChevronDown } onClick={ () => setShowInfo(!showInfo) } />
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
