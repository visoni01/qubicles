'use strict'
module.exports = (sequelize, DataTypes) => {
  const XLeadsList = sequelize.define('XLeadsList', {
    list_id: {
      type: DataTypes.BIGINT(14).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    list_name: DataTypes.STRING(30),
    campaign_id: DataTypes.STRING(8),
    active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N']
    },
    list_description: DataTypes.STRING,
    list_changedate: DataTypes.DATE,
    list_lastcalldate: DataTypes.DATE,
    reset_time: DataTypes.STRING,
    agent_script_override: DataTypes.STRING(10),
    campaign_cid_override: DataTypes.STRING(20),
    am_message_exten_override: DataTypes.STRING(100),
    drop_inbound_group_override: DataTypes.STRING(20),
    xferconf_a_number: DataTypes.STRING(50),
    xferconf_b_number: DataTypes.STRING(50),
    xferconf_c_number: DataTypes.STRING(50),
    xferconf_d_number: DataTypes.STRING(50),
    xferconf_e_number: DataTypes.STRING(50),
    web_form_address: DataTypes.STRING(512),
    web_form_address_two: DataTypes.STRING(512),
    time_zone_setting: {
      type: DataTypes.ENUM,
      values: ['COUNTRY_AND_AREA_CODE', 'POSTAL_CODE', 'NANPA_PREFIX', 'OWNER_TIME_ZONE_CODE'],
      defaultValue: 'COUNTRY_AND_AREA_CODE'
    },
    total_records: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0
    },
    flow_id: {
      allowNull: false,
      type: DataTypes.BIGINT(14).UNSIGNED,
      defaultValue: 0
    },
    list_startdate: DataTypes.DATE,
    list_stopdate: DataTypes.DATE
  },
  {
    tableName: 'x_leads_lists',
    timestamps: false
  })
  XLeadsList.associate = function (models) {
  }
  return XLeadsList
}
