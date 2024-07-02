const sequelize = require('../config/db')
const { DataTypes } = require('sequelize');
const Categories = require('./category');
const User = require('./user')

const Products = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
    name:{
        type: DataTypes.STRING,
        allowNull: false

    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity:{
        type: DataTypes.FLOAT,
        allowNull: false

    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
        }
    },
    categoryId:{
        type: DataTypes.INTEGER,
        
        allowNull: false,
        references:{
            model: Categories,
            }
    }
    
}, {
    timestamps: true
}
) 

Categories.hasMany(Products, {foreignKey : 'categoryId'})
Products.belongsTo(Categories, {foreignKey: 'categoryId'})
User.hasMany(Products,{foreignKey: 'userId'})
Products.belongsTo(User,{foreignKey: 'userId'})

module.exports = Products;