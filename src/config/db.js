const Sequelize = require('sequelize');
const sequelize = new Sequelize('home_stash', 'homestash', '123456', {
  host: 'localhost',
  dialect: 'mysql2',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
