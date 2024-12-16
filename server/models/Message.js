const { DataTypes } = require("sequelize");
const db = require("../db");

const Message = db.define('Message', {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Message;