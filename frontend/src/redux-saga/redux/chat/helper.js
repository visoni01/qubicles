import _ from 'lodash'
import { REQUEST_TYPES } from '../../../utils/constants'
import {
  ADD_CONVERSATION, ADD_PEOPLE, ADD_TYPING_USER, CANCEL_MESSAGE, CHANGE_CURRENT_MESSAGE, CHANGE_GROUP_NAME, CHATS_LIST,
  CHAT_MESSAGES, CURRENT_CHAT, DELETE_CHAT, LEAVE_GROUP, MARK_AS_READ, MARK_AS_UNREAD, NEW_CHAT, NEW_GROUP, NEW_MESSAGE,
  REMOVE_MESSAGE, REMOVE_PERSON, REMOVE_TYPING_USER, RETRY_MESSAGE, UPDATE_ERROR_FLAG,
} from '../constants'

const handleSendMessageFromSelf = ({ chats, newMessage }) => {
  if (_.isEqual(newMessage.error, false) && chats) {
    const messageToBeChanged = chats.find((message) => message.messageId === newMessage.messageId)

    if (messageToBeChanged) {
      const newChats = chats.filter((message) => message.messageId !== newMessage.messageId)
      return [
        ...newChats,
        {
          ...messageToBeChanged,
          messageId: newMessage.newMessageId,
          error: newMessage.error,
        },
      ]
    }
  }

  return chats.map((message) => (
    message.messageId === newMessage.messageId
      ? {
        ...message,
        messageId: newMessage.newMessageId,
        error: newMessage.error,
      }
      : message
  ))
}

/* eslint-disable complexity */
export const updateConversationsHelper = ({ payload, conversations, result = {} }) => {
  const {
    requestType, conversationId, newMessage, dataType, isImageUploading, messageToBeSent, messageId, newActiveUser,
    removedUserId, fromSelf,
  } = payload

  switch (requestType) {
    case REQUEST_TYPES.UPDATE: {
      switch (dataType) {
        case NEW_MESSAGE: return conversations && conversations.map((item) => (
          item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              data: {
                ...item.data,
                allRead: _.isEqual(fromSelf, false) ? false : item.data.allRead,
                chatData: {
                  ...item.data.chatData,
                  chats: fromSelf
                    ? handleSendMessageFromSelf({ chats: item.data.chatData.chats, newMessage })
                    : [
                      ...item.data.chatData.chats,
                      {
                        ...newMessage,
                        messageId: newMessage.newMessageId || newMessage.messageId,
                      },
                    ],
                },
              },
            }
            : item
        ))

        case MARK_AS_UNREAD: return conversations && conversations.map((item) => (
          item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              data: {
                ...item.data,
                allRead: false,
              },
            }
            : item
        ))

        case REMOVE_PERSON: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  isRemoved: fromSelf ? true : item.data.isRemoved,
                  candidatesInfo: item.data.candidatesInfo.filter((person) => person.id !== payload.removedPersonId),
                },
              }
              : item
          ))
        }

        case ADD_PEOPLE: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  isRemoved: fromSelf ? false : item.data.isRemoved,
                  candidatesInfo: [
                    ...item.data.candidatesInfo,
                    ...payload.newMembers,
                  ],
                },
              }
              : item
          ))
        }

        case CHANGE_GROUP_NAME: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  groupName: payload.newGroupName,
                },
              }
              : item
          ))
        }

        case CHANGE_CURRENT_MESSAGE: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  isImageUploading,
                  messageToBeSent: messageToBeSent || null,
                },
              }
              : item
          ))
        }

        case UPDATE_ERROR_FLAG: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  chatData: {
                    ...item.data.chatData,
                    chats: item.data.chatData.chats?.map((message) => {
                      if (_.isEqual(message.messageId, messageId)) {
                        return {
                          ...message,
                          error: payload.error,
                          sentAt: payload.sentAt || message.sentAt,
                        }
                      }
                      return message
                    }),
                  },
                },
              }
              : item
          ))
        }

        case REMOVE_MESSAGE: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  chatData: {
                    ...item.data.chatData,
                    chats: item.data.chatData.chats?.filter((message) => message.messageId !== messageId),
                  },
                },
              }
              : item
          ))
        }

        case ADD_TYPING_USER: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  activeUsers: item.data.activeUsers
                    ? [
                      ...item.data.activeUsers,
                      newActiveUser,
                    ]
                    : [ newActiveUser ],
                },
              }
              : item
          ))
        }

        case REMOVE_TYPING_USER: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  activeUsers: item.data.activeUsers?.filter((user) => user.id !== removedUserId),
                },
              }
              : item
          ))
        }

        default: return conversations
      }
    }

    case REQUEST_TYPES.CREATE: {
      switch (dataType) {
        case ADD_CONVERSATION: {
          const currentConversation = conversations
            && conversations.find((item) => item.data && item.data.conversationId === conversationId)

          return currentConversation
            ? conversations
            : [
              ...conversations,
              {
                isLoading: false,
                success: true,
                error: false,
                dataType: '',
                requestType: '',
                data: payload.newChat,
              },
            ]
        }

        default: return conversations
      }
    }

    case REQUEST_TYPES.DELETE: {
      return conversations.filter((item) => item.data.conversationId !== conversationId)
    }

    default: return conversations
  }
}

export const chatDataStartHelper = ({ conversations, payload }) => {
  const { conversationId, requestType, dataType } = payload
  const currentChatPopup = conversations
    && conversations.find((item) => item.data && item.data.conversationId === conversationId)

  const result = {
    isLoading: true,
    success: null,
    error: null,
    requestType,
    dataType,
  }

  if (!currentChatPopup) {
    return [
      ...conversations,
      {
        ...result,
        data: {
          conversationId,
        },
      },
    ]
  }

  return conversations && conversations.map((item) => (item.data && item.data.conversationId === conversationId
    ? {
      ...item,
      ...result,
    }
    : item))
}

export const chatDataSuccessHelper = ({ conversations, payload }) => {
  const {
    conversationId, requestType, dataType, conversationData,
  } = payload

  const result = {
    isLoading: false,
    success: true,
    error: false,
  }

  switch (requestType) {
    case REQUEST_TYPES.FETCH: {
      switch (dataType) {
        case CURRENT_CHAT: {
          const currentConversation = conversations
            && conversations.find((item) => item.data && item.data.conversationId === conversationId)

          if (!currentConversation) {
            return [
              ...conversations,
              {
                ...result,
                requestType,
                dataType,
                data: conversationData,
              },
            ]
          }

          return conversations && conversations.map((item) => (item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              ...result,
              data: conversationData,
            }
            : item))
        }

        case CHAT_MESSAGES: {
          return conversations && conversations.map((item) => (item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              ...result,
              data: {
                ...item.data,
                chatData: {
                  chats: [
                    ...payload.olderMessages,
                    ...item.data.chatData.chats,
                  ],
                  more: payload.more,
                  offset: payload.offset,
                },
              },
            }
            : item))
        }

        default: return conversations
      }
    }

    case REQUEST_TYPES.UPDATE: {
      switch (dataType) {
        case ADD_PEOPLE:
        case REMOVE_PERSON:
        case CHANGE_GROUP_NAME: {
          const updatedConversations = conversations?.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                data: {
                  ...item.data,
                  allRead: true,
                  chatData: {
                    ...item.data.chatData,
                    chats: item.data.chatData.chats?.map((message) => ({
                      ...message,
                      isRead: true,
                    })),
                  },
                },
              }
              : item
          ))
          return updateConversationsHelper({ payload, conversations: updatedConversations, result })
        }

        case MARK_AS_READ: return conversations && conversations.map((item) => (
          item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              ...result,
              data: {
                ...item.data,
                allRead: true,
                chatData: {
                  chats: item.data.chatData.chats.map((chat) => ({
                    ...chat,
                    isRead: true,
                  })),
                  more: item.data.chatData.more,
                  offset: item.data.chatData.offset,
                },
              },
            }
            : item
        ))

        case LEAVE_GROUP: {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  allRead: true,
                  isRemoved: true,
                  candidatesInfo: item.data.candidatesInfo.filter((user) => user.id !== payload.userId),
                  chatData: {
                    ...item.data.chatData,
                    chats: [
                      ...item.data.chatData.chats?.map((message) => ({
                        ...message,
                        isRead: true,
                      })),
                      payload.newMessage,
                    ],
                  },
                },
              }
              : item
          ))
        }

        case DELETE_CHAT: {
          return conversations && conversations.map((item) => {
            if (item.data && item.data.conversationId === conversationId) {
              const latestDeletedMessageIndex = item?.data?.chatData?.chats
              && _.findLastIndex(item.data.chatData.chats, { messageId: payload.latestDeletedMessageId })

              return {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  chatData: {
                    ...item.data.chatData,
                    chats: item.data.chatData.chats.slice(latestDeletedMessageIndex + 1),
                  },
                },
              }
            }
            return item
          })
        }

        default: return conversations
      }
    }

    default: return conversations
  }
}

export const chatDataFailureHelper = ({ conversations, payload }) => {
  const { conversationId } = payload

  return conversations && conversations.map((item) => (item.data && item.data.conversationId === conversationId
    ? {
      ...item,
      isLoading: false,
      error: true,
      success: false,
    }
    : item))
}

export const updateChatPopupsHelper = ({ chatPopups, payload, maxCount }) => {
  const { requestType, conversationId, noNotification } = payload

  switch (requestType) {
    case REQUEST_TYPES.DELETE: return chatPopups && chatPopups.filter((item) => item.conversationId !== conversationId)

    case REQUEST_TYPES.ADD: {
      const popupIndex = chatPopups && chatPopups.findIndex((item) => item.conversationId === conversationId)
      if (popupIndex === -1 || popupIndex >= maxCount) {
        return [
          { conversationId, newNotification: !noNotification, isMaximized: true },
          ...chatPopups.filter((item) => item.conversationId !== conversationId),
        ]
      }
      return chatPopups.map((item) => (
        item.conversationId === conversationId ? {
          ...item,
          newNotification: true,
        } : item
      ))
    }

    default: return chatPopups
  }
}

export const updateAllChatsReducer = ({ payload, chatsList }) => {
  const {
    dataType, chats, offset, newChat, conversationId, latestMessage, dateTime, isImage, fromSelf, newGroupName,
    isNotification, error, isRemoved, allRead,
  } = payload

  switch (dataType) {
    case CHATS_LIST: {
      return offset === 0
        ? chats
        : [
          ...chatsList,
          ...chats,
        ]
    }

    case NEW_GROUP: {
      return [ newChat, ...chatsList ]
    }

    case NEW_CHAT: {
      return newChat
        ? [ newChat,
          ...chatsList.filter((item) => item.id !== payload.newChat.id) ]
        : chatsList
    }

    case NEW_MESSAGE:
    case ADD_PEOPLE:
    case LEAVE_GROUP:
    case REMOVE_PERSON:
    case RETRY_MESSAGE:
    case CHANGE_GROUP_NAME: {
      let latestChat
      let newAllRead

      const filteredChatsList = chatsList.filter((chat) => {
        if (chat.id === conversationId) {
          latestChat = chat
          return false
        }
        return true
      })

      if (fromSelf === false) {
        newAllRead = false
      } else if (!_.isUndefined(allRead)) {
        newAllRead = allRead
      } else {
        newAllRead = latestChat.allRead
      }

      return latestChat ? [
        {
          ...latestChat,
          name: newGroupName || latestChat.name,
          latestMessage: _.isUndefined(latestMessage) ? latestChat.latestMessage : latestMessage,
          isRemoved: _.isUndefined(isRemoved) ? latestChat.isRemoved : isRemoved,
          allRead: newAllRead,
          isImage: _.isUndefined(isImage) ? latestChat.isImage : isImage,
          isNotification: _.isUndefined(isNotification) ? latestChat.isNotification : isNotification,
          dateTime: _.isUndefined(dateTime) ? latestChat.dateTime : dateTime,
          error: _.isUndefined(error) ? latestChat.error : error,
        },
        ...filteredChatsList,
      ] : chatsList
    }

    case MARK_AS_UNREAD:
    case MARK_AS_READ:
    case DELETE_CHAT:
    case CANCEL_MESSAGE:
    case UPDATE_ERROR_FLAG: {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            name: newGroupName || chat.name,
            latestMessage: _.isUndefined(latestMessage) ? chat.latestMessage : latestMessage,
            isRemoved: _.isUndefined(isRemoved) ? chat.isRemoved : isRemoved,
            allRead: _.isUndefined(allRead) ? chat.allRead : allRead,
            isImage: _.isUndefined(isImage) ? chat.isImage : isImage,
            isNotification: _.isUndefined(isNotification) ? chat.isNotification : isNotification,
            dateTime: _.isUndefined(dateTime) ? chat.dateTime : dateTime,
            error: _.isUndefined(error) ? chat.error : error,
          }
          : chat
      ))
    }

    default: return chatsList
  }
}

export const resetConversationsHelper = ({ conversations, chatPopups }) => (
  conversations.filter((item) => chatPopups.find((popup) => item.data.conversationId === popup.conversationId))
)

export const resetPopupFlagsHelper = ({ chatPopups, conversationId }) => (
  chatPopups.map((item) => (
    item.conversationId === conversationId ? {
      ...item,
      newNotification: false,
    } : item
  ))
)

export const changePopupOpenStateHelper = ({ chatPopups, conversationId }) => (
  chatPopups.map((item) => (
    item.conversationId === conversationId ? {
      ...item,
      isMaximized: !item.isMaximized,
    } : item
  ))
)
