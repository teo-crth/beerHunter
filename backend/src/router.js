const express = require("express");

const router = express.Router();

const barControllers = require("./controllers/barControllers");
const beerControllers = require("./controllers/beerControllers");
const usersControllers = require("./controllers/usersControllers");
const userCommentControllers = require("./controllers/userCommentControllers");
const beerAvailableControllers = require("./controllers/beerAvailableControllers");
const commentImageControllers = require("./controllers/commentImageControllers");

// GET
router.get("/api/bars/:id/beers", beerAvailableControllers.browse);
router.get("/api/bars/:id/comments", barControllers.browse);
router.get("/api/bars/:id", barControllers.read);
router.get("/api/bars/:city", barControllers.browse);
router.get("/api/bars", barControllers.browse);

router.get("/api/beers/:id", beerControllers.read);
router.get("/api/beers/:type", beerControllers.browse);
router.get("/api/beers", beerControllers.browse);

router.get("/api/users/:id/comments/", usersControllers.browse);
router.get("/api/users/:id/favorite-bars/", usersControllers.browse);
router.get("/api/users/:id", usersControllers.read);
router.get("/api/users", usersControllers.browse);

router.get("/api/comments/:id/images", commentImageControllers.browse);
router.get("/api/comments/:id", userCommentControllers.read);
router.get("/api/comments", userCommentControllers.browse);


// PUT
router.put("/api/bars/:id", barControllers.edit);
router.put("/api/beers/:id", beerControllers.edit);
router.put("/api/users/:id", usersControllers.edit);
router.put("/api/comments/:id", userCommentControllers.edit);


// POST
router.post("/api/bars", barControllers.add);
router.post("/api/beers", beerControllers.add);
router.post("/api/users", usersControllers.add);
router.post("/api/comments", userCommentControllers.add);

// DELETE
router.delete("/api/bars/:id", barControllers.destroy);
router.delete("/api/beers/:id", beerControllers.destroy);
router.delete("/api/users/:id", usersControllers.destroy);
router.delete("/api/comments/:id", userCommentControllers.destroy);

module.exports = router;
