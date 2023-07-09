const express = require('express');
const validateAuth = require('../middlewares/validateAuth');
const { getLinksController, newLinkController, deleteLinkController, getSingleLinkController, updateLinkController } = require('../controllers/links');
const { registerVoteController, getAverageRatings, getUserVote } = require('../controllers/ratings');
const { getCommentsController, createCommentController, deleteCommentController } = require('../controllers/comments');

const linkRoutes = express.Router();


//ENDPOINTS PRIVADOS
linkRoutes.route('/create').all(validateAuth).post(newLinkController); //Permite crear una publicacion de un enlace.
linkRoutes.route('/:id').all(validateAuth).delete(deleteLinkController); //Permite borrar una publicacion si eres quien la creo
linkRoutes.route('/:id/ratings').all(validateAuth).post(registerVoteController); //Permite votar un enlace de otro usuario
linkRoutes.route('/').all(validateAuth).get(getLinksController); //Mostrar todos los enlaces publicados
linkRoutes.route('/:id/average').all(validateAuth).get(getAverageRatings); //Mostrar la media de las valoraciones de una publicacion
linkRoutes.route('/:id').all(validateAuth).get(getUserVote); //Mostrar si un usuario ha votado en un enlace
linkRoutes.route('/link-detail/:id').all(validateAuth).get(getSingleLinkController); // Mostrar un enlace publicado por id
linkRoutes.route('/edit/:id').all(validateAuth).put(updateLinkController); //Permite editar un link
linkRoutes.route('/comments/:id').all(validateAuth).get(getCommentsController); //Muestra los comentarios de un link
linkRoutes.route('/comments/:id').all(validateAuth).post(createCommentController); //Crea un comentario para un link
linkRoutes.route('/comments/:id').all(validateAuth).delete(deleteCommentController);//Permite borrar un comentario si eres quien la creo


module.exports = linkRoutes;