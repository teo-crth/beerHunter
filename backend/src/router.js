const express = require("express");
const upload = require("./services/middleware/upload");

const router = express.Router();

// CONTROLLERS
const barControllers = require("./controllers/barControllers");
const beerControllers = require("./controllers/beerControllers");
const usersControllers = require("./controllers/usersControllers");
const userCommentControllers = require("./controllers/userCommentControllers");
const beerTypeControllers = require("./controllers/beerTypeControllers");
const cityControllers = require("./controllers/cityControllers");
const favoriteBarControllers = require("./controllers/favoriteBarControllers");
const commentImageControllers = require("./controllers/commentImageControllers");
const jwtMiddleware = require("./services/middleware/jwt.token");

// VALIDATION JOI
const validate = require("./validation/validator");
const { createUserSchema, updatePasswordUserSchema, updateUserSchema, userCommentSchema, commentImageSchema, favoriteBarSchema, barSchema, loginSchema } = require("./validation/schemas/joi.schemas");

// CONNEXION
router.post("/api/login", validate(loginSchema, 'body'), usersControllers.login);

// GET
router.get("/api/bars/city/:city/:region", cityControllers.findAssociateBars);
router.get("/api/bars/:id/beers", barControllers.findAssociateBeers);
router.get("/api/bars/:id/comments", barControllers.findAssociateComments);
router.get("/api/bars/:id", barControllers.read);
router.get("/api/bars", barControllers.browse);

router.get("/api/beers/type/:type", beerTypeControllers.findAssociateBeerType);
router.get("/api/beertypes/:id", beerTypeControllers.read);
router.get("/api/beertypes", beerTypeControllers.browse);
router.get("/api/beers/:id", beerControllers.read);
router.get("/api/beers", beerControllers.browse);

router.get("/api/users/:id/comments/", jwtMiddleware, usersControllers.findAssociateComments);
router.get("/api/users/:id/favorite-bars/", jwtMiddleware, usersControllers.findAssociateFavorites);
router.get("/api/users/:id", jwtMiddleware, usersControllers.read);
router.get("/api/users", jwtMiddleware, usersControllers.browse);

router.get("/api/comments/:id/images", userCommentControllers.findAssociateImages);
router.get("/api/comments/:id", userCommentControllers.read);
router.get("/api/comments", userCommentControllers.browse);

router.get("/api/cities/:id", cityControllers.read);
router.get("/api/cities", cityControllers.browse);

// PUT
router.put("/api/passwordUsers/:id", jwtMiddleware, validate(updatePasswordUserSchema, 'body'), usersControllers.editPassword);
router.put("/api/users/:id",  jwtMiddleware, upload.single("profil_picture"), validate(updateUserSchema, 'body'), usersControllers.edit);
router.put("/api/beertype/:id", beerTypeControllers.edit);
router.put("/api/comments/:id", jwtMiddleware, validate(userCommentSchema, 'body'), userCommentControllers.edit);
router.put("/api/favorite-bars/:id", jwtMiddleware, validate(favoriteBarSchema, 'body'), favoriteBarControllers.edit);

// POST
router.post("/api/bars", jwtMiddleware, validate(barSchema, 'body'), barControllers.add);
router.post("/api/beers", jwtMiddleware, beerControllers.add);
router.post("/api/users", validate(createUserSchema, 'body'), usersControllers.add);
router.post("/api/comments", jwtMiddleware, validate(userCommentSchema, 'body'), userCommentControllers.add);
router.post("/api/comment-images", jwtMiddleware, validate(commentImageSchema, 'body'), commentImageControllers.add); 
router.post("/api/favorite-bars", jwtMiddleware, validate(favoriteBarSchema, 'body'), favoriteBarControllers.add);

// DELETE
router.delete("/api/bars/:id", jwtMiddleware, barControllers.destroy);
router.delete("/api/users/:id", jwtMiddleware, usersControllers.destroy);
router.delete("/api/comments/:id", jwtMiddleware, userCommentControllers.destroy);
router.delete("/api/favorite-bars/:id", jwtMiddleware, favoriteBarControllers.destroy);
router.delete("/api/comment-images/:id", jwtMiddleware, commentImageControllers.destroy);

module.exports = router;
