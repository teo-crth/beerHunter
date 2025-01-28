const models = require("../models");

const browse = (req, res) => {
    models.city
        .findAll()
        .then((result) => {
            const rows = result.rows
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateBars = (req, res) => {
  models.city
    .findBarsOfOneCity(req.params.city, req.params.region)
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
    models.city
        .find(id)
        .then((result) => {
            const rows = result.rows
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
    const city = req.body;

    // TODO validations (length, format...)

    city.id = parseInt(req.params.id, 10);

    models.city
        .update(city)
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
    const city = req.body;

    // TODO validations (length, format...)

    models.city
        .insert(city)
        .then((result) => {
            res.location(`api/citys/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.city
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
    findAssociateBars
};
