import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatPopup from './chatPopup'
import '../styles.scss'
import { updatePopupsCount } from '../../../redux-saga/redux/chat'

const ChatPopupWrapper = () => {
  const { conversations, chatPopupIds } = useSelector((state) => state.chatData)
  const dispatch = useDispatch()

  // 80px is the width of the left bar
  const leftBarWidth = 80
  // 360px is the width of a single popup and 10px is the column gap between the popups
  const popupWidth = 370

  // To calculate the number of popups that can fit on the current screen width
  const calculateNumberOfPopups = useCallback(() => {
    const width = window.innerWidth - leftBarWidth
    const totalPopups = parseInt(width / popupWidth, 10)

    return totalPopups
  }, [])

  // To store the count of maximum number of popups that can fit on the screen
  const maxCount = useRef(calculateNumberOfPopups())

  // To get the conversation data of the popups visible on the screen
  const getOpenedPopupsData = useCallback(() => {
    const openedPopups = []

    chatPopupIds.forEach((id) => {
      const conversationData = conversations?.find((item) => item.data.conversationId === id)

      if (conversationData) {
        openedPopups.push(conversationData)
      }
    })

    return openedPopups.slice(0, maxCount.current)
  }, [ chatPopupIds, conversations ])

  // To re-calculate the number of popups when the screen width changes
  const updateNumberOfPopups = useCallback(() => {
    const totalPopups = calculateNumberOfPopups()

    if (maxCount.current !== totalPopups) {
      maxCount.current = totalPopups
      dispatch(updatePopupsCount({
        maxCount: totalPopups,
      }))
    }
  }, [ dispatch, calculateNumberOfPopups ])

  useEffect(() => {
    window.addEventListener('resize', updateNumberOfPopups)
    window.addEventListener('load', updateNumberOfPopups)

    return () => {
      window.removeEventListener('resize', updateNumberOfPopups)
      window.removeEventListener('load', updateNumberOfPopups)
    }
  }, [ updateNumberOfPopups ])

  const openedPopups = getOpenedPopupsData()

  return (
    <div className='chat-popup-root'>
      {openedPopups && openedPopups.map((item) => (
        <ChatPopup
          key={ item.data.conversationId }
          isLoading={ item.isLoading }
          conversationData={ item.data }
        />
      ))}
    </div>
  )
}

export default ChatPopupWrapper
