const { DataTypes, Model } = require('sequelize');
const sequelize = require("../utils/postgresql");

class User extends Model {}

User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,//YYYY-MM-DD
        allowNull: true
    }, 
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'User'
})

module.exports = User;