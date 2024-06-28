const { DataTypes } = require("sequelize")
const sequelize = require('../config/db')
const User = require('./user')

const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
            },
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
            },
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
            }
    }
    

},
{
    timestamps: true
})

User.hasMany(Categories, { foreignKey : 'userId'})
Categories.belongsTo(User, { foreignKey : 'userId'})

module.exports = Categories;
