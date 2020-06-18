'use strict'
module.exports = (sequelize, DataTypes) => {
  const XForumChannel = sequelize.define('XForumChannel', {
    channel_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    channel_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11)
    },
    is_public: {
      type: DataTypes.BOOLEAN
    },
    is_company_ann: {
      type: DataTypes.BOOLEAN
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_forum_channels'
  })
  XForumChannel.associate = function (models) {
  }
  return XForumChannel
}
