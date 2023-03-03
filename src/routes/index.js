const express = require('express');
const router = express.Router();
const genre = require("./genre.router");
const actor = require("./actor.router");
const movie = require("./movie.router");
const director = require("./director.router");

// colocar las rutas aquí
router.use("/genres", genre);
router.use("/actors", actor);
router.use("/movies", movie);
router.use("/directors", director);

module.exports = router;
