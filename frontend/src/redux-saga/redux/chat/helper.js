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

export const updateChatReducer = () => {

}
