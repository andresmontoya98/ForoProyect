const Joi = require('joi');
const { getCommentsByLinkId, createComment, getCommentById, deleteCommentById } = require("../repositories/commentsRepository");
const { generateError } = require('../helpers');

const schema = Joi.object().keys({
  comment_text: Joi.string().min(1).max(500).required()
});

const schema2 = Joi.number().integer().positive().required();

// Devuelve todos los comentarios de un link por ID
const getCommentsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await getCommentsByLinkId(id);

    res.send({
      status: 'success',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// Crea un comentario para un link
const createCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schema.validateAsync(body);
    const { comment_text } = body;

    const userId = req.auth.id;

    const commentId = await createComment(userId, id, comment_text);

    res.send({
      status: 'success',
      message: `Comentario con ID: ${commentId} creado correctamente!!`,
      data: { comment_text },
    });
  } catch (error) {
    next(error);
  }
};

//Borra un comentario de un usuario registrado
const deleteCommentController = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const { id } = req.params;
    await schema2.validateAsync(id);

    const comment = await getCommentById(id);
    const { comment_text } = comment;

    if (userId !== comment.user_id) {
      throw generateError('Estas tratando de borrar un comentario que no es tuyo!!', 401);
    }

    await deleteCommentById(id);

    res.send({
      status: 'success',
      message: `El comentario con id: ${id} fue borrado exitosamente!!`,
      data: { comment_text },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsController,
  createCommentController,
  deleteCommentController,
};
