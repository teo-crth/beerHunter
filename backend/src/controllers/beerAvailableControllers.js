const models = require("../models");

const browse = (req, res) => {
    models.beerAvailable
        .findAll()
        .then((result) => {
            const rows = result.rows
            console.log('FETCH BEERAVAILABLE BACKEND', rows);
            res.send(rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const findAssociateBeersAvailable = async (req, res) => {

    const id = parseInt(req.params.id, 10);

    models.beerAvailable
        .findAssociateBeersAvailable(id)
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
    models.beerAvailable
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

    models.beerAvailable
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

    models.beerAvailable
        .insert(beerAvailable)
        .then((result) => {
            res.location(`/beer-available/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const addMultiple = async (req, res) => {
    const beersAvailable = req.body;
    
    try {
        const createdBeers = await Promise.all(beersAvailable.map(async (beer) => {
            const result = await models.beerAvailable.insert(beer);
            return result.rows[0];
        }));              
        res.status(201).json({message: 'Bières ajoutées avec succès', beersAvailbale: createdBeers});
    } catch (error) {
        console.error('Erreur lors de l\'ajout des bières disponibles:', error);
        res.status(500).send('Erreur interne lors de l\'ajout des bières disponibles');
    }
};


const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.beerAvailable
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
    findAssociateBeersAvailable,
    read,
    edit,
    add,
    addMultiple,
    destroy,
};
