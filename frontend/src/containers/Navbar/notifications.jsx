/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { Popover, IconButton, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { bellIcon, bellIconWithIndicator } from '../../assets/images/icons/navBarIcons'
import NotificationCard from './notificationCard'
import { notificationsFetchStart } from '../../redux-saga/redux/user/notifications'
import NotificationsSkeleton from '../../components/Navbar/Skeletons/notificationsSkeleton'
import { REQUEST_TYPES } from '../../utils/constants'

const Notifications = () => {
  const {
    notifications, count, offset, allRead, isLoading, success, requestType,
  } = useSelector((state) => state.notifications)
  const [ isDropDownOpen, setIsDropdownOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!(notifications && notifications.length) && !success) {
      dispatch(notificationsFetchStart({
        requestType: REQUEST_TYPES.FETCH,
        offset: 0,
      }))
    }
  }, [ dispatch, notifications, success ])

  const toggleDropdownOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
    setIsDropdownOpen((state) => !state)
  }, [])

  const handleViewMore = useCallback(() => {
    dispatch(notificationsFetchStart({
      requestType: REQUEST_TYPES.FETCH,
      offset: offset + 5,
    }))
  }, [ dispatch, offset ])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setIsDropdownOpen(false)

    const updateNotifications = notifications && notifications.filter((notification) => !notification.isRead)

    if (updateNotifications && updateNotifications.length) {
      dispatch(notificationsFetchStart({
        requestType: REQUEST_TYPES.UPDATE,
        notificationIds: updateNotifications.map((notification) => notification.id),
      }))
    }
  }, [ dispatch, notifications ])

  const handleDelete = useCallback((id) => {
    dispatch(notificationsFetchStart({
      requestType: REQUEST_TYPES.DELETE,
      notificationId: id,
      offset,
    }))
  }, [ dispatch, offset ])

  return (
    <>
      <IconButton
        className='topbar-button'
        onClick={ toggleDropdownOpen }
      >
        <img
          src={ allRead ? bellIcon : bellIconWithIndicator }
          alt='Notification Icon'
        />
      </IconButton>

      <Popover
        disableScrollLock
        open={ isDropDownOpen }
        className='notifications-popover mt-60'
        onClose={ handleClose }
        anchorEl={ anchorEl }
      >
        <div className='notification-menu'>
          {notifications && notifications.map((notification) => (
            <NotificationCard
              key={ notification.id }
              id={ notification.id }
              message={ notification.message }
              isRead={ notification.isRead }
              createdAt={ notification.createdAt }
              imageUrl={ notification.imageUrl }
              handleDelete={ handleDelete }
            />
          ))}

          {!isLoading && notifications && notifications.length < count && (
            <div className='view-more-button'>
              <Button
                onClick={ handleViewMore }
                classes={ {
                  root: 'button-primary-text small-height',
                  label: 'button-primary-text-label primary-text-link',
                } }
              >
                view more...
              </Button>
            </div>
          )}

          {!isLoading && notifications && !notifications.length && (
            <p className='para sz-xl mt-10 mb-10 text-center'>No notifications found...</p>
          )}

          {(isLoading && _.isEqual(requestType, REQUEST_TYPES.FETCH)) && (
            <NotificationsSkeleton />
          )}
        </div>
      </Popover>
    </>
  )
}

export default Notifications
