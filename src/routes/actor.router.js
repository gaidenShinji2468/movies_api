const router = require("express").Router();
const ActorController = require("../controllers/actor.controllers");
const actor = new ActorController();

router.route("/").get(actor.getAll()).post(actor.create());
router.route("/:id/movies").post(actor.setMovies());
router.route("/:id").get(actor.getOne()).put(actor.update()).delete(actor.remove());

module.exports = router;
