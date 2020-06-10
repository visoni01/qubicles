'use strict'
module.exports = (sequelize, DataTypes) => {
  const FlowPages = sequelize.define('FlowPages', {
    page_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(9).UNSIGNED
    },
    flow_id: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER(9).UNSIGNED
    },
    page_name: DataTypes.STRING(50),
    page_description: DataTypes.STRING(200),
    default_disposition: DataTypes.STRING(45),
    default_disposition_sdr: DataTypes.STRING(45),
    page_bg_color: DataTypes.STRING(45),
    randomize_pages_off: {
      type: DataTypes.ENUM,
      defaultValue: 'True',
      values: ['True', 'False']
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  { tableName: 'x_flow_pages' })
  FlowPages.associate = function (models) {}
  return FlowPages
}
