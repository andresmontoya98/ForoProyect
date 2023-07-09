const { getConnection } = require('../db/db');

//Crea una valoracion de la publicacion
const addVote = async (user_id, link_id, rating) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
            INSERT INTO ratings (user_id, link_id, rating)
            VALUES(?,?,?)
        `,
            [user_id, link_id, rating]
        );

        return result.insertId;

    } finally {
        if (connection) connection.release();
    }
};

//Selecciona la media y la cantidad de votaciones sobre una publicacion
const getRating = async (link_id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
            SELECT AVG(rating) as media,
            COUNT(rating) as numVotos
            FROM ratings WHERE link_id = ?
        `,
            [link_id]);

        return result[0];

    } finally {
        if (connection) connection.release();
    }
};

//Comprueba si el usuario puede o ya en el link
const checkVoted = async (userId, linkId) => {
    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(`
            SELECT * FROM ratings WHERE user_id = ? AND link_Id = ?
        `,
            [userId, linkId]);

        const [links] = await connection.query(`
            SELECT * FROM links WHERE user_id = ? AND id = ?
        `,
            [userId, linkId]);

        if (result.length > 0 || links.length > 0) {
            return false
        }

        return true;

    } finally {
        if (connection) connection.release();
    }
}



module.exports = {
    addVote,
    getRating,
    checkVoted,
}