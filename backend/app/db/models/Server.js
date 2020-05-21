'use strict'
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    server_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      // allowNull: false,
      primaryKey: true
    },
    server_description: DataTypes.TEXT,
    server_ip: DataTypes.TEXT,
    active: DataTypes.TEXT,
    asterisk_version: DataTypes.TEXT,
    max_vicidial_trunks: DataTypes.INTEGER,
    telnet_host: DataTypes.TEXT,
    telnet_port: DataTypes.INTEGER,
    ASTmgrUSERNAME: DataTypes.TEXT,
    ASTmgrSECRET: DataTypes.TEXT,
    ASTmgrUSERNAMEupdate: DataTypes.TEXT,
    ASTmgrUSERNAMElisten: DataTypes.TEXT,
    ASTmgrUSERNAMEsend: DataTypes.TEXT,
    local_gmt: DataTypes.TEXT,
    voicemail_dump_exten: DataTypes.TEXT,
    answer_transfer_agent: DataTypes.TEXT,
    ext_context: DataTypes.TEXT,
    sys_perf_log: DataTypes.TEXT,
    vd_server_logs: DataTypes.TEXT,
    agi_output: DataTypes.TEXT,
    vicidial_balance_active: DataTypes.TEXT,
    balance_trunks_offlimits: DataTypes.INTEGER,
    recording_web_link: DataTypes.TEXT,
    alt_server_ip: DataTypes.TEXT,
    active_asterisk_server: DataTypes.TEXT,
    generate_vicidial_conf: DataTypes.TEXT,
    rebuild_conf_files: DataTypes.TEXT,
    outbound_calls_per_second: DataTypes.INTEGER,
    sysload: DataTypes.INTEGER,
    // sysload_desc: DataTypes.TEXT, // custom
    channels_total: DataTypes.TEXT,
    cpu_idle_percent: DataTypes.TEXT,
    // cpu_idle_percent_desc: DataTypes.TEXT, // custom
    disk_usage: DataTypes.TEXT,
    sounds_update: DataTypes.TEXT,
    vicidial_recording_limit: DataTypes.INTEGER,
    carrier_logging_active: DataTypes.TEXT,
    vicidial_balance_rank: DataTypes.INTEGER,
    rebuild_music_on_hold: DataTypes.TEXT,
    active_agent_login_server: DataTypes.TEXT,
    conf_secret: DataTypes.TEXT,
    external_server_ip: DataTypes.TEXT,
    custom_dialplan_entry: DataTypes.TEXT,
    active_twin_server_ip: DataTypes.TEXT
  },
    {
      tableName: 'servers'
    })
  Server.associate = function (models) {
  }
  return Server
}
