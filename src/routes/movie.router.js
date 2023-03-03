const router = require("express").Router();
const MovieController = require("../controllers/movie.controllers");
const movie = new MovieController();

router.route("/").get(movie.getAll()).post(movie.create());
router.route("/:id/genres").post(movie.setGenres());
router.route("/:id/actors").post(movie.setActors());
router.route("/:id/directors").post(movie.setDirectors());
router.route("/:id").get(movie.getOne()).put(movie.update()).delete(movie.remove());

module.exports = router;
