'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodChatMessageRead = sequelize.define('XQodChatMessageRead', {
    message_read_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    message_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_read: DataTypes.BOOLEAN
  },
  {
    tableName: 'x_qod_chat_message_read'
  })
  XQodChatMessageRead.associate = function (models) {
  }
  return XQodChatMessageRead
}
