const articleService = require('../../../../lib/article');
const { query } = require('../../../../../utils/index');
const defaults = require('../../../config/defaults');

const findAll = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    //data
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const data = query.getTransformedItems({
      items: articles,
      path: '/articles',
      selection: ['id', 'title', 'cover', 'author', 'updatedAt', 'createdAt'],
    });

    //pagination
    const totalItems = await articleService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    // HATEOAS LINKS
    const links = query.generateHateoasForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });
    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAll;
