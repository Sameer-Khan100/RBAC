const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('RBAS', 'postgres', 'user', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

module.exports = sequelize;
