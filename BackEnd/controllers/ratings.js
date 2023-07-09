const Joi = require('joi');
const { generateError } = require('../helpers');
const { getLinkById } = require('../repositories/linksRepository');
const { addVote, getRating, checkVoted } = require('../repositories/ratingsRepository');

//Crea un esquema de validacion con el paquete Joi
const schema = Joi.number().integer().positive().required();

const schema2 = Joi.number().integer().positive().min(1).max(5).required();


//Registro de un voto de otro usuario a partir del ide de la publicación
const registerVoteController = async (req, res, next) => {
    try {
        const { id } = req.auth; //Obtencion del id a partir de la validacion de usuario

        const { id: linkId } = req.params;  // Obtencion del id de los enlaces a partir de los parametros
        await schema.validateAsync(linkId);
        const { rating } = req.body;
        await schema2.validateAsync(rating);

        const link = await getLinkById(linkId);
        if (!link) {
            throw generateError('No existe una publicacion con ese id', 400);
        }

        const hasVoted = await checkVoted(id, linkId);

        if (hasVoted) {
            res.send({
                status: 'success',
                message: 'ya ha votado o es el creador de la publicacion',
                data: hasVoted
            })
        }

        const ratingId = await addVote(id, linkId, rating);

        res.send({
            status: 'success',
            message: `Votacion realizada exitosamente con id: ${ratingId}`,
            data: { rating },
        });

    } catch (error) {
        next(error);
    }
};

//Obtiene la media y el numero de votos de una publicacion
const getAverageRatings = async (req, res, next) => {

    try {
        const { id: link_id } = req.params;
        await schema.validateAsync(link_id);

        const link = await getLinkById(link_id);
        if (!link) {
            throw generateError('No existe una publicacion con ese id', 400);
        }

        const rating = await getRating(link_id);

        res.send({
            status: 'success',
            rating
        })

    } catch (error) {
        next(error);
    }
}

//Obtiene los votos de un link
const getUserVote = async (req, res, next) => {
    try {
        const userId = req.auth.id;
        const { id: linkId } = req.params;

        await schema.validateAsync(linkId);

        const hasVoted = await checkVoted(userId, linkId);

        res.send({
            status: 'success',
            data: hasVoted,
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    registerVoteController,
    getAverageRatings,
    getUserVote,
}