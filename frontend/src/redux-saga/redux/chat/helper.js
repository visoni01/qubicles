/* eslint-disable complexity */
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
  const { conversationId, requestType, dataType } = payload

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
                data: payload.conversationData,
              },
            ]
          }

          return conversations && conversations.map((item) => (item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              ...result,
              data: payload.conversationData,
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

        case 'add-people': {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  candidatesInfo: [
                    ...item.data.candidatesInfo,
                    ...payload.newMembers,
                  ],
                },
              }
              : item
          ))
        }

        case 'remove-person': {
          return conversations && conversations.map((item) => (
            item.data && item.data.conversationId === conversationId
              ? {
                ...item,
                ...result,
                data: {
                  ...item.data,
                  candidatesInfo: item.data.candidatesInfo.filter((person) => person.id !== payload.removedPersonId),
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

export const updateChatPopupsHelper = ({ chatPopupIds, payload }) => {
  const { requestType, conversationId } = payload

  switch (requestType) {
    case 'DELETE': return chatPopupIds && chatPopupIds.filter((item) => item !== conversationId)

    case 'ADD': {
      return [
        conversationId,
        ...chatPopupIds.filter((item) => item !== conversationId),
      ]
    }

    default: return chatPopupIds
  }
}

export const updateConversationsHelper = ({ payload, conversations }) => {
  const {
    requestType, conversationId, newMessage, dataType,
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
                chatData: {
                  ...item.data.chatData,
                  chats: [
                    ...item.data.chatData.chats,
                    newMessage,
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

        default: return conversations
      }
    }

    case 'CREATE': {
      switch (payload.dataType) {
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
      return conversations.filter((item) => item.data.conversationId !== payload.conversationId)
    }

    default: return conversations
  }
}

export const updateAllChatsReducer = ({ payload, chatsList }) => {
  switch (payload.dataType) {
    case 'chats-list': {
      return payload.offset === 0
        ? payload.chats
        : [
          ...chatsList,
          ...payload.chats,
        ]
    }

    case 'new-group': {
      return [ payload.newChat, ...chatsList ]
    }

    case 'new-chat': {
      return payload.newChat ? [ payload.newChat, ...chatsList ] : chatsList
    }

    case 'mark-as-unread': {
      return chatsList.map((chat) => {
        if (payload.conversationId === chat.id) {
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
        if (payload.conversationId === chat.id) {
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
        if (chat.id === payload.conversationId) {
          latestChat = chat
          return false
        }
        return true
      })

      return [
        {
          ...latestChat,
          dateTime: payload.dateTime,
          latestMessage: payload.latestMessage,
        },
        ...filteredChatsList,
      ]
    }

    case 'change-group-name': {
      return chatsList.map((chat) => {
        if (payload.conversationId === chat.id) {
          return {
            ...chat,
            name: payload.newGroupName,
          }
        }
        return chat
      })
    }

    case 'leave-group': {
      return chatsList.map((chat) => {
        if (payload.conversationId === chat.id) {
          return {
            ...chat,
            name: payload.newGroupName || chat.name,
            latestMessage: payload.newMessage,
            dateTime: Date.now(),
            allRead: true,
            isRemoved: true,
            isNotification: true,
          }
        }
        return chat
      })
    }

    default: return chatsList
  }
}

export const resetConversationsHelper = ({ conversations, chatPopupIds }) => (
  conversations.filter((item) => chatPopupIds.includes(item.data.conversationId))
)
