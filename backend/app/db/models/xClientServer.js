'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClientServer = sequelize.define('XClientServer', {
    client_server_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    server_ip: DataTypes.STRING,
    client_id: DataTypes.INTEGER
  },
  {
    tableName: 'x_client_servers',
    timestamps: false
  })
  XClientServer.associate = function (models) {
  }
  return XClientServer
}
