'use strict'
module.exports = (sequelize, DataTypes) => {
  const LiveAgent = sequelize.define('LiveAgent', {
    live_agent_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(9).UNSIGNED
    },
    user: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(100)
    },
    server_ip: {
      allowNull: false,
      type: DataTypes.STRING(15)
    },
    conf_exten: DataTypes.STRING(20),
    extension: DataTypes.STRING(100),
    status: {
      type: DataTypes.ENUM,
      values: ['READY', 'QUEUE', 'INCALL', 'PAUSED', 'CLOSER', 'MQUEUE'],
      defaultValue: 'PAUSED'
    },
    lead_id: {
      allowNull: false,
      type: DataTypes.INTEGER(9).UNSIGNED
    },
    campaign_id: DataTypes.STRING(8),
    uniqueid: DataTypes.STRING(20),
    callerid: DataTypes.STRING(20),
    channel: DataTypes.STRING(100),
    random_id: DataTypes.INTEGER(8).UNSIGNED,
    last_call_time: DataTypes.DATE,
    last_update_time: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    last_call_finish: DataTypes.DATE,
    closer_campaigns: DataTypes.STRING(4000),
    call_server_ip: DataTypes.STRING(15),
    user_level: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0
    },
    comments: DataTypes.STRING(20),
    campaign_weight: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    calls_today: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      defaultValue: 0
    },
    external_hangup: DataTypes.STRING(1),
    external_status: DataTypes.STRING(6),
    external_pause: DataTypes.STRING(20),
    external_dial: DataTypes.STRING(100),
    external_ingroups: DataTypes.STRING(4000),
    external_blended: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    external_igb_set_user: DataTypes.STRING(100),
    external_update_fields: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    external_update_fields_data: DataTypes.STRING,
    external_timer_action: DataTypes.STRING(20),
    external_timer_action_message: DataTypes.STRING,
    external_timer_action_seconds: {
      type: DataTypes.INTEGER(7),
      defaultValue: -1
    },
    agent_log_id: {
      type: DataTypes.INTEGER(9).UNSIGNED,
      defaultValue: 0
    },
    last_state_change: DataTypes.DATE,
    agent_territories: DataTypes.STRING(25),
    outbound_autodial: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    manager_ingroup_set: {
      type: DataTypes.ENUM,
      values: ['Y', 'N', 'SET'],
      defaultValue: 'N'
    },
    ra_user: DataTypes.STRING(100),
    ra_extension: DataTypes.STRING(100),
    external_dtmf: DataTypes.STRING(100),
    external_transferconf: DataTypes.STRING(100),
    external_park: DataTypes.STRING(40),
    external_timer_action_destination: DataTypes.STRING(100),
    on_hook_agent: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    on_hook_ring_time: {
      type: DataTypes.INTEGER(15),
      defaultValue: 15
    },
    ring_callerid: DataTypes.STRING(20)
  },
  { tableName: 'x_live_agents' })
  LiveAgent.associate = function (models) {}
  return LiveAgent
}
