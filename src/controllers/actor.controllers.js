const catchError = require("../utils/catchError");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const Controller = require("./");

class ActorController extends Controller {
    constructor()
    {
        super(Actor, [Movie]);
    }

    setMovies()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const {movies} = req.body;
	    const actor = await Actor.findByPk(id);

	    if(!actor)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    await actor.setMovies(movies);

	    const addedMovies = await actor.getMovies();

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: addedMovies
	    });
	});
    }
};

module.exports = ActorController;
