'use strict'
module.exports = (sequelize, DataTypes) => {
  const XPhoneCodes = sequelize.define('XPhoneCodes', {
    phone_code_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country_code: DataTypes.INTEGER(5).UNSIGNED,
    country: DataTypes.STRING(3),
    areacode: DataTypes.STRING(3),
    state: DataTypes.STRING(3),
    GMT_offset: DataTypes.STRING(6),
    DST: {
      type: DataTypes.ENUM,
      values: ['Y', 'N']
    },
    DST_range: DataTypes.STRING(8),
    geographic_description: DataTypes.STRING(30),
    tz_code: DataTypes.STRING(4),
    rate: {
      type: DataTypes.DECIMAL(10, 3),
      defaultValue: 0.020
    }
  },
  {
    tableName: 'x_phone_codes'
  })
  XPhoneCodes.associate = function (models) { }
  return XPhoneCodes
}
