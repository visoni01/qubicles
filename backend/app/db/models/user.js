'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    facebookId: {
      type: DataTypes.STRING,
      unique: true
    },
    twitterId: {
      type: DataTypes.STRING,
      unique: true
    },
    linkedInId: {
      type: DataTypes.STRING,
      unique: true
    },
    user: {
      type: DataTypes.STRING
    },
    pass: DataTypes.TEXT,
    full_name: DataTypes.TEXT,
    user_level: DataTypes.INTEGER,
    user_group: DataTypes.TEXT,
    phone_login: DataTypes.TEXT,
    phone_pass: DataTypes.TEXT,
    delete_users: DataTypes.TEXT,
    delete_user_groups: DataTypes.TEXT,
    delete_lists: DataTypes.TEXT,
    delete_campaigns: DataTypes.TEXT,
    delete_ingroups: DataTypes.TEXT,
    delete_remote_agents: DataTypes.TEXT,
    load_leads: DataTypes.TEXT,
    campaign_detail: DataTypes.TEXT,
    ast_admin_access: DataTypes.TEXT,
    ast_delete_phones: DataTypes.TEXT,
    delete_scripts: DataTypes.TEXT,
    modify_leads: DataTypes.TEXT,
    hotkeys_active: DataTypes.TEXT,
    change_agent_campaign: DataTypes.TEXT,
    agent_choose_ingroups: DataTypes.TEXT,
    closer_campaigns: DataTypes.TEXT,
    scheduled_callbacks: DataTypes.TEXT,
    agentonly_callbacks: DataTypes.TEXT,
    agentcall_manual: DataTypes.TEXT,
    vicidial_recording: DataTypes.TEXT,
    vicidial_transfers: DataTypes.TEXT,
    delete_filters: DataTypes.TEXT,
    alter_agent_interface_options: DataTypes.TEXT,
    closer_default_blended: DataTypes.TEXT,
    delete_call_times: DataTypes.TEXT,
    modify_call_times: DataTypes.TEXT,
    modify_users: DataTypes.TEXT,
    modify_campaigns: DataTypes.TEXT,
    modify_lists: DataTypes.TEXT,
    modify_scripts: DataTypes.TEXT,
    modify_filters: DataTypes.TEXT,
    modify_ingroups: DataTypes.TEXT,
    modify_usergroups: DataTypes.TEXT,
    modify_remoteagents: DataTypes.TEXT,
    modify_servers: DataTypes.TEXT,
    view_reports: DataTypes.TEXT,
    vicidial_recording_override: DataTypes.TEXT,
    alter_custdata_override: DataTypes.TEXT,
    qc_enabled: DataTypes.TEXT,
    qc_user_level: DataTypes.INTEGER,
    qc_pass: DataTypes.TEXT,
    qc_finish: DataTypes.TEXT,
    qc_commit: DataTypes.TEXT,
    add_timeclock_log: DataTypes.TEXT,
    modify_timeclock_log: DataTypes.TEXT,
    delete_timeclock_log: DataTypes.TEXT,
    alter_custphone_override: DataTypes.TEXT,
    vdc_agent_api_access: DataTypes.TEXT,
    modify_inbound_dids: DataTypes.TEXT,
    delete_inbound_dids: DataTypes.TEXT,
    active: DataTypes.TEXT,
    alert_enabled: DataTypes.TEXT,
    download_lists: DataTypes.TEXT,
    agent_shift_enforcement_override: DataTypes.TEXT,
    manager_shift_enforcement_override: DataTypes.TEXT,
    shift_override_flag: DataTypes.TEXT,
    export_reports: DataTypes.TEXT,
    delete_from_dnc: DataTypes.TEXT,
    email: DataTypes.TEXT,
    user_code: DataTypes.TEXT,
    territory: DataTypes.TEXT,
    allow_alerts: DataTypes.TEXT,
    agent_choose_territories: DataTypes.TEXT,
    custom_one: DataTypes.TEXT,
    custom_two: DataTypes.TEXT,
    custom_three: DataTypes.TEXT,
    custom_four: DataTypes.TEXT,
    custom_five: DataTypes.TEXT,
    voicemail_id: DataTypes.TEXT,
    agent_call_log_view_override: DataTypes.TEXT,
    callcard_admin: DataTypes.TEXT,
    agent_choose_blended: DataTypes.TEXT,
    realtime_block_user_info: DataTypes.TEXT,
    custom_fields_modify: DataTypes.TEXT,
    force_change_password: DataTypes.TEXT,
    agent_lead_search_override: DataTypes.TEXT,
    agentcall_email: DataTypes.TEXT,
    modify_email_accounts: DataTypes.TEXT
  }, { tableName: 'x_users' })

  // User.sync({force: true}).then(() => {
  //   return User.create({
  //     firstName: 'John',
  //     lastName: 'Hancock'
  //   });
  // });

  User.associate = function (models) {
  }
  return User
}
