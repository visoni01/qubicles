'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClientUser = sequelize.define('XClientUser', {
    client_user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    client_id: DataTypes.STRING
  },
  {
    tableName: 'x_client_users'
  })
  XClientUser.associate = function (models) {
  }
  return XClientUser
}
