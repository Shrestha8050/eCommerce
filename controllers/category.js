const Category = require('../Model/Category');

exports.create = async (req, res) => {
  const { category } = req.body;
  try {
    const categoryExist = await Category.findOne({ category });
    if (categoryExist) {
      return res.status(404).json({
        errorMessage: `${category} already Exists`,
      });
    }
    let newCategory = new Category();
    newCategory.category = category;
    newCategory = await newCategory.save();
    res.status(200).json({
      successMessage: `${newCategory.category} was created !!!`,
    });
  } catch (err) {
    console.log('category create Error ', err);
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      categories,
    });
  } catch (err) {
    console.log('category read Error ', err);
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};
