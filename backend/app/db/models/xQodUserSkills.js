'use strict'

module.exports = (sequelize, DataTypes) => {
  const XQodUserSkill = sequelize.define('XQodUserSkill', {
    user_skill_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    endorsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
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
    XQodUserSkill.belongsTo(models.XQodSkill, { as: 'skill', foreignKey: 'skill_id' })
  }
  return XQodUserSkill
}
