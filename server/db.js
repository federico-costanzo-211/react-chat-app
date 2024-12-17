const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new sequelize.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    process: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = db;