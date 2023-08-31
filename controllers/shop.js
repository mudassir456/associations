const { shops: Shops, products: Products} = require("../models");

module.exports = {
    get: async function (req, res) {
        try {
            const shops = await Shops.findAndCountAll({
                include: {
                    model: Products,
                    as: "products"
                }
            })
            res.status(200).send({
                shops
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
    create: async function (req, res) {
        try {
            const { name, address } = req.body;
            const shop = await Shops.findOrCreate({
                where: {
                    name: name
                },
                defaults: {
                    address
                }
            })
            res.status(200).send({
                shop
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
}