'use strict'
module.exports = (sequelize, DataTypes) => {
  const XUserActivity = sequelize.define('XUserActivity', {
    user_activity_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER(9),
    record_type: {
      type: DataTypes.ENUM,
      values: ['client', 'user', 'topic', 'activity']
    },
    record_id: {
      type: DataTypes.INTEGER(11)
    },
    activity_type: {
      type: DataTypes.ENUM,
      values: ['like', 'subscribe', 'connection', 'rating', 'status', 'comment']
    },
    activity_value: DataTypes.STRING,
    activity_custom: DataTypes.STRING,
    activity_permission: {
      type: DataTypes.ENUM,
      values: ['public', 'followers', 'company', 'admins', 'managers'],
      defaultValue: 'public'
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
    tableName: 'x_user_activities',
    timestamps: false
  })
  XUserActivity.associate = function (models) {
  }
  return XUserActivity
}
