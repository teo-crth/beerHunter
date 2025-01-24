const argon2 = require("argon2");

const models = require("../models");

const browse = (req, res) => {
  models.users
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAssociateComments = (req, res) => {
  models.users
    .findCommentsOfOneUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAssociateFavorites = (req, res) => {
  models.users
    .findFavoriteBarsOfOneUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.users
    .find(req.params.id)
    .then(([rows]) => {
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
  const userData = req.body;

  // TODO validations (length, format...)

  userData.id = parseInt(req.params.id, 10);

  if (req.file) {
    const profilePicturePath = path.join("assets", "profil-pictures", req.file.filename);
    userData.profilePicture = profilePicturePath; // Ajoute le chemin de l'image au corps de la requête
  }

  models.users
    .update(userData)
    .then(([result]) => {
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
  const users = req.body;

  // TODO validations (length, format...)

  models.users
    .insert(users)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.users
    .delete(req.params.id)
    .then(([result]) => {
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

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);
    res.send("ID, Email and password are required");
    return;
  }

  const {email, password} = req.body;
  const account = await models.users
    .findUserByEmail(email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(401);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });

  if (!account) {
    res.sendStatus(401);
    res.send('L\'email ou le mot de passe est incorrect');
    return;
  }

  const passwordIsCorrect = await argon2.verify(account.password, password);

  if (!passwordIsCorrect) {
    res.sendStatus(401);
    res.send('L\'email ou le mot de passe est incorrect');
    return;
  }


}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findAssociateComments,
  findAssociateFavorites,
  login,
};
