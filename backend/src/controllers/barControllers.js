const models = require("../models");

const browse = (req, res) => {
    models.bar
        .findAll()
        .then((rows) => {
            console.log('rows', rows);
            
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateComments = (req, res) => {
    models.bar
        .findCommentsOfOneBar(req.params.id)
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateBeers = (req, res) => {
    models.bar
        .findBeersOfOneBar(req.params.id)
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const read = (req, res) => {
    models.bar
        .find(req.params.id)
        .then((rows) => {
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
    const bar = req.body;

    // TODO validations (length, format...)

    bar.id = parseInt(req.params.id, 10);

    models.bar
        .update(bar)
        .then((result) => {
            if (result.affectedRows === 0) {
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
    const bar = req.body;

    // TODO validations (length, format...)

    models.bar
        .insert(bar)
        .then((result) => {
            res.location(`api/bars/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const destroy = (req, res) => {
    models.bar
        .delete(req.params.id)
        .then((result) => {
            if (result.affectedRows === 0) {
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
    findAssociateComments,
    findAssociateBeers
};
