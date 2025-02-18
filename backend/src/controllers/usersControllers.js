const path = require('path');
require('dotenv').config();
const fs = require('fs'); 
const generateToken = require('../utils/generateToken');

const models = require("../models");
const { compare } = require("../utils/cryptoPassword");
const { hash } = require("../utils/cryptoPassword");
const APP_PORT = process.env.APP_PORT;

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

const edit = (req, res) => {
  let userData = req.body;
  console.log('req.file', req.file);
  
  const id = parseInt(req.params.id, 10);
  
  const updatedFields = {};

  if (userData.name) updatedFields.name = userData.name;

  if (userData.email) updatedFields.email = userData.email;

  if (userData.birth_date) updatedFields.birth_date = userData.birth_date;

  if (userData.cityId) updatedFields.city_id = userData.cityId;

  if (userData.theme) updatedFields.theme = userData.theme;

  if (userData.address) updatedFields.address = userData.address;

  if (userData.password) updatedFields.password = userData.password;

  if (req.file) {   
    const profilePicturePath = path.join("public", "assets", "images", "profil-pictures", req.file.filename);
    const uploadPath = path.join(__dirname, "..", "..", "public", "assets", "images", "profil-pictures");
    const uploadedFileName = req.file.filename;
    const imageUrl = `/assets/images/profil-pictures/${req.file.filename}`;
    updatedFields.profil_picture = imageUrl;

    const oldImageName = `id${id}-`;
    const filesInDirectory = fs.readdirSync(uploadPath);
  
    filesInDirectory.forEach(file => {
      if (file.startsWith(oldImageName) && file !== uploadedFileName) {
        const oldFilePath = path.join(uploadPath, file);
        fs.unlinkSync(oldFilePath);
        console.log(`Ancienne image supprimée: ${file}`);
      }
    });
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
  const { name, email, birth_date, cityId, password, confirmPassword, theme, profil_picture } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send("Les mots de passe ne correspondent pas");
    return;
  }

  const hashPassword = await hash(password);

  // TODO validations (length, format...)

  models.users
    .insert(email, birth_date, hashPassword, cityId, name, theme, profil_picture)
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

    const token = generateToken(account);
    res.status(200).send({ 
      token, 
      id: account.id, 
      name: account.name, 
      profil_picture: account.profil_picture, 
      theme: account.theme,
      cityId: account.city_id,
      birth_date: account.birth_date,
      email: account.email,
      address: account.address
    });
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
