'use strict'
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    server_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    server_description: DataTypes.STRING,
    server_ip: DataTypes.STRING,
    active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N']
    },
    asterisk_version: {
      type: DataTypes.STRING,
      defaultValue: '1.2.9'
    },
    max_vicidial_trunks: {
      type: DataTypes.INTEGER,
      defaultValue: 23
    },
    telnet_host: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'localhost'
    },
    telnet_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5038
    },
    ASTmgrUSERNAME: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'cron'
    },
    ASTmgrSECRET: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1234'
    },
    ASTmgrUSERNAMEupdate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'updatecron'
    },
    ASTmgrUSERNAMElisten: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'listencron'
    },
    ASTmgrUSERNAMEsend: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sendcron'
    },
    local_gmt: {
      type: DataTypes.STRING,
      defaultValue: '-5'
    },
    voicemail_dump_exten: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '85026666666666'
    },
    answer_transfer_agent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '8365'
    },
    ext_context: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    sys_perf_log: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    vd_server_logs: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    agi_output: {
      type: DataTypes.ENUM,
      values: ['NONE', 'STDERR', 'FILE', 'BOTH'],
      defaultValue: 'FILE'
    },
    vicidial_balance_active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    balance_trunks_offlimits: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    recording_web_link: {
      type: DataTypes.ENUM,
      values: ['SERVER_IP', 'ALT_IP', 'EXTERNAL_IP'],
      defaultValue: 'SERVER_IP'
    },
    alt_server_ip: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    active_asterisk_server: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    generate_vicidial_conf: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    rebuild_conf_files: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    outbound_calls_per_second: {
      type: DataTypes.INTEGER,
      defaultValue: 20
    },
    sysload: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0
    },
    // sysload_desc: DataTypes.TEXT, // custom
    channels_total: {
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    cpu_idle_percent: {
      type: DataTypes.INTEGER(3),
      defaultValue: 0
    },
    // cpu_idle_percent_desc: DataTypes.TEXT, // custom
    disk_usage: {
      type: DataTypes.STRING,
      defaultValue: '1'
    },
    sounds_update: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'N'
    },
    vicidial_recording_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 60
    },
    carrier_logging_active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    vicidial_balance_rank: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    rebuild_music_on_hold: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    active_agent_login_server: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      defaultValue: 'Y'
    },
    conf_secret: {
      type: DataTypes.STRING,
      defaultValue: 'test'
    },
    external_server_ip: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    custom_dialplan_entry: DataTypes.TEXT,
    active_twin_server_ip: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  },
  {
    tableName: 'servers'
  })
  Server.associate = function (models) {
  }
  return Server
}
