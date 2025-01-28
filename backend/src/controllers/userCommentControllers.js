const models = require("../models");

const browse = (req, res) => {
  models.user_comment
    .findAll()
    .then((result) => {
      const rows = result.rows;
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAssociateImages = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.user_comment
    .findCommentImages(id)
    .then((result) => {
      const rows = result.rows;
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.user_comment
    .find(id)
    .then((rows) => {
      const result = rows.rows[0];
      
      if (result == null) {
          res.sendStatus(404);
      } else {
          res.send(result);
      }
  })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user_comment = req.body;

  // TODO validations (length, format...)

  user_comment.id = parseInt(req.params.id, 10);

  models.user_comment
    .update(user_comment)
    .then((result) => {
      if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user_comment = req.body;

  // TODO validations (length, format...)

  models.user_comment
    .insert(user_comment)
    .then((result) => {
      res.location(`/user_comments/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.user_comment
    .delete(id)
    .then((result) => {
      if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findAssociateImages,
};
