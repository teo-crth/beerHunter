const models = require("../models");

const browse = (req, res) => {
  models.beer_type
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

const findAssociateBeerType = (req, res) => {
    models.beer_type
      .findBeerOfOneType(req.params.type)
      .then((rows) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.beer_type
    .find(id)
    .then((result) => {
      const rows = result.rows;
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const beer_type = req.body;

  // TODO validations (length, format...)

 beer_type.id = parseInt(req.params.id, 10);

  models.beer_type
    .update(beer_type)
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
  const beer_type = req.body;

  // TODO validations (length, format...)

  models.beer_type
    .insert(beer_type)
    .then((result) => {
      res.location(`api/beer_type/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.beer_type
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
  findAssociateBeerType,
};
