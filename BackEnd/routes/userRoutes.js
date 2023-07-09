const express = require('express');
const { newUserController, loginController, updateUser, getUserProfile, getUserProfileById, imagenController, getUserLinksController, getUserLinksByIdController, updatePasswordController } = require('../controllers/users');
const validateAuth = require('../middlewares/validateAuth');

const userRoutes = express.Router();


//ENDPOINTS PUBLICOS
userRoutes.route('/').post(newUserController);  //Registro de usuario
userRoutes.route('/login').post(loginController); //Login de usuario

//ENDPOINTS PRIVADOS
userRoutes.route('/profile').all(validateAuth).get(getUserProfile); //Devuelve la informacion del usuario
userRoutes.route('/profile/:id').all(validateAuth).get(getUserProfileById); //Devuelve la informacion del usuario a partir del id
userRoutes.route('/profile').all(validateAuth).get(getUserProfile).put(updateUser); //Actualiza el username, email, password, descripcion y imagen del usuario
userRoutes.route('/upload').all(validateAuth).post(imagenController); // Actualiza unicamente la imagen de perfil del usuario
userRoutes.route('/links').all(validateAuth).get(getUserLinksController); // Muestra los links publicados por el usuario
userRoutes.route('/links/:id').all(validateAuth).get(getUserLinksByIdController); // Muestra los links publicados por el usuario a partir del id pasado por params
userRoutes.route('/password').all(validateAuth).put(updatePasswordController);//Actualiza solo la contraseña del usuario logeado

module.exports = userRoutes;