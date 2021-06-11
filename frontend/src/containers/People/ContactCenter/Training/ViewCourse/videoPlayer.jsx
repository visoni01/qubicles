/* eslint-disable complexity */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useRef, useState } from 'react'
import {
  CircularProgress, debounce, Divider, Fade, IconButton, List, ListItem, Popover, Slider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  FullScreenIcon, PauseIcon, PlayIcon, SettingsIcon, SkipIcon, VolumeMaxIcon, VolumeMutedIcon,
} from '../../../../../assets/images/mediaPlayer'
import { mediaPlaybackSpeed } from '../../constants'

const VideoPlayer = ({ source, small }) => {
  const videoRef = useRef()
  const videoRootRef = useRef()
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const [ volume, setVolume ] = useState(1)
  const [ isMuted, setIsMuted ] = useState(false)
  const [ showVolumeSlider, setShowVolumeSlider ] = useState(false)
  const [ showProgressThumb, setShowProgressThumb ] = useState(false)
  const [ showControls, setShowControls ] = useState(true)
  const [ showLoader, setShowLoader ] = useState(true)
  const [ settingsAnchor, setSettingsAnchor ] = useState(null)
  const [ playbackSpeed, setPlaybackSpeed ] = useState(1)
  const [ bufferedData, setBufferedData ] = useState(0)
  const open = Boolean(settingsAnchor)
  const id = open ? 'simple-popover' : undefined

  const playOrPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false)
      videoRef.current.pause()
    } else {
      setIsPlaying(true)
      videoRef.current.play()
    }
  }, [ videoRef, isPlaying ])

  const formatTimestamp = useCallback((seconds) => {
    const hoursRequired = seconds >= 3600
    return new Date(seconds * 1000).toISOString().substr(hoursRequired ? 11 : 14, hoursRequired ? 8 : 5)
  }, [ ])

  const updateProgress = useCallback((e, value) => {
    if (value) {
      videoRef.current.currentTime = (value * duration) / 100
    }
    setCurrentTime(videoRef.current.currentTime)
  }, [ videoRef, duration ])

  const handleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      videoRef.current.volume = volume > 0 ? volume : 1
      setVolume((state) => (state > 0 ? state : 1))
    } else {
      setIsMuted(true)
      videoRef.current.volume = 0
    }
  }, [ videoRef, isMuted, volume ])

  const handleVolumeChange = useCallback((e, value) => {
    setIsMuted(value === 0)
    setVolume(value / 100)
    videoRef.current.volume = value / 100
  }, [ videoRef ])

  const handleForward = useCallback(() => {
    videoRef.current.currentTime += 10
  }, [ videoRef ])

  const handleSettings = useCallback((event) => {
    setSettingsAnchor(settingsAnchor ? null : event.currentTarget)
  }, [ settingsAnchor ])

  const handlePlaybackSpeed = useCallback((value) => {
    videoRef.current.playbackRate = value
    setPlaybackSpeed(value)
    setTimeout(() => {
      setSettingsAnchor(null)
    }, 200)
  }, [ ])

  const onFullscreenMouseMoveDebounce = useCallback(debounce(() => {
    if (document.fullscreenElement) {
      setShowControls(false)
      setSettingsAnchor(null)
    }
  }, 3000), [ ])

  const onFullscreenMouseMove = useCallback(() => {
    setShowControls(true)
    onFullscreenMouseMoveDebounce()
  }, [ onFullscreenMouseMoveDebounce ])

  // Reference Link: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges
  const handleBufferingProgress = useCallback(() => {
    if (duration > 0) {
      for (let i = 0; i < videoRef.current.buffered.length; i += 1) {
        if (videoRef.current.buffered.start(videoRef.current.buffered.length - 1 - i) < videoRef.current.currentTime) {
          setBufferedData((videoRef.current.buffered.end(videoRef.current.buffered.length - 1 - i) / duration) * 100)
          break
        }
      }
    }
  }, [ duration ])

  // Reference Link: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player
  const handleFullScreen = useCallback(() => {
    if (document.webkitIsFullScreen || document.mozFullScreen
       || document.msFullscreenElement || document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    } else if (videoRootRef.current.requestFullscreen) videoRootRef.current.requestFullscreen()
    else if (videoRootRef.current.mozRequestFullScreen) videoRootRef.current.mozRequestFullScreen()
    else if (videoRootRef.current.webkitRequestFullScreen) videoRootRef.current.webkitRequestFullScreen()
    else if (videoRootRef.current.msRequestFullscreen) videoRootRef.current.msRequestFullscreen()
  }, [ videoRootRef ])

  return (
    <div
      ref={ videoRootRef }
      className={ `video-player-root ${ document.fullscreenElement && !showControls ? 'hide-cursor' : '' }` }
      onMouseEnter={ () => setShowControls(true) }
      onMouseLeave={ () => setShowControls(false) }
      onMouseMove={ onFullscreenMouseMove }
    >
      {/* Video */}
      <video
        ref={ videoRef }
        onClick={ playOrPause }
        onTimeUpdate={ updateProgress }
        onLoadedMetadata={ () => setDuration(videoRef.current.duration) }
        onEnded={ () => setIsPlaying(false) }
        onPause={ () => setIsPlaying(false) }
        onPlay={ () => setIsPlaying(true) }
        onWaiting={ () => setShowLoader(true) }
        onCanPlay={ () => setShowLoader(false) }
        onProgress={ handleBufferingProgress }
      >
        <source src={ source } />
      </video>

      {/* Loader */}
      <CircularProgress
        className={ `${ showLoader ? '' : 'is-hidden' } video-loader` }
        size={ document.fullscreenElement ? 100 : 60 }
      />

      {/* Controls */}
      <Fade in={ showControls } timeout={ { enter: 100, exit: 400 } }>
        <div
          className='controls'
        >
          {/* Buffer Progress */}
          <Slider
            classes={ {
              root: 'progress-buffer-root',
              track: 'progress-slider-track',
              rail: 'progress-slider-rail',
              thumb: 'is-hidden',
            } }
            value={ bufferedData }
          />
          {/* Seekbar */}
          <Slider
            classes={ {
              root: 'progress-slider-root',
              track: 'progress-slider-track',
              rail: 'progress-slider-rail',
              thumb: `progress-slider-thumb ${ showProgressThumb ? '' : 'is-hidden' }`,
            } }
            value={ (currentTime * 100) / duration }
            onChange={ updateProgress }
            onMouseEnter={ () => setShowProgressThumb(true) }
            onMouseLeave={ () => setShowProgressThumb(false) }
          />
          <div className={ `controls-left ${ small ? 'small' : '' }` }>
            {/* Play and Pause */}
            <IconButton onClick={ playOrPause } classes={ { label: 'play-pause-button' } }>
              { isPlaying ? <PauseIcon /> : <PlayIcon /> }
            </IconButton>
            {/* Skip */}
            <IconButton onClick={ handleForward } className={ `${ small ? 'is-hidden' : '' }` }>
              <SkipIcon />
            </IconButton>
            {/* Timestamp */}
            <div className={ `timestamp ${ small ? 'small' : '' }` }>
              {`${ formatTimestamp(currentTime) } / ${ formatTimestamp(duration) }`}
            </div>
          </div>
          <div className={ `controls-right ${ small ? 'small' : '' }` }>
            {/* Volume */}
            <div
              className='volume-control'
              onMouseEnter={ () => setShowVolumeSlider(true) }
              onMouseLeave={ () => setShowVolumeSlider(false) }
            >
              <Slider
                classes={ {
                  root: `volume-slider-root ${ !showVolumeSlider ? 'is-hidden' : '' } ${ small ? 'small' : '' }`,
                } }
                value={ isMuted ? 0 : volume * 100 }
                onChange={ handleVolumeChange }
                aria-labelledby='continuous-slider'
              />
              <IconButton
                onClick={ handleMute }
              >
                { isMuted ? <VolumeMutedIcon /> : <VolumeMaxIcon /> }
              </IconButton>
            </div>
            {/* Settings */}
            <IconButton
              aria-describedby={ id }
              onClick={ handleSettings }
              className={ `${ small ? 'is-hidden' : '' }` }
            >
              <SettingsIcon />
            </IconButton>
            {/* Playback Speed */}
            <Popover
              id={ id }
              open={ open }
              onClose={ () => setSettingsAnchor(null) }
              anchorEl={ settingsAnchor }
              container={ videoRootRef.current }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'center',
              } }
              transformOrigin={ {
                vertical: 'bottom',
                horizontal: 'center',
              } }
              className='settings-popover'
              style={ { opacity: 0.8 } }
            >
              <List disablePadding>
                <ListItem className='para bold'>
                  Playback Speed
                </ListItem>
              </List>
              <Divider />
              <List disablePadding>
                {mediaPlaybackSpeed.map((speed) => (
                  <ListItem
                    className='para bold'
                    key={ speed.value }
                    button
                    onClick={ () => handlePlaybackSpeed(speed.value) }
                    selected={ speed.value === playbackSpeed }
                  >
                    {speed.label}
                  </ListItem>
                ))}
              </List>
            </Popover>
            {/* Full Screen */}
            <IconButton onClick={ handleFullScreen }>
              <FullScreenIcon />
            </IconButton>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default VideoPlayer

VideoPlayer.defaultProps = {
  small: false,
}

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  small: PropTypes.bool,
}
