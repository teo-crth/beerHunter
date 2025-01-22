const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Le dossier où l'image sera enregistrée
    cb(null, path.join(__dirname, "..", "public", "assets", "images", "profil-pictures"));
  },
  filename: (req, file, cb) => {
    // Le nom de l'image avec un timestamp pour éviter les conflits
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // .jpg, .png, etc.
  }
});

// Accept (jpg, png, jpeg, gif, webp)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png|gif|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accepter le fichier
  }
  cb(new Error("Seules les images (jpg, jpeg, png, gif) sont autorisées"), false);
};

// File size 2MO max)
const limits = { fileSize: 2 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
