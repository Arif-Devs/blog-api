const articleService = require('../../../../lib/article');

const create = async (req, res, next) => {
  const { title, body, cover, status } = req.body;

  try {
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author: req.user,
    });
    const response = {
      code: 201,
      massage: 'article created successfully',
      data: { ...article._doc },
      links: {
        self: `/articles/${article._id}`,
        author: `/articles/${article._id}`,
        comments: `/articles/${article._id}/comments`,
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
