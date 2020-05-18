'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    user_group: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    group_name: DataTypes.TEXT,
    allowed_campaigns: DataTypes.TEXT,
    qc_allowed_campaigns: DataTypes.TEXT,
    qc_allowed_inbound_groups: DataTypes.TEXT,
    group_shifts: DataTypes.TEXT,
    forced_timeclock_login: DataTypes.TEXT,
    shift_enforcement: DataTypes.TEXT,
    agent_status_viewable_groups: DataTypes.TEXT,
    agent_status_view_time: DataTypes.TEXT,
    agent_call_log_view: DataTypes.TEXT,
    agent_xfer_consultative: DataTypes.TEXT,
    agent_xfer_dial_override: DataTypes.TEXT,
    agent_xfer_vm_transfer: DataTypes.TEXT,
    agent_xfer_blind_transfer: DataTypes.TEXT,
    agent_xfer_dial_with_customer: DataTypes.TEXT,
    agent_xfer_park_customer_dial: DataTypes.TEXT,
    agent_fullscreen: DataTypes.TEXT,
    allowed_reports: DataTypes.TEXT,
    webphone_url_override: DataTypes.TEXT,
    webphone_systemkey_override: DataTypes.TEXT,
    webphone_dialpad_override: DataTypes.TEXT,
    allow_livechat: DataTypes.TEXT
  },
  {
    tableName: 'x_user_groups'
  })
  UserGroup.associate = function (models) {
  }
  return UserGroup
}
