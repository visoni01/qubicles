'use strict'
module.exports = (sequelize, DataTypes) => {
  const XQodJob = sequelize.define('XQodJob', {
    job_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    client_id: DataTypes.INTEGER(11),
    user_id: DataTypes.INTEGER(11),
    category_id: DataTypes.INTEGER(11),
    position_id: DataTypes.INTEGER(11),
    title: DataTypes.STRING(100),
    description: DataTypes.STRING,
    job_type: {
      type: DataTypes.ENUM,
      values: ['fulltime', 'parttime', 'contract'],
      defaultValue: 'contract'
    },
    employment_type: {
      type: DataTypes.ENUM,
      values: ['employee', 'freelancer'],
      defaultValue: 'freelancer'
    },
    duration_type: {
      type: DataTypes.ENUM,
      values: ['ondemand', 'upto1month', 'upto3months', 'upto6months', 'morethan6months'],
      defaultValue: 'ondemand'
    },
    experience_type: {
      type: DataTypes.ENUM,
      values: ['entrylevel', 'intermediate', 'expert'],
      defaultValue: 'entrylevel'
    },
    location_type: {
      type: DataTypes.ENUM,
      values: ['remote', 'onsite'],
      defaultValue: 'remote'
    },
    city: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    needed: DataTypes.INTEGER,
    fulfilled: DataTypes.INTEGER,
    pay_amount: DataTypes.DOUBLE,
    pay_type: {
      type: DataTypes.ENUM,
      values: ['hourly', 'monthly', 'annually']
    },
    pay_frequency: {
      type: DataTypes.ENUM,
      values: ['weekly', 'biweekly', 'monthly'],
      defaultValue: 'weekly'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['recruiting', 'hired', 'cancelled'],
      defaultValue: 'recruiting'
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_confidential: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'x_qod_jobs'
  })
  XQodJob.associate = function (models) {
  }
  return XQodJob
}
