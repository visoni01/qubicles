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
    description: DataTypes.TEXT,
    goals: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    outcomes: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    language: {
      type: DataTypes.ENUM,
      values: ['English', 'Spanish', 'French'],
      defaultValue: 'French'
    },
    token_price: DataTypes.DOUBLE,
    visibility: {
      type: DataTypes.ENUM,
      values: ['private', 'public'],
      defaultValue: 'public'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'draft'],
      defaultValue: 'published'
    },
    createdAt: {
      field: 'created_on',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_on',
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'x_qod_courses',
    timestamps: true
  })
  XQodCourse.associate = function (models) {
  }
  return XQodCourse
}
