const argon2 = require("argon2");

const models = require("../models");
const { compare } = require("../utils/cryptoPassword");
const { hash } = require("../utils/cryptoPassword");

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

const add = async (req, res) => {
  const { name, birth_date, email, password, confirmPassword, theme, city } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send("Les mots de passe ne correspondent pas");
    return;
  }

  const hashPassword = await hash(password);

  // TODO validations (length, format...)

  models.users
    .insert(name, birth_date, email, hashPassword, theme, city)
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
    res.status(400).send("ID, Email and password are required");
    return;
  }

  const { email, password } = req.body;

  try {
    const [rows] = await models.users.findUserByEmail(email);

    if (!rows[0]) {
      res.status(401).send("L'email ou le mot de passe est incorrect");
      return;
    }

    const account = rows[0];
    const passwordIsCorrect = await compare(password, account.password);

    if (!passwordIsCorrect) {
      res.status(401).send("L'email ou le mot de passe est incorrect");
      return;
    }

    res.status(200).send("Vous êtes connecté");

    // Tu peux renvoyer l'account ou un token si tu veux ici (ex: pour l'authentification par token)

  } catch (err) {
    console.error(err);
    res.status(500).send("Une erreur est survenue, veuillez réessayer.");
  }
};


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
