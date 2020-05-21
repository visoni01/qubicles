'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClientServer = sequelize.define('XClientServer', {
    client_server_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    server_ip: DataTypes.TEXT,
    client_id: DataTypes.INTEGER
  },
  {
    tableName: 'x_client_servers'
  })
  XClientServer.associate = function (models) {
  }
  return XClientServer
}
