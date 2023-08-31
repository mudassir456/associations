const { Router } = require("express");

const router = Router();

const productRouter = require("./product")

const controllers = require("../controllers/shop");

// Middlewares
const checkShop = require("../middlewares/checkShop");

router.get("/", controllers.get);
router.post("/", controllers.create)
router.use("/:shopId/products", checkShop, productRouter)

module.exports = router;