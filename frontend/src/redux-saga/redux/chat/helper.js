export const chatPopupsStartHelper = ({ chatPopups, payload }) => {
  const { conversationId, requestType, dataType } = payload
  const currentChatPopup = chatPopups
    && chatPopups.find((item) => item.data && item.data.conversationId === conversationId)

  const result = {
    isLoading: true,
    success: null,
    error: null,
    requestType,
    dataType,
  }

  if (!currentChatPopup) {
    return [
      ...chatPopups,
      {
        ...result,
        data: {
          conversationId,
        },
      },
    ]
  }

  return chatPopups && chatPopups.map((item) => (item.data && item.data.conversationId === conversationId
    ? {
      ...item,
      ...result,
    }
    : item))
}

export const chatPopupsSuccessHelper = ({ chatPopups, payload }) => {
  const {
    conversationId, data, requestType, dataType,
  } = payload

  const result = {
    isLoading: false,
    success: true,
    error: false,
  }

  switch (requestType) {
    case 'ADD': return chatPopups && chatPopups.map((item) => (item.data && item.data.conversationId === conversationId
      ? {
        ...item,
        ...result,
        data: {
          ...item.data,
          ...data,
        },
      }
      : item))

    case 'UPDATE': {
      switch (dataType) {
        case 'mark-as-read': return chatPopups && chatPopups.map((item) => (
          item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              data: {
                ...item.data,
                chats: item.data && item.data.chats && item.data.chats.map((chat) => ({
                  ...chat,
                  isRead: true,
                })),
              },
            }
            : item
        ))

        default: return chatPopups
      }
    }

    default: return chatPopups
  }
}

export const chatPopupsFailureHelper = ({ chatPopups, payload }) => {
  const { conversationId } = payload

  return chatPopups && chatPopups.map((item) => (item.data && item.data.conversationId === conversationId
    ? {
      ...item,
      isLoading: false,
      error: true,
      success: false,
    }
    : item))
}

export const updateChatPopupsHelper = ({ chatPopups, payload }) => {
  const {
    requestType, conversationId, newMessage, dataType,
  } = payload

  switch (requestType) {
    case 'DELETE': return chatPopups && chatPopups.filter((item) => item.data
      && item.data.conversationId !== conversationId)

    case 'UPDATE': {
      switch (dataType) {
        case 'new-message': return chatPopups && chatPopups.map((item) => (
          item.data && item.data.conversationId === conversationId
            ? {
              ...item,
              data: {
                ...item.data,
                chats: [
                  ...item.data.chats,
                  newMessage,
                ],
              },
            }
            : item
        ))

        default: return chatPopups
      }
    }

    default: return chatPopups
  }
}

export const updateCurrentChatReducer = ({ payload, chat }) => {
  switch (payload.dataType) {
    case 'open-chat': {
      return payload.currentChat
    }

    case 'new-message': {
      return {
        ...chat,
        data: [
          ...chat.data,
          payload.newMessage,
        ],
      }
    }

    case 'current-chat': {
      return payload.chat
    }

    case 'add-people': {
      return {
        ...chat,
        candidatesInfo: [
          ...chat.candidatesInfo,
          ...payload.newMembers,
        ],
      }
    }

    case 'remove-person': {
      return {
        ...chat,
        candidatesInfo: chat.candidatesInfo.filter((person) => person.id !== payload.removedPersonId),
      }
    }

    case 'mark-as-read': {
      return {
        ...chat,
        data: chat.data.map((item) => ({
          ...item,
          isRead: true,
        })),
      }
    }

    default: return chat
  }
}

export const updateAllChatsReducer = ({ payload, chatsList }) => {
  switch (payload.dataType) {
    case 'chats-list': {
      return payload.chats
    }

    case 'new-group': {
      return [ payload.newChat, ...chatsList ]
    }

    case 'new-chat': {
      return [ payload.newChat, ...chatsList ]
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

    default: return chatsList
  }
}
