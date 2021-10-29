/* eslint-disable complexity */
import _ from 'lodash'
import store from '../redux-saga/store'
import {
  chatDataRequestStart, updateAllChats, updateChatPopups, updateConversations,
} from '../redux-saga/redux/chat'
import { CHAT_ROUTE } from '../routes/routesPath'
import { playNotificationAudio } from '../utils/common'
import { REQUEST_TYPES } from '../utils/constants'
import {
  ADD_CONVERSATION, ADD_PEOPLE, CHANGE_GROUP_NAME, CURRENT_CHAT, LEAVE_GROUP, NEW_GROUP, NEW_MESSAGE, REMOVE_PERSON,
  RETRY_MESSAGE,
} from '../redux-saga/redux/constants'

const fetchAndAddChatData = ({ conversationId }) => {
  store.dispatch(chatDataRequestStart({
    requestType: REQUEST_TYPES.FETCH,
    dataType: CURRENT_CHAT,
    conversationId,
    updateAllChat: true,
  }))
}

const addMessagesInChatReducers = ({ messages, conversationId, fromSelf }) => {
  messages.forEach((message) => {
    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: NEW_MESSAGE,
      conversationId,
      newMessage: message,
      fromSelf,
    }))

    if (_.isEqual(message.error, false)) {
      store.dispatch(updateAllChats({
        requestType: REQUEST_TYPES.UDPATE,
        dataType: RETRY_MESSAGE,
        conversationId,
        latestMessage: message.text,
        isImage: !!message.imageUrl,
        isNotification: message.isNotification,
        dateTime: message.sentAt,
      }))
    }
  })

  if (!fromSelf && window.location.pathname === CHAT_ROUTE) {
    const lastMessage = messages && messages[ messages?.length - 1 ]

    store.dispatch(updateAllChats({
      dataType: NEW_MESSAGE,
      conversationId,
      dateTime: lastMessage?.sentAt,
      latestMessage: lastMessage?.text,
      isImage: !!lastMessage?.imageUrl,
      isNotification: lastMessage?.isNotification,
      fromSelf,
    }))
  }

  if (!fromSelf) {
    playNotificationAudio()
  }
}

const addChatPopup = ({ conversationId }) => {
  store.dispatch(updateChatPopups({
    requestType: REQUEST_TYPES.ADD,
    conversationId,
  }))
}

const chatNewGroupHandler = ({ payload, fromSelf, conversationId }) => {
  store.dispatch(updateConversations({
    requestType: REQUEST_TYPES.CREATE,
    dataType: ADD_CONVERSATION,
    newChat: payload?.newConversation?.newChat,
  }))

  if (window.location.pathname === CHAT_ROUTE) {
    store.dispatch(updateAllChats({
      dataType: NEW_GROUP,
      newChat: payload.newChat,
    }))
  }

  if (!fromSelf && window.location.pathname !== CHAT_ROUTE) {
    addChatPopup({ conversationId })
  }

  if (!fromSelf) {
    playNotificationAudio()
  }
}

const chatRemovePersonHandler = ({ payload, conversationData, conversationId }) => {
  if (conversationData) {
    const { userDetails } = store.getState().login
    const userId = userDetails && userDetails.user_id
    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: REMOVE_PERSON,
      conversationId,
      removedPersonId: payload.removedPersonId,
      fromSelf: _.isEqual(userId, payload.removedPersonId),
    }))

    if (window.location.pathname === CHAT_ROUTE) {
      const { conversations } = store.getState().chatData
      const currentCoversation = conversations.find((conversation) => (
        conversation?.data?.conversationId === conversationId
      ))
      const groupName = currentCoversation?.data?.candidatesInfo?.map((member) => member.name).join(', ')

      if (_.isEqual(userId, payload.removedPersonId)) {
        store.dispatch(updateAllChats({
          dataType: LEAVE_GROUP,
          conversationId,
          newGroupName: _.isEmpty(conversationData.groupName) && groupName,
          isRemoved: true,
          allRead: true,
          isImage: false,
          isNotification: true,
          dateTime: Date.now(),
        }))
      } else if (_.isEmpty(conversationData.groupName)) {
        store.dispatch(updateAllChats({
          dataType: CHANGE_GROUP_NAME,
          conversationId,
          newGroupName: groupName,
        }))
      }
    }
  } else {
    fetchAndAddChatData({ conversationId })
  }
}

const chatAddPeopleHandler = ({ payload, conversationData, conversationId }) => {
  if (conversationData) {
    const { userDetails } = store.getState().login
    const userId = userDetails && userDetails.user_id
    const isUserBelongsToGroup = payload.newMembers?.find((member) => member.id === userId)
    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: ADD_PEOPLE,
      conversationId,
      newMembers: payload.newMembers,
      fromSelf: isUserBelongsToGroup,
    }))

    if (window.location.pathname === CHAT_ROUTE) {
      const { conversations } = store.getState().chatData
      const currentCoversation = conversations.find((conversation) => (
        conversation?.data?.conversationId === conversationId
      ))
      const updatedconversationData = currentCoversation?.data
      const groupName = updatedconversationData.candidatesInfo?.map((member) => member.name).join(', ')

      store.dispatch(updateAllChats({
        dataType: ADD_PEOPLE,
        conversationId,
        newGroupName: _.isEmpty(conversationData.groupName) && groupName,
        isRemoved: false,
        isImage: false,
        isNotification: true,
      }))
    }
  } else {
    fetchAndAddChatData({ conversationId })
  }
}

const chatChangeGroupNameHandler = ({ payload, conversationData, conversationId }) => {
  if (conversationData) {
    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: CHANGE_GROUP_NAME,
      conversationId,
      newGroupName: payload.newGroupName,
    }))

    if (window.location.pathname === CHAT_ROUTE) {
      store.dispatch(updateAllChats({
        dataType: CHANGE_GROUP_NAME,
        conversationId,
        newGroupName: payload.newGroupName,
      }))
    }
  } else {
    fetchAndAddChatData({ conversationId })
  }
}

export const getConversationIdFromRoomId = (roomId) => parseInt(roomId?.replace('c-', ''), 10)

const receiveMessageCasesHandler = ({
  dataType, payload, conversationData, conversationId, fromSelf,
}) => {
  switch (dataType) {
    case NEW_GROUP: {
      chatNewGroupHandler({ payload, fromSelf, conversationId })
      break
    }

    case REMOVE_PERSON: {
      chatRemovePersonHandler({ payload, conversationData, conversationId })
      break
    }

    case ADD_PEOPLE: {
      chatAddPeopleHandler({ payload, conversationData, conversationId })
      break
    }

    case CHANGE_GROUP_NAME: {
      chatChangeGroupNameHandler({ payload, conversationData, conversationId })
      break
    }

    case NEW_MESSAGE: {
      if (!conversationData) {
        fetchAndAddChatData({ conversationId })
      }
      break
    }

    default:
  }
}

export const receiveMessageEventCallback = ({
  to, messages, from, dataType, payload,
}) => {
  const { userDetails } = store.getState().login
  const fromSelf = _.isEqual(parseInt(from, 10), userDetails.user_id)
  const conversationId = getConversationIdFromRoomId(to)
  const { conversations } = store.getState().chatData
  const currentCoversation = conversations.find((conversation) => (
    conversation?.data?.conversationId === conversationId
  ))
  const conversationData = currentCoversation?.data

  if (!fromSelf) {
    receiveMessageCasesHandler({
      dataType, payload, conversationData, conversationId, fromSelf,
    })
  }

  if (messages && conversationData) {
    addMessagesInChatReducers({ messages, conversationId, fromSelf })

    if (!fromSelf && window.location.pathname !== CHAT_ROUTE) {
      addChatPopup({ conversationId })
    }
  }
}
