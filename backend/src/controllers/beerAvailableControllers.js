const models = require("../models");

const browse = (req, res) => {
    models.beer_available
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

const read = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.beer_available
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
    const beerAvailable = req.body;

    // TODO validations (length, format...)

    beerAvailable.id = parseInt(req.params.id, 10);

    models.beer_available
        .update(beerAvailable)
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
    const beerAvailable = req.body;

    // TODO validations (length, format...)

    models.beer_available
        .insert(beerAvailable)
        .then((result) => {
            res.location(`/beer_available/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.beer_available
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
};
