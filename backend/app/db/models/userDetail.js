'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define('UserDetail', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    wallet_address: DataTypes.STRING,
    dob: DataTypes.STRING(30),
    ssn: DataTypes.STRING,
    gender: DataTypes.STRING,
    street_address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    home_phone: DataTypes.STRING,
    mobile_phone: DataTypes.STRING,
    years_of_experience: DataTypes.STRING,
    highest_education: DataTypes.STRING,
    primary_language: DataTypes.STRING,
    other_languages: DataTypes.STRING,
    source: DataTypes.STRING,
    notify_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_sms: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_online: DataTypes.BOOLEAN,
    profile_image: DataTypes.STRING,
    id_url: DataTypes.STRING,
    work_title: DataTypes.STRING,
    work_overview: DataTypes.TEXT,
    is_post_signup_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { tableName: 'x_user_details' })
  UserDetail.associate = function (models) {
    UserDetail.hasMany(models.XQodUserSkill, { as: 'userSkills', foreignKey: 'user_id' })
  }

  return UserDetail
}
