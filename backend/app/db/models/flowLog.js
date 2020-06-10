'use strict'
module.exports = (sequelize, DataTypes) => {
  const FlowLog = sequelize.define('FlowLog', {
    flow_log_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(9).UNSIGNED
    },
    client_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      defaultValue: 0
    },
    flow_id: {
      type: DataTypes.INTEGER(9).UNSIGNED,
      allowNull: false
    },
    lead_id: DataTypes.INTEGER(9).UNSIGNED,
    list_id: DataTypes.BIGINT(14).UNSIGNED,
    call_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    cost: {
      type: DataTypes.STRING(10),
      defaultValue: '$0.000'
    },
    rate: {
      type: DataTypes.STRING(10),
      defaultValue: '0.005'
    },
    uniqueid: DataTypes.STRING(20),
    user: DataTypes.STRING(100)
  },
  { tableName: 'x_flow_log' })
  FlowLog.associate = function (models) {}
  return FlowLog
}
