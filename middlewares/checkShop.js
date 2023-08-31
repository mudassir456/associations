const { shops: Shops } = require("../models")

module.exports = async function (req, res, next) {
    try {
        const { shopId } = req.params;
        const shop = await Shops.findByPk(shopId);
        if(!shop) {
            return res.status(404).send("Shop not found")
        }
        req.shop = shop;
        next()
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!")
    }
}