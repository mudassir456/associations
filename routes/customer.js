const { Router } = require("express");

const router = Router();

const controllers = require("../controllers/customer");

// Middlewares
const checkCustomer = require("../middlewares/checkCustomer")

router.get("/", controllers.get);
router.post("/", controllers.create)
router.post("/login", controllers.login)
router.get("/:customerId", checkCustomer, controllers.getOne)

module.exports = router;