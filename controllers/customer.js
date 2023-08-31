const { customers: Customers, carts: Carts, sequelize } = require("../models/index");
const moment = require("moment")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../constants");

module.exports = {
    get: async function (req, res) {
        try {
            const customers = await Customers.findAndCountAll({
            })
            res.status(200).send({
                customers
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
    create: async function (req, res) {
        const transaction = await sequelize.transaction()
        try {
            const { name, email, password, gender,  } = req.body;

            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            const [customer] = await Customers.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    name,
                    password: hashedPassword,
                    gender,
                    createdAt: moment().unix(),
                    updatedAt: moment().unix()
                },
                transaction: transaction
            })

            const [cart] = await Carts.findOrCreate({
                where: {
                    fk_customer_id: customer.id
                },
                transaction: transaction
            });

            await transaction.commit()

            res.status(200).send({
                customer,
                cart
            })
        } catch (err) {
            await transaction.rollback()
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            const customer = await Customers.findOne({
                where: {
                    email
                }
            })
            if(!customer) {
                return res.status(404).send("Customer not found")
            }

            const passwordMatched = await bcrypt.compare(password, customer.password)
            if(!passwordMatched) {
                return res.status(401).send("Password is incorrect")
            }

            const plainObjCustomer = await customer.toJSON();
            const token = await jwt.sign(plainObjCustomer, jwt_secret)

            res.status(200).send({
                customer,
                token
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
    getOne: async function (req, res) {
        try {
            const {customerId} = req.params;
            const customer = await Customers.findByPk(customerId)
            res.status(200).send({
                customer
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
}