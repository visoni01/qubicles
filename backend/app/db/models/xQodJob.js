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
    title: DataTypes.STRING(100),
    description: DataTypes.TEXT,
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
      values: ['on-demand', 'months', 'open-ended'],
      defaultValue: 'on-demand'
    },
    duration_months: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0
    },
    experience_type: {
      type: DataTypes.ENUM,
      values: ['entry', 'intermediate', 'expert'],
      defaultValue: 'entry'
    },
    location_type: {
      type: DataTypes.ENUM,
      values: ['remote', 'onsite'],
      defaultValue: 'remote'
    },
    city: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    languages: DataTypes.STRING(100),
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
      values: ['draft', 'recruiting', 'hired', 'cancelled'],
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
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
