const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')


const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
        },
    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
            }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false

    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['super admin', 'admin']
    }

},
{
    timestamps: true
})


//hash the password
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  // validate password
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = User;

