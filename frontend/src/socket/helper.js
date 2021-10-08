/* eslint-disable complexity */
import _ from 'lodash'
import store from '../redux-saga/store'
import {
  chatDataRequestStart, updateAllChats, updateChatPopups, updateConversations,
} from '../redux-saga/redux/chat'
import { CHAT_ROUTE } from '../routes/routesPath'
import { playNotificationAudio } from '../utils/common'

const fetchAndAddChatData = ({ conversationId }) => {
  store.dispatch(chatDataRequestStart({
    requestType: 'FETCH',
    dataType: 'current-chat',
    conversationId,
    updateAllChat: true,
  }))
}

const addMessagesInChatReducers = ({ messages, conversationId, fromSelf }) => {
  messages.forEach((message) => {
    store.dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'new-message',
      conversationId,
      newMessage: message,
      fromSelf,
    }))
  })

  if (!fromSelf && window.location.pathname === CHAT_ROUTE) {
    const lastMessage = messages && messages[ messages?.length - 1 ]

    store.dispatch(updateAllChats({
      dataType: 'new-message',
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
    requestType: 'ADD',
    conversationId,
  }))
}

const chatNewGroupHandler = ({ payload, fromSelf, conversationId }) => {
  store.dispatch(updateConversations({
    requestType: 'CREATE',
    dataType: 'add-conversation',
    newChat: payload?.newConversation?.newChat,
  }))

  if (window.location.pathname === CHAT_ROUTE) {
    store.dispatch(updateAllChats({
      dataType: 'new-group',
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
      requestType: 'UPDATE',
      dataType: 'remove-person',
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
          dataType: 'leave-group',
          conversationId,
          newGroupName: _.isEmpty(conversationData.groupName) && groupName,
        }))
      } else if (_.isEmpty(conversationData.groupName)) {
        store.dispatch(updateAllChats({
          dataType: 'change-group-name',
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
      requestType: 'UPDATE',
      dataType: 'add-people',
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

      if (isUserBelongsToGroup) {
        store.dispatch(updateAllChats({
          dataType: 'add-people',
          conversationId,
          newGroupName: _.isEmpty(conversationData.groupName) && groupName,
        }))
      } else if (_.isEmpty(conversationData.groupName)) {
        store.dispatch(updateAllChats({
          dataType: 'change-group-name',
          conversationId,
          newGroupName: groupName,
        }))
      }
    }
  } else {
    fetchAndAddChatData({ conversationId })
  }
}

const chatChangeGroupNameHandler = ({ payload, conversationData, conversationId }) => {
  if (conversationData) {
    store.dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'change-group-name',
      conversationId,
      newGroupName: payload.newGroupName,
    }))

    if (window.location.pathname === CHAT_ROUTE) {
      store.dispatch(updateAllChats({
        dataType: 'change-group-name',
        conversationId,
        newGroupName: payload.newGroupName,
      }))
    }
  } else {
    fetchAndAddChatData({ conversationId })
  }
}

const getConversationIdFromRoomId = (roomId) => parseInt(roomId?.replace('c-', ''), 10)

const receiveMessageCasesHandler = ({
  dataType, payload, conversationData, conversationId, fromSelf,
}) => {
  switch (dataType) {
    case 'new-group': {
      chatNewGroupHandler({ payload, fromSelf, conversationId })
      break
    }

    case 'remove-person': {
      chatRemovePersonHandler({ payload, conversationData, conversationId })
      break
    }

    case 'add-people': {
      chatAddPeopleHandler({ payload, conversationData, conversationId })
      break
    }

    case 'change-group-name': {
      chatChangeGroupNameHandler({ payload, conversationData, conversationId })
      break
    }

    case 'new-message': {
      if (!conversationData) {
        fetchAndAddChatData({ conversationId })
      }
      break
    }

    default:
  }
}

// eslint-disable-next-line import/prefer-default-export
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
