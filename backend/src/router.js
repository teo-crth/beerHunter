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

// VALIDATION JOI
const validate = require("./validation/validator");
const { userSchema, userCommentSchema, commentImageSchema, favoriteBarSchema } = require("./validation/schemas/joi.schemas");

// GET
router.get("/api/bars/:id/beers", barControllers.findAssociateBeers);
router.get("/api/bars/:id/comments", barControllers.findAssociateComments);
router.get("/api/bars/:id", barControllers.read);
router.get("/api/bars/city/:city/:region", cityControllers.findAssociateBars);
router.get("/api/bars", barControllers.browse);

router.get("/api/beers/:id", beerControllers.read);
router.get("/api/beers/type/:type", beerTypeControllers.findAssociateBeerType); // A FAIRE ALEX
router.get("/api/beers", beerControllers.browse);

router.get("/api/users/:id/comments/", usersControllers.findAssociateComments);
router.get("/api/users/:id/favorite-bars/", usersControllers.findAssociateFavorites);
router.get("/api/users/:id", usersControllers.read);
router.get("/api/users", usersControllers.browse);

router.get("/api/comments/:id/images", userCommentControllers.findAssociateImages);
router.get("/api/comments/:id", userCommentControllers.read);
router.get("/api/comments", userCommentControllers.browse);

router.get("/api/cities", cityControllers.browse);
router.get("/api/cities/:id", cityControllers.read);

// PUT
router.put("/api/bars/:id", barControllers.edit);
router.put("/api/beers/:id", beerControllers.edit);
router.put("/api/users/:id", validate(userSchema, 'body'), upload.single("profilePicture"), usersControllers.edit);
router.put("/api/comments/:id", validate(userCommentSchema, 'body'), userCommentControllers.edit);
router.put("/api/cities/:id", cityControllers.edit);
router.put("/api/users/:id/favorite-bars/:id", validate(favoriteBarSchema, 'body'), usersControllers.edit); // A FAIRE
router.put("/api/comments/:id/images/:id", validate(commentImageSchema, 'body'), commentImageControllers.edit); // A FAIRE


// POST
router.post("/api/bars", barControllers.add);
router.post("/api/beers", beerControllers.add);
router.post("/api/users", validate(userSchema, 'body'), usersControllers.add);
router.post("/api/comments", validate(userCommentSchema, 'body'), userCommentControllers.add);
router.post("/api/cities", cityControllers.add);
router.post("/api/comments/:id/images", validate(commentImageSchema, 'body'), userCommentControllers.add); // A FAIRE
router.post("/api/users/:id/favorite-bars", validate(favoriteBarSchema, 'body'), usersControllers.add); // A FAIRE

// DELETE
router.delete("/api/bars/:id", barControllers.destroy);
router.delete("/api/beers/:id", beerControllers.destroy);
router.delete("/api/users/:id", usersControllers.destroy);
router.delete("/api/comments/:id", userCommentControllers.destroy);
router.delete("/api/cities/:id", cityControllers.destroy);
router.delete("/api/users/:id/favorite-bars/:id", favoriteBarControllers.destroy); // A FAIRE
router.delete("/api/comments/:id/images/:id", commentImageControllers.destroy); // A FAIRE

module.exports = router;
