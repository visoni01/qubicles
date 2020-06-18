'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodApplication = sequelize.define('XQodApplication', {
    application_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER(11),
    job_id: DataTypes.INTEGER(11),
    cover_letter: DataTypes.STRING,
    video_pitch_url: DataTypes.STRING(100),
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'applied', 'invited', 'declined', 'screening', 'interviewing', 'pretraining', 'offered', 'rejected', 'hired'],
      defaultValue: 'published'
    },
    status_reason: DataTypes.STRING,
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_qod_applications'
  })
  XQodApplication.associate = function (models) {
  }
  return XQodApplication
}
