'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClientServer = sequelize.define('XClientServer', {
    client_server_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    server_ip: DataTypes.INTEGER(11),
    client_id: DataTypes.STRING
  },
  {
    tableName: 'x_client_servers',
    timestamps: false
  })
  XClientServer.associate = function (models) {
  }
  return XClientServer
}
