'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClient = sequelize.define('XClient', {
    client_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    client_name: DataTypes.STRING,
    client_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    client_ein: DataTypes.STRING
  },
  {
    tableName: 'x_clients'
  })
  XClient.associate = function (models) {
  }
  return XClient
}
