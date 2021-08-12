export const updateChatPopupsHelper = ({ chatPopups, payload }) => {
  switch (payload.dataType) {
    case 'ADD': {
      return [
        payload.chatPopup,
        ...chatPopups,
      ]
    }

    case 'DELETE': {
      return [
        ...chatPopups.filter((chatPopup) => chatPopup.conversationId !== payload.conversationId),
      ]
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
