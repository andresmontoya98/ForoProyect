const Joi = require('joi');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const nanoid = require('nanoid');
const { getAllLinks, createLink, getLinkById, deleteLinkById, updateLinkById } = require("../repositories/linksRepository");
const { generateError } = require('../helpers');

//Crea un esquema de validacion con el paquete Joi
const schema = Joi.object().keys({
  url: Joi.string().min(10).max(400).required(),
  titulo: Joi.string().min(3).max(15).required(),
  description: Joi.string().min(10).max(200).required()
});

const schema2 = Joi.number().integer().positive().required();

const validExtension = ['.jpeg', '.jpg', '.png', '.webp'];

//Devuelve todos los links publicados
const getLinksController = async (req, res, next) => {
  try {

    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);


    const links = await getAllLinks(limit, offset);

    res.send({
      status: 'success',
      data: links,
    })

  } catch (error) {
    next(error);
  }
};

//Crea la publiacion de un link de un usuario registrado
const newLinkController = async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { url, titulo, description, image } = body;

    const userId = req.auth.id;
    let imageName = '';

    if (req.files) {
      const { picture } = req.files;
      const extension = path.extname(picture.name);

      //validamos la extension de la imagen
      if (!validExtension.includes(extension)) {
        throw generateError('Formato no válido', 400);
      }

      //crea la ruta de la imagen
      const pathPicture = path.join(__dirname, '../public/links');


      if (image) {
        await fs.unlink(`${pathPicture}/${image}`);
      }

      imageName = `${nanoid(24)}.jpg`;
      const pathImage = `${pathPicture}/${imageName}`;

      //Redimensiona la imagen
      await sharp(picture.data).resize(500, 500).toFile(pathImage);
    }

    const id = await createLink(userId, url, titulo, description, imageName);

    res.send({
      status: 'success',
      message: `Links con id: ${id} creado correctamente!!`,
      data: { url, titulo, description, imageName },
    });

  } catch (error) {
    next(error);
  }
};

const updateLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schema.validateAsync(body);

    const { url, titulo, description, image } = body;

    const userId = req.auth.id;

    const link = await getLinkById(id);

    if (userId !== link.user_id) {
      throw generateError('Estás tratando de editar un link que no es tuyo!!', 401);
    }

    let imageName = link.image;

    if (req.files) {
      const { picture } = req.files;
      const extension = path.extname(picture.name);

      //valida la extension de la imagen
      if (!validExtension.includes(extension)) {
        throw generateError('Formato no válido', 400);
      }

      //crea la ruta de la imagen
      const pathPicture = path.join(__dirname, '../public/links');


      if (image) {
        await fs.unlink(`${pathPicture}/${image}`);
      }

      imageName = `${nanoid(24)}.jpg`;
      const pathImage = `${pathPicture}/${imageName}`;

      //Redimensiona la imagen
      await sharp(picture.data).resize(500, 500).toFile(pathImage);
    }

    await updateLinkById(id, url, titulo, description, imageName);

    res.send({
      status: 'success',
      message: `El link con id: ${id} fue editado exitosamente!!`,
      data: { url, titulo, description, imageName },
    });

  } catch (error) {
    next(error);
  }
};

//Borra una publicacion de un usuario registrado
const deleteLinkController = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const { id } = req.params;
    await schema2.validateAsync(id);

    const link = await getLinkById(id);
    const { url, titulo } = link;

    if (userId !== link.user_id) {
      throw generateError('Estas tratando de borrar un link que no es tuyo!!', 401);
    }

    await deleteLinkById(id);

    res.send({
      status: 'success',
      message: `El link con id: ${id} fue borrado exitosamente!!`,
      data: { titulo, url },
    });

  } catch (error) {
    next(error);
  }
};


//Devuelve el link por ID
const getSingleLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const link = await getLinkById(id);

    res.send({
      status: 'success',
      data: link,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinksController,
  newLinkController,
  deleteLinkController,
  getSingleLinkController,
  updateLinkController,
}