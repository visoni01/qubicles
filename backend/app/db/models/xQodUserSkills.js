'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodUserSkill = sequelize.define('XQodUserSkill', {
    user_skill_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER(11),
    skill_id: DataTypes.INTEGER(11),
    endorsed: DataTypes.INTEGER,
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_qod_user_skills'
  })
  XQodUserSkill.associate = function (models) {
  }
  return XQodUserSkill
}
