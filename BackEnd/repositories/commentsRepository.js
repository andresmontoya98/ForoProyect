const { getConnection } = require('../db/db');
const { generateError } = require('../helpers');

// Devuelve todos los comentarios de un link
const getCommentsByLinkId = async (linkId) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT c.id, c.user_id, c.link_id, c.comment_text, c.created_at, u.username
      FROM comments c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.link_id = ?
      ORDER BY c.created_at DESC
      `,
      [linkId]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

// Crea un comentario para un link
const createComment = async (userId, linkId, commentText) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO comments (user_id, link_id, comment_text)
      VALUES (?, ?, ?)
      `,
      [userId, linkId, commentText]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//Devuelve el link a partir del id
const getCommentById = async (id) => {
  let connection;

  try {
      connection = await getConnection();

      const [result] = await connection.query(`
          SELECT * FROM comments WHERE id = ?
      `,
          [id]);

      if (result.length === 0) {
          throw generateError(`El comentario con ID: ${id} no existe`, 404);
      }

      return result[0];
  } finally {
      if (connection) connection.release();
  }
};


//Borra el link a partir del id
const deleteCommentById = async (id) => {
  let connection;

  try {
      connection = await getConnection();

      await connection.query(`
          DELETE FROM comments WHERE id = ?
      `,
          [id]);

      return;
  } finally {
      if (connection) connection.release();
  }
};

module.exports = {
  getCommentsByLinkId,
  createComment,
  getCommentById,
  deleteCommentById,
};