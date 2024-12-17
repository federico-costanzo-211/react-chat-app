const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./User.js");

const Message = db.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        foreignKeyConstraint: true 
    },
    content: {
        type: DataTypes.STRING(2000),
        allowNull: false
    }
});

Message.belongsTo(User, {foreignKey: "author_id", targetKey: "user_id", uniqueKey: "author_id_fk"});

module.exports = Message;