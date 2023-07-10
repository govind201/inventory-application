const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.itemList);
router.get("/create", itemController.itemCreateForm);
router.post("/create", itemController.itemCreate);
router.get("/:id/update", itemController.itemUpdateForm);
router.post("/:id/update", itemController.itemUpdate);
router.get("/:id/delete", itemController.itemDelete);
router.get("/:id", itemController.itemDetail);

module.exports = router;
