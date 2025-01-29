const argon2 = require("argon2");

const models = require("../models");
const { compare } = require("../utils/cryptoPassword");
const { hash } = require("../utils/cryptoPassword");

const browse = (req, res) => {
  models.users
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

const findAssociateComments = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.users
    .findCommentsOfOneUser(id)
    .then((result) => {
      const rows = result.rows;
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAssociateFavorites = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.users
    .findFavoriteBarsOfOneUser(id)
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
  models.users
    .findUser(id)
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

// const edit = (req, res) => {
//   const userData = req.body;

//   // TODO validations (length, format...)

//   userData.id = parseInt(req.params.id, 10);

//   if (req.file) {
//     const profilePicturePath = path.join("assets", "profil-pictures", req.file.filename);
//     userData.profilePicture = profilePicturePath; // Ajoute le chemin de l'image au corps de la requête
//   }

//   models.users
//     .update(userData)
//     .then((result) => {
//       if (result.rowCount === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const edit = (req, res) => {
  let userData = req.body;

  const id = parseInt(req.params.id, 10);
  
  const updatedFields = {};

  if (userData.name) updatedFields.name = userData.name;

  if (userData.email) updatedFields.email = userData.email;

  if (userData.birth_date) updatedFields.birth_date = userData.birth_date;

  if (userData.cityId) updatedFields.city_id = userData.cityId;

  if (userData.theme) updatedFields.theme = userData.theme;

  if (userData.password) updatedFields.password = userData.password;

  if (req.file) {
    const profilePicturePath = path.join("assets", "profil-pictures", req.file.filename);
    updatedFields.profilePicture = profilePicturePath;
  }

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).send('Aucun champ n\'a été modifié');
  }

  models.users
    .update(id, updatedFields)
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

const editPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const id = parseInt(req.params.id, 10);

  if (password !== confirmPassword) {
    res.status(400).send("Les mots de passe ne correspondent pas");
    return;
  }

  const hashPassword = await hash(password);
  
  models.users
    .updatePassword(id, hashPassword)
    .then((result) => {
      if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    }
    )
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const { name, birth_date, email, password, confirmPassword, theme, cityId } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send("Les mots de passe ne correspondent pas");
    return;
  }

  const hashPassword = await hash(password);

  // TODO validations (length, format...)

  models.users
    .insert(name, birth_date, email, hashPassword, theme, cityId)
    .then((result) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.users
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

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("ID, Email and password are required");
    return;
  }

  const { email, password } = req.body;

  try {
    const result = await models.users.findUserByEmail(email);
    const rows = result.rows;
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
  editPassword,
};
