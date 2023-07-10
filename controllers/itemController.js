const Category = require("../models/category");
const Item = require("../models/item");

exports.itemList = async (req, res, next) => {
  try {
    const items = await Item.find().populate('category', 'name')
    res.render("item_list", { items });
  } catch (err) {
    next(err);
  }
};

exports.itemDetail = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId).populate('category', 'name');
    res.render("item_detail", { item });
  } catch (err) {
    next(err);
  }
};

exports.itemCreateForm =  async(req, res, next) => {
  try {
    const categories = await Category.find();
    res.render("item_create", {categories});
  } catch (err) {
    next(err);
  }
};

exports.itemCreate = async (req, res, next) => {
  const { name, description, category, price, numberInStock } = req.body;
  if (price < 0 || numberInStock < 0) {
    const errorMessage = "Price and number in stock must be positive values.";
    return res.status(400).render("error", { errorMessage });
  }

  const newItem = new Item({
    name,
    description,
    category,
    price,
    numberInStock,
  });
  try {
    await newItem.save();
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

exports.itemUpdateForm = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    const categories = await Category.find();
    res.render("item_update", { item, categories });
  } catch (err) {
    next(err);
  }
};

exports.itemUpdate = async (req, res, next) => {
  const itemId = req.params.id;
  const { name, description, category, price, numberInStock } = req.body;
  if (price < 0 || numberInStock < 0) {
    const errorMessage = "Price and number in stock must be positive values.";
    return res.status(400).render("error", { errorMessage });
  }
  try {
    await Item.findByIdAndUpdate(itemId, {
      name,
      description,
      category,
      price,
      numberInStock,
    });
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

exports.itemDelete = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    await Item.findByIdAndRemove(itemId);
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};
