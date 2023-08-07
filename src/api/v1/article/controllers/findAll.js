const articleService = require("../../../../lib/article");
const findAll = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || "dsc";
  const sortBy = req.query.sort_by || "updatedAt";
  const search = req.query.search || "";

  try {
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });
    res.status(200).json(articles);
    const error = new Error("test error");
    throw error;
  } catch (e) {
    next(e);
  }
};

module.exports = findAll;
