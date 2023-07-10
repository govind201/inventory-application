const Category = require("../models/category");
const item = require("../models/item");

exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.render("category_list", { categories });
  } catch (err) {
    next(err);
  }
};

exports.categoryDetail = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    const itemsInCategory = await item.find({ category: categoryId });
    res.render("category_detail", { category, items: itemsInCategory });
  } catch (err) {
    next(err);
  }
};

exports.categoryCreateForm = (req, res) => {
  res.render("category_create");
};

exports.categoryCreate = async (req, res, next) => {
  const { name, description } = req.body;
  const newCategory = new Category({
    name,
    description,
  });
  try {
    await newCategory.save();
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
};

exports.categoryUpdateForm = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    res.render("category_update", { category });
  } catch (err) {
    next(err);
  }
};

exports.categoryUpdate = async (req, res, next) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;
  try {
    await Category.findByIdAndUpdate(categoryId, { name, description });
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
};

exports.categoryDelete = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    await Category.findByIdAndRemove(categoryId);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
};
