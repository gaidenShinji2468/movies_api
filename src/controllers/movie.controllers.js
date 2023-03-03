const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Controller = require("./");

class MovieController extends Controller {
    constructor()
    {
        super(Movie, [Genre, Actor, Director]);
    }

    setGenres()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {genres} = req.body;
	    const movie = await Movie.findByPk(id);
	    
	    if(!movie)
	        return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});
	    
	    await movie.setGenres(genres);
	    
	    const addedGenres = await movie.getGenres();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedGenres
	    });
	});
    }

    setActors()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {actors} = req.body;
	    const movie = await Movie.findByPk(id);

	    if(!movie)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    await movie.setActors(actors);

	    const addedActors = await movie.getActors();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedActors
	    });
	});
    }

    setDirectors()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {directors} = req.body;
	    const movie = await Movie.findByPk(id);

	    if(!movie)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    await movie.setDirectors(directors);

	    const addedDirectors = await movie.getDirectors();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedDirectors
	    });
	});
    }
};

module.exports = MovieController;
