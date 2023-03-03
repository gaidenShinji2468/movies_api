const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");
const Controller = require("./");

class GenreController extends Controller {
    constructor()
    {
        super(Genre, [Movie]);
    }

    setMovies()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {movies} = req.body;
	    const genre = await Genre.findByPk(id);

	    if(!genre)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    await genre.setMovies(movies);

	    const addedMovies = await genre.getMovies();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedMovies
	    });
	});
    }
};

module.exports = GenreController;
