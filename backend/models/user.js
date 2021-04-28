'use strict';

const bcrypt = require('bcrypt')
const config = require('../config/app')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    sexualOrientation: DataTypes.STRING,

    // need to modify following avatar section to get the default profile picture 
    avatar: {
      type: DataTypes.STRING,
      get() {
        const avatar = this.getDataValue('avatar')
        const url = `${config.appUrl}:${config.appPort}`

        if (!avatar) {
          return `${url}/${this.getDataValue('gender')}.svg`
      }

        const id = this.getDataValue('id')
        return `${url}/user/${id}/${avatar}`
      }
    },
    isVerified: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    bio: DataTypes.STRING,
    interest: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  return User;
};

// crete a function to hash the password
const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  return user
}


// confirmationCode: DataTypes.STRING