const models = require("../models");
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const uuid = require('uuid');

const browse = (req, res) => {
    models.bar
        .findAll()
        .then((result) => {
            const rows = result.rows;   
            const traitedRows = replaceSpecialChars(rows);        
            res.send(traitedRows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateComments = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.bar
        .findCommentsOfOneBar(id)
        .then((result) => {
            const rows = result.rows
            const traitedRows = replaceSpecialChars(rows);    
            res.send(traitedRows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateBeers = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.bar
        .findBeersOfOneBar(id)
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
    models.bar
        .find(id)
        .then((result) => {
            const rows = result.rows;
            if (rows[0] == null) {
                res.sendStatus(404);
            } else {
                const traitedRows = replaceSpecialChars(rows); 
                res.send(traitedRows[0]);
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

const addMultipleBars = async (req, res) => {
    const bars = req.body;

    if (!Array.isArray(bars) || bars.length === 0) {
        return res.status(400).send('Aucune donnée valide pour les bars');
    }

    try {
        const barsWithPictures = await Promise.all(bars.map(async (bar) => {
            if (bar.bar_picture) {
                // Téléchargement de l'image
                const imageUrl = bar.bar_picture;
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

                const imageName = `${uuid.v4()}.webp`;
                const imagePath = path.join(__dirname, 'assets', 'images', 'bar-images', imageName);

                fs.writeFileSync(imagePath, imageResponse.data);
                bar.bar_picture = `/assets/images/bar-images/${imageName}`;
            }

            return models.bar.insert(bar);
        }));

        res.status(201).json(barsWithPictures);
    } catch (error) {
        console.error('Erreur lors de l\'ajout des bars:', error);
        res.status(500).send('Erreur interne lors de l\'ajout des bars');
    }
};

const destroy = (req, res) => {
    models.bar
        .delete(req.params.id)
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
    findAssociateComments,
    findAssociateBeers,
    addMultipleBars
};
