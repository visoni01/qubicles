/* eslint-disable complexity */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
import {
  CircularProgress, debounce, Divider, Fade, IconButton, List, ListItem, Popover, Slider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  FullScreenIcon, PauseIcon, PlayIcon, SettingsIcon, SkipIcon, VolumeMaxIcon, VolumeMutedIcon,
} from '../../../../../assets/images/mediaPlayer'
import { mediaPlaybackSpeed } from '../../constants'

const MediaPlayer = ({ source, small, type }) => {
  const mediaRef = useRef()
  const mediaRootRef = useRef()
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

  useEffect(() => {
    mediaRef.current.load()
    setIsPlaying(false)
    setPlaybackSpeed(1)
    setShowControls(true)
    setBufferedData(0)
  }, [ source ])

  useEffect(() => () => { mediaRef.current.src = '' }, [])

  const playOrPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false)
      mediaRef.current.pause()
    } else {
      setIsPlaying(true)
      mediaRef.current.play()
    }
  }, [ mediaRef, isPlaying ])

  const formatTimestamp = useCallback((seconds) => {
    const hoursRequired = seconds >= 3600
    return new Date(seconds * 1000).toISOString().substr(hoursRequired ? 11 : 14, hoursRequired ? 8 : 5)
  }, [ ])

  const updateProgress = useCallback((e, value) => {
    if (value) {
      mediaRef.current.currentTime = (value * duration) / 100
    }
    setCurrentTime(mediaRef.current.currentTime)
  }, [ mediaRef, duration ])

  const handleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      mediaRef.current.volume = volume > 0 ? volume : 1
      setVolume((state) => (state > 0 ? state : 1))
    } else {
      setIsMuted(true)
      mediaRef.current.volume = 0
    }
  }, [ mediaRef, isMuted, volume ])

  const handleVolumeChange = useCallback((e, value) => {
    setIsMuted(value === 0)
    setVolume(value / 100)
    mediaRef.current.volume = value / 100
  }, [ mediaRef ])

  const handleForward = useCallback(() => {
    mediaRef.current.currentTime += 10
    setCurrentTime(mediaRef.current.currentTime)
  }, [ mediaRef ])

  const handleSettings = useCallback((event) => {
    setSettingsAnchor(settingsAnchor ? null : event.currentTarget)
  }, [ settingsAnchor ])

  const handlePlaybackSpeed = useCallback((value) => {
    mediaRef.current.playbackRate = value
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
      for (let i = 0; i < mediaRef.current.buffered.length; i += 1) {
        if (mediaRef.current.buffered.start(mediaRef.current.buffered.length - 1 - i) < mediaRef.current.currentTime) {
          setBufferedData((mediaRef.current.buffered.end(mediaRef.current.buffered.length - 1 - i) / duration) * 100)
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
    } else if (mediaRootRef.current.requestFullscreen) mediaRootRef.current.requestFullscreen()
    else if (mediaRootRef.current.mozRequestFullScreen) mediaRootRef.current.mozRequestFullScreen()
    else if (mediaRootRef.current.webkitRequestFullScreen) mediaRootRef.current.webkitRequestFullScreen()
    else if (mediaRootRef.current.msRequestFullscreen) mediaRootRef.current.msRequestFullscreen()
  }, [ mediaRootRef ])

  return (
    <div
      ref={ mediaRootRef }
      className={ `media-player-root ${ type } ${ document.fullscreenElement && !showControls ? 'hide-cursor' : '' }` }
      onMouseEnter={ _.isEqual(type, 'video') ? () => setShowControls(true) : null }
      onMouseLeave={ _.isEqual(type, 'video') ? () => setShowControls(false) : null }
      onMouseMove={ onFullscreenMouseMove }
    >
      {/* Video */}
      {_.isEqual(type, 'video') && (
      <video
        ref={ mediaRef }
        onClick={ playOrPause }
        onTimeUpdate={ updateProgress }
        onLoadedMetadata={ () => setDuration(mediaRef.current.duration) }
        onEnded={ () => setIsPlaying(false) }
        onPause={ () => setIsPlaying(false) }
        onPlay={ () => setIsPlaying(true) }
        onWaiting={ () => setShowLoader(true) }
        onCanPlay={ () => setShowLoader(false) }
        onProgress={ handleBufferingProgress }
      >
        <source src={ source } />
      </video>
      )}

      {/* Audio */}
      {_.isEqual(type, 'audio') && (
      <audio
        ref={ mediaRef }
        onClick={ playOrPause }
        onTimeUpdate={ updateProgress }
        onLoadedMetadata={ () => setDuration(mediaRef.current.duration) }
        onEnded={ () => setIsPlaying(false) }
        onPause={ () => setIsPlaying(false) }
        onPlay={ () => setIsPlaying(true) }
        onWaiting={ () => setShowLoader(true) }
        onCanPlay={ () => setShowLoader(false) }
        onProgress={ handleBufferingProgress }
      >
        <source src={ source } />
      </audio>
      )}

      {/* Loader */}
      <CircularProgress
        className={ `${ showLoader ? '' : 'is-hidden' } ${ small ? 'small' : '' } media-loader` }
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
              container={ mediaRootRef.current }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'center',
              } }
              transformOrigin={ {
                vertical: 'bottom',
                horizontal: 'center',
              } }
              className='settings-popover'
              style={ { opacity: type === 'video' ? 0.8 : 1 } }
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
            {_.isEqual(type, 'video') && (
            <IconButton onClick={ handleFullScreen }>
              <FullScreenIcon />
            </IconButton>
            )}
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default MediaPlayer

MediaPlayer.defaultProps = {
  small: false,
  type: 'video',
}

MediaPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  small: PropTypes.bool,
  type: PropTypes.oneOf('audio', 'video'),
}
