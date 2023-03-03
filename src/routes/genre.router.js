const router = require("express").Router();
const GenreController = require("../controllers/genre.controllers");
const genre = new GenreController();

router.route("/").get(genre.getAll()).post(genre.create());
router.route("/:id/movies").post(genre.setMovies());
router.route("/:id").get(genre.getOne()).put(genre.update()).delete(genre.remove());

module.exports = router;
