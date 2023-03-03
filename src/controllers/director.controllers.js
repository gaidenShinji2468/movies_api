const catchError = require("../utils/catchError");
const Director = require("../models/Director");
const Movie = require("../models/Movie");
const Controller = require("./");

class DirectorController extends Controller {
    constructor()
    {
        super(Director, [Movie]);
    }

    setMovies()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {movies} = req.body;
	    const director = await Director.findByPk(id);

	    if(!director)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    await director.setMovies(movies);

	    const addedMovies = await director.getMovies();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedMovies
	    });
	});
    }
};

module.exports = DirectorController;
