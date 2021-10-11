import _ from 'lodash'

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
    requestType, conversationId, newMessage, dataType, isImageUploading, messageToBeSent, messageId, fromSelf,
  } = payload

  switch (requestType) {
    case 'UPDATE': {
      switch (dataType) {
        case 'new-message': return conversations && conversations.map((item) => (
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

        case 'mark-as-unread': return conversations && conversations.map((item) => (
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

        case 'remove-person': {
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

        case 'add-people': {
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

        case 'change-group-name': {
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

        case 'change-current-message': {
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

        case 'update-error-flag': {
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

        case 'remove-message': {
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

        default: return conversations
      }
    }

    case 'CREATE': {
      switch (dataType) {
        case 'add-conversation': {
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

    case 'DELETE': {
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
    case 'FETCH': {
      switch (dataType) {
        case 'current-chat': {
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

        case 'chat-messages': {
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

    case 'UPDATE': {
      switch (dataType) {
        case 'add-people':
        case 'remove-person':
        case 'change-group-name':
          return updateConversationsHelper({ payload, conversations, result })

        case 'mark-as-read': return conversations && conversations.map((item) => (
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

        case 'leave-group': {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  isRemoved: true,
                  candidatesInfo: item.data.candidatesInfo.filter((user) => user.id !== payload.userId),
                  chatData: {
                    ...item.data.chatData,
                    chats: [
                      ...item.data.chatData.chats,
                      payload.newMessage,
                    ],
                  },
                },
              }
              : item
          ))
        }

        case 'delete-chat': {
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
  const { requestType, conversationId } = payload

  switch (requestType) {
    case 'DELETE': return chatPopups && chatPopups.filter((item) => item.conversationId !== conversationId)

    case 'ADD': {
      const popupIndex = chatPopups && chatPopups.findIndex((item) => item.conversationId === conversationId)
      if (popupIndex === -1 || popupIndex >= maxCount) {
        return [
          { conversationId, newNotification: true, isMaximized: true },
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
    isNotification, newMessage, error,
  } = payload

  switch (dataType) {
    case 'chats-list': {
      return offset === 0
        ? chats
        : [
          ...chatsList,
          ...chats,
        ]
    }

    case 'new-group': {
      return [ newChat, ...chatsList ]
    }

    case 'new-chat': {
      return payload.newChat ? [
        payload.newChat,
        ...chatsList.filter((item) => item.id !== payload.newChat.id),
      ] : chatsList
    }

    case 'mark-as-unread': {
      return chatsList.map((chat) => {
        if (conversationId === chat.id) {
          return {
            ...chat,
            allRead: false,
          }
        }
        return chat
      })
    }

    case 'mark-as-read': {
      return chatsList.map((chat) => {
        if (conversationId === chat.id) {
          return {
            ...chat,
            allRead: true,
          }
        }
        return chat
      })
    }

    case 'new-message': {
      let latestChat

      const filteredChatsList = chatsList.filter((chat) => {
        if (chat.id === conversationId) {
          latestChat = chat
          return false
        }
        return true
      })

      return latestChat ? [
        {
          ...latestChat,
          dateTime,
          latestMessage,
          isImage,
          allRead: fromSelf === false ? false : latestChat?.allRead,
        },
        ...filteredChatsList,
      ] : chatsList
    }

    case 'change-group-name': {
      return chatsList.map((chat) => {
        if (conversationId === chat.id) {
          return {
            ...chat,
            name: newGroupName,
            latestMessage: latestMessage || chat.latestMessage,
            isNotification: isNotification || chat.isNotification,
          }
        }
        return chat
      })
    }

    case 'leave-group': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            name: newGroupName || chat.name,
            latestMessage: newMessage || chat.latestMessage,
            dateTime: Date.now(),
            allRead: true,
            isRemoved: true,
            isNotification: true,
          }
          : chat
      ))
    }

    case 'delete-chat': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            latestMessage: '',
            allRead: true,
            isImage: false,
            isNotification: false,
          }
          : chat
      ))
    }

    case 'add-people': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            name: newGroupName || chat.name,
            latestMessage: latestMessage || chat.latestMessage,
            isRemoved: false,
            allRead: false,
            isImage: false,
            isNotification: true,
          }
          : chat
      ))
    }

    case 'cancel-message': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            latestMessage,
            isImage,
            isNotification,
            dateTime,
            error,
          }
          : chat
      ))
    }

    case 'retry-message': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            latestMessage,
            isImage,
            isNotification,
            dateTime,
          }
          : chat
      ))
    }

    case 'update-error-flag': {
      return chatsList.map((chat) => (
        conversationId === chat.id
          ? {
            ...chat,
            error,
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
