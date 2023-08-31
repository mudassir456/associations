const { Router } = require("express");

const router = Router();

const controllers = require("../controllers/product");

router.get("/", controllers.get)

router.post("/", controllers.post);

router.put("/:productId", controllers.put)

router.delete("/:productId", controllers.delete)

router.get("/:productId", controllers.getOne)

module.exports = router;