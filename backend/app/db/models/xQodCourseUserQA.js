'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodCourseUserQA = sequelize.define('XQodCourseUserQA', {
    user_qa_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER(11),
    course_id: DataTypes.INTEGER(11),
    section_id: DataTypes.INTEGER(11),
    section_qa_id: DataTypes.INTEGER(11),
    answer: DataTypes.STRING,
    correct: DataTypes.BOOLEAN,
    verified: DataTypes.BOOLEAN,
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
    tableName: 'x_qod_course_user_qa',
    timestamps: true
  })
  XQodCourseUserQA.associate = function (models) {
  }
  return XQodCourseUserQA
}
