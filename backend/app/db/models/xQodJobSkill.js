'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodJobSkill = sequelize.define('XQodJobSkill', {
    job_skill_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    job_id: DataTypes.INTEGER(11),
    skill_id: DataTypes.INTEGER(11),
    skill_preference: {
      type: DataTypes.ENUM,
      values: ['required', 'optional', 'plus']
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_qod_job_skills'
  })
  XQodJobSkill.associate = function (models) {
  }
  return XQodJobSkill
}
