'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
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
    company_name: DataTypes.STRING,
    company_ein: DataTypes.STRING,
    company_id: DataTypes.STRING
  },
  {
    tableName: 'x_user_details'
  })
  UserDetails.associate = function (models) {
  }
  return UserDetails
}
