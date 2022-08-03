const {
  getArticleById,
  patchIncreaseVotes,
} = require("../models/articlesModels");

exports.pullArticle = (req, res, next) => {
  const id = req.params.article_id;
  getArticleById(id)
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => next(err));
};

exports.patchArticleIncreaseVotes = (req, res, next) => {
  const vote = req.body.inc_votes;
  if (!req.body.hasOwnProperty('inc_votes')) {
   res.status(400).send({ msg: "Invalid input missing inc_votes prop" }); 
   return
  }

  const id = req.params.article_id;
  if (isNaN(id)) {
       res.status(400).send({ msg: "ID is not a number" }) 
       return
  }

  patchIncreaseVotes(id, vote).then(() => {
    getArticleById(id)
      .then((updatedArticles) => {
        res.status(200).send({ articles: updatedArticles });
      })
      .catch((err) => next(err));
  });
};
