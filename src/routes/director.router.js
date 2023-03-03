const router = require("express").Router();
const DirectorController = require("../controllers/director.controllers");
const director = new DirectorController();

router.route("/").get(director.getAll()).post(director.create());
router.route("/:id/movies").post(director.setMovies());
router.route("/:id").get(director.getOne()).put(director.update()).delete(director.remove());

module.exports = router;
