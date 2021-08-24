'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodChatAllRead = sequelize.define('XQodChatAllRead', {
    conversation_all_read_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    conversation_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    all_read: DataTypes.BOOLEAN
  },
  {
    tableName: 'x_qod_chat_group_members'
  })
  XQodChatAllRead.associate = function (models) {
  }
  return XQodChatAllRead
}
