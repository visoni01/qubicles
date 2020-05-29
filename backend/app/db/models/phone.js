'use strict'
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    phone_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dialplan_number: DataTypes.STRING,
    voicemail_id: DataTypes.STRING,
    phone_ip: DataTypes.STRING,
    computer_ip: DataTypes.STRING,
    server_ip: DataTypes.STRING,
    login: DataTypes.STRING,
    pass: DataTypes.STRING,
    status: DataTypes.STRING,
    active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N']
    },
    phone_type: DataTypes.STRING,
    fullname: DataTypes.STRING,
    company: DataTypes.STRING,
    picture: DataTypes.STRING,
    messages: DataTypes.INTEGER,
    old_messages: DataTypes.INTEGER,
    protocol: {
      type: DataTypes.ENUM,
      values: ['SIP', 'Zap', 'IAX2', 'EXTERNAL'],
      defaultValue: 'SIP'
    },
    local_gmt: {
      type: DataTypes.STRING,
      defaultValue: '-5'
    },
    ASTmgrUSERNAME: {
      type: DataTypes.STRING,
      defaultValue: 'cron'
    },
    ASTmgrSECRET: {
      type: DataTypes.STRING,
      defaultValue: '1234'
    },
    login_user: DataTypes.STRING,
    login_pass: DataTypes.STRING,
    login_campaign: DataTypes.STRING,
    park_on_extension: {
      type: DataTypes.STRING,
      defaultValue: '8301'
    },
    conf_on_extension: {
      type: DataTypes.STRING,
      defaultValue: '8302'
    },
    VICIDIAL_park_on_extension: {
      type: DataTypes.STRING,
      defaultValue: '8301'
    },
    VICIDIAL_park_on_filename: {
      type: DataTypes.STRING,
      defaultValue: 'park'
    },
    monitor_prefix: {
      type: DataTypes.STRING,
      defaultValue: '8512'
    },
    recording_exten: {
      type: DataTypes.STRING,
      defaultValue: '8309'
    },
    voicemail_exten: {
      type: DataTypes.STRING,
      defaultValue: '8501'
    },
    voicemail_dump_exten: {
      type: DataTypes.STRING,
      defaultValue: '85026666666666'
    },
    ext_context: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    },
    dtmf_send_extension: {
      type: DataTypes.STRING,
      defaultValue: 'local/8500998@default'
    },
    call_out_number_group: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    client_browser: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    install_directory: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    local_web_callerID_URL: {
      type: DataTypes.STRING,
      defaultValue: 'http://fc2.fenero.com/test_callerid_output.php'
    },
    AGI_call_logging_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    user_switching_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    conferencing_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    admin_hangup_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    admin_hijack_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    admin_monitor_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    call_parking_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    updater_check_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    AFLogging_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    QUEUE_ACTION_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    CallerID_popup_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    voicemail_button_enabled: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    enable_fast_refresh: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    fast_refresh_rate: {
      type: DataTypes.INTEGER,
      defaultValue: '1000'
    },
    enable_persistant_mysql: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    auto_dial_next_number: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    VDstop_rec_after_each_call: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
    },
    DBX_server: {
      type: DataTypes.STRING
    },
    DBX_database: {
      type: DataTypes.STRING,
      defaultValue: 'asterisk'
    },
    DBX_user: {
      type: DataTypes.STRING,
      defaultValue: 'cron'
    },
    DBX_pass: {
      type: DataTypes.STRING,
      defaultValue: '1234'
    },
    DBX_port: {
      type: DataTypes.INTEGER,
      defaultValue: '3306'
    },
    DBY_server: DataTypes.STRING,
    DBY_database: {
      type: DataTypes.STRING,
      defaultValue: 'asterisk'
    },
    DBY_user: {
      type: DataTypes.STRING,
      defaultValue: 'cron'
    },
    DBY_pass: {
      type: DataTypes.STRING,
      defaultValue: '1234'
    },
    DBY_port: {
      type: DataTypes.INTEGER,
      defaultValue: '3306'
    },
    outbound_cid: DataTypes.STRING,
    enable_sipsak_messages: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    email: DataTypes.STRING,
    template_id: {
      type: DataTypes.STRING
      // allowNull: false
    },
    conf_override: DataTypes.TEXT,
    phone_context: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    },
    phone_ring_timeout: {
      type: DataTypes.INTEGER,
      defaultValue: '60'
    },
    conf_secret: {
      type: DataTypes.STRING,
      defaultValue: 'test'
    },
    delete_vm_after_email: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    is_webphone: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    use_external_server_ip: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    codecs_list: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    codecs_with_template: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    },
    webphone_dialpad: {
      type: DataTypes.ENUM,
      values: ['Y', 'N', 'TOGGLE', 'TOGGLE_OFF'],
      defaultValue: 'Y'
    },
    on_hook_agent: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    webphone_auto_answer: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    webphone_auto_hide: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y  '
    }
  },
  {
    tableName: 'phones'
  })
  Phone.associate = function (models) {
  }
  return Phone
}
