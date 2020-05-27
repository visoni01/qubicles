'use strict'
module.exports = (sequelize, DataTypes) => {
  const XClient = sequelize.define('XClient', {

    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    client_username: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    minutes_overflow: {
      type: DataTypes.INTEGER,
      defaultValue: 200
    },
    registration_date: DataTypes.DATE,
    source: DataTypes.STRING,
    intended_use: DataTypes.STRING,
    interactions_per_month: DataTypes.STRING,
    rate: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.002
    },
    flow_rate: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.005
    },
    webphone_rate: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.005
    },
    gmt_offset_now: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: -5.00
    },
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
