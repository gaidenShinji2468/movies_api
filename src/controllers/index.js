const catchError = require("../utils/catchError");

class Controller {
    constructor(Schema, include)
    {
        this.schema = Schema;
	this.include = include;
    }

    getAll()
    {
        return catchError(async (req, res) => {
            const data = await this.schema.findAll({include: this.include});
            
	    return res.status(200).json({
                statusCode: 200,
		message: "Reading Success",
		data
	    });
	});
    }

    getOne()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const data = await this.schema.findByPk(id, {include: this.include});

	    if(!data)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});


	    return res.status(200).json({
                statusCode: 200,
		message: "Reading Success",
		data
	    });
	});
    }

    create()
    {
        return catchError(async (req, res) => {
            const data = req.body;
	    const createdObj = await this.schema.create(data);

	    return res.status(201).json({
                statusCode: 201,
		message: "Created Success",
		data: createdObj
	    });
	});
    }

    update()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const data = req.body;
	    const updatedObj = await this.schema.update(data, {
                where: {id},
		returning: true
	    });

	    if(!updatedObj[1].length)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    return res.status(200).json({
                statusCode: 200,
		message: "Updated Success",
		data: updatedObj[1][0]
	    });
	});
    }

    remove()
    {
        return catchError(async (req, res) => {
            const {id} = req.params;
	    const deletedObj = await this.schema.destroy({
		where: {id},
		returning: true
	    });

	    if(!deletedObj)
		return res.status(404).json({
                    statusCode: 404,
		    message: "Not Found"
		});

	    return res.sendStatus(204);
	});
    }
};

module.exports = Controller;
