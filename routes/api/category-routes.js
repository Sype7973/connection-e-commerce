const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // findAll is a sequelize method that takes in 1 argument: an options object
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // find by primary key (pk) is a sequelize method that takes in 2 arguments: the id of the row to be found and the options object
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // create is a sequelize method that takes in 2 arguments: the data I want to create and the id of the row to be updated
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // update is a sequelize method that takes in 2 arguments: the data and the id of the row to be updated
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if (!categoryData[0]) { give error message if no category found
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
}
});
// delete on tag by its `id` value
// router.delete('/api/categories/:id', (req, res) => {
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // destroy is a sequelize method that takes in 1 argument: the id of the row to be deleted
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if (!categoryData) { give error message if no category found
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
