'use strict'
module.exports = (sequelize, DataTypes) => {
  const XForumCategory = sequelize.define('XForumCategory', {
    category_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    category_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_public: {
      type: DataTypes.BOOLEAN
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_forum_categories'
  })
  XForumCategory.associate = function (models) {
  }
  return XForumCategory
}
