const router = require('express').Router();
const { controllers: articleController } = require('../api/v1/article');

router
  .route('/api/v1/articles')
  .get(articleController.findAll)
  .post(articleController.create);

router
  .route('api/v1/articles/:id')
  .get(articleController.findSingle)
  .put((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
