const express = require("express");

const router = express.Router();

const barControllers = require("./controllers/barControllers");
const beerControllers = require("./controllers/beerControllers");
const usersControllers = require("./controllers/usersControllers");
const userCommentControllers = require("./controllers/userCommentControllers");
const beerAvailableControllers = require("./controllers/beerAvailableControllers");
const commentImageControllers = require("./controllers/commentImageControllers");

// GET
router.get("/bars/:id/beers", beerAvailableControllers.browse);
router.get("/bars/:id/comments", barControllers.browse);
router.get("/bars/:id", barControllers.read);
router.get("/bars/:city", barControllers.browse);
router.get("/bars", barControllers.browse);

router.get("/beers/:id", beerControllers.read);
router.get("/beers/:type", beerControllers.browse);
router.get("/beers", beerControllers.browse);

router.get("/users/:id/comments/", usersControllers.browse);
router.get("/users/:id/favorite-bars/", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.get("/users", usersControllers.browse);

router.get("/comments/:id/images", commentImageControllers.browse);
router.get("/comments/:id", userCommentControllers.read);
router.get("/comments", userCommentControllers.browse);


// PUT
router.put("/bars/:id", barControllers.edit);
router.put("/beers/:id", beerControllers.edit);
router.put("/users/:id", usersControllers.edit);
router.put("/comments/:id", userCommentControllers.edit);


// POST
router.post("/bars", barControllers.add);
router.post("/beers", beerControllers.add);
router.post("/users", usersControllers.add);
router.post("/comments", userCommentControllers.add);

// DELETE
router.delete("/bars/:id", barControllers.destroy);
router.delete("/beers/:id", beerControllers.destroy);
router.delete("/users/:id", usersControllers.destroy);
router.delete("/comments/:id", userCommentControllers.destroy);

module.exports = router;
