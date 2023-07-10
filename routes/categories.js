const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.categoryList);
router.get("/create", categoryController.categoryCreateForm);
router.post("/create", categoryController.categoryCreate);
router.get("/:id", categoryController.categoryDetail);
router.get("/:id/update", categoryController.categoryUpdateForm);
router.post("/:id/update", categoryController.categoryUpdate);
router.get("/:id/delete", categoryController.categoryDelete);

module.exports = router;
