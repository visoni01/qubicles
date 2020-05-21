'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClient = sequelize.define('XClient', {

    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    client_name: DataTypes.TEXT,
    client_username: DataTypes.TEXT,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zip: DataTypes.TEXT,
    phone_number: DataTypes.TEXT,
    email: DataTypes.TEXT,
    website: DataTypes.TEXT,
    active: DataTypes.INTEGER,
    registration_date: DataTypes.DATE,
    source: DataTypes.TEXT,
    intended_use: DataTypes.TEXT,
    interactions_per_month: DataTypes.TEXT,
    rate: DataTypes.DECIMAL,
    flow_rate: DataTypes.DECIMAL,
    webphone_rate: DataTypes.DECIMAL,
    gmt_offset_now: DataTypes.DECIMAL,
    client_ein: DataTypes.STRING
  },
    {
      tableName: 'x_clients',
      timestamps: false
    })
  XClient.associate = function (models) {
  }
  return XClient
}
