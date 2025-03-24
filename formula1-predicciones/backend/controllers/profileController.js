// backend/controllers/profileController.js
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs'); // Para eliminar el archivo temporal

exports.updateProfile = async (req, res) => {
  const { displayName } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario desde el token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.displayName = displayName;

    if (req.file) {
      // Subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_images', // Carpeta en Cloudinary
      });
      user.profileImage = result.secure_url; // Guardar la URL de la imagen

      fs.unlinkSync(req.file.path);
    }
    console.log(user);
    
    await user.save();
    res.status(200).json({ message: 'Perfil actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      profileImage: user.profileImage,
      displayName: user.displayName,
      totalPoints: user.totalPoints,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error });
  }
};