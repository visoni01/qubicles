'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClientUser = sequelize.define('XClientUser', {
    client_user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'x_client_users',
    timestamps: false
  })
  XClientUser.associate = function (models) {
  }
  return XClientUser
}
