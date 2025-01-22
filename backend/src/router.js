const express = require("express");
const upload = require("./services/middleware/upload");

const router = express.Router();

const barControllers = require("./controllers/barControllers");
const beerControllers = require("./controllers/beerControllers");
const usersControllers = require("./controllers/usersControllers");
const userCommentControllers = require("./controllers/userCommentControllers");
const beerTypeControllers = require("./controllers/beerTypeControllers");
const cityControllers = require("./controllers/cityControllers");

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
router.get("/api/users/:id/favorite-bars/", usersControllers.findAssociateFavorite);
router.get("/api/users/:id", usersControllers.read);
router.get("/api/users", usersControllers.browse);

router.get("/api/comments/:id/images", userCommentControllers.findAssociateImage);
router.get("/api/comments/:id", userCommentControllers.read);
router.get("/api/comments", userCommentControllers.browse);

router.get("/api/cities", cityControllers.browse);
router.get("/api/cities/:id", cityControllers.read);

// PUT
router.put("/api/bars/:id", barControllers.edit);
router.put("/api/beers/:id", beerControllers.edit);
router.put("/api/users/:id", upload.single("profilePicture"), usersControllers.edit);
router.put("/api/comments/:id", userCommentControllers.edit);
router.put("/api/cities/:id", cityControllers.edit);

// POST
router.post("/api/bars", barControllers.add);
router.post("/api/beers", beerControllers.add);
router.post("/api/users", usersControllers.add);
router.post("/api/comments", userCommentControllers.add);
router.post("/api/cities/:id", cityControllers.add);

// DELETE
router.delete("/api/bars/:id", barControllers.destroy);
router.delete("/api/beers/:id", beerControllers.destroy);
router.delete("/api/users/:id", usersControllers.destroy);
router.delete("/api/comments/:id", userCommentControllers.destroy);
router.delete("/api/cities/:id", cityControllers.destroy);

module.exports = router;
