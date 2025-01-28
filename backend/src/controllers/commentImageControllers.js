const models = require("../models");

const browse = (req, res) => {
    models.comment_image
        .findAll()
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const read = (req, res) => {
    models.comment_image
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
    const comment_image = req.body;

    // TODO validations (length, format...)

    comment_image.id = parseInt(req.params.id, 10);

    models.comment
        .update(comment_image)
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
    const comment_image = req.body;

    // TODO validations (length, format...)

    models.comment_image
        .insert(comment_image)
        .then((result) => {
            res.location(`/comment_image/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const destroy = (req, res) => {
    models.comments_image
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
};