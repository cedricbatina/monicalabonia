// import function from model
const articleModel = require("../models/article.model");

const create = articleModel.insertArticle;
const fetchAll = articleModel.getAllArticles;
const fetchOne = articleModel.fetchOne;
const deleteOne = articleModel.deleteArticle;
const modifyOne = articleModel.modifyArticle;

// create an article

exports.createArticle = (req, res) => {
  const data = req.body;
  create(data, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

/// update an article

exports.modifyArticle = (_req, res) => {
  const data = req.body;
  const id = req.params.id;
  modifyOne(data, id, (err, results) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.json(results);
    }
  });
};

exports.suppressArticle = (req, res) => {
  const id = req.params.id;
  deleteOne(id, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// get all articles
exports.fetchAllArticles = (_req, res) => {
  fetchAll((err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erreur interne du serveur" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

// get a single article
exports.fetchOneArticle = (req, res) => {
  fetchOne(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
