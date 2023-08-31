const { jwt_secret } = require("../constants");
const { customers: Customers } = require("../models")
const jwt = require("jsonwebtoken")

module.exports = async function (req, res, next) {
    try {
        const { customerId } = req.params;
        const customer = await Customers.findByPk(customerId);
        if(!customer) {
            return res.status(404).send("Customer not found")
        }

        const token = req.header("Authorization");
        if(!token) {
            return res.status(401).send("Token is empty")
        }

        const decoded = jwt.verify(token, jwt_secret)

        if(!decoded) {
            return res.status(401).send("Invalid token")
        }
        console.log(decoded)

        if(decoded.id != customerId) {
            return res.status(401).send("Unauthorized")
        }

        req.customer = customer;
        next()
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!")
    }
}