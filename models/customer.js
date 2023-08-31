const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const moment = require("moment")

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("customers", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female"),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    
    Customer.beforeCreate(function (customer) {
        customer.dataValues.createdAt = moment().unix();
        customer.dataValues.updatedAt = moment().unix();
    })
    
    return Customer;
}