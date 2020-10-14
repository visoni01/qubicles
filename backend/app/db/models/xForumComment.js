'use strict'
module.exports = (sequelize, DataTypes) => {
  const XForumComment = sequelize.define('XForumComment', {
    comment_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      field: 'created_on',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_on',
      type: DataTypes.DATE
    }
  },
  {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'x_forum_comments',
    timestamps: true
  })
  XForumComment.associate = function (models) {
  }
  return XForumComment
}
