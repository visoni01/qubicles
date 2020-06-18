'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodCourse = sequelize.define('XQodCourse', {
    course_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    category_id: DataTypes.INTEGER(11),
    creator_id: DataTypes.INTEGER(11),
    title: DataTypes.STRING(100),
    short_description: DataTypes.STRING,
    detailed_description: DataTypes.STRING,
    prerequisites: DataTypes.STRING,
    outcomes: DataTypes.STRING,
    overview_url: DataTypes.STRING,
    language: {
      type: DataTypes.ENUM,
      values: ['english', 'spanish', 'french']
    },
    token_price: DataTypes.DOUBLE,
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_qod_courses'
  })
  XQodCourse.associate = function (models) {
  }
  return XQodCourse
}
