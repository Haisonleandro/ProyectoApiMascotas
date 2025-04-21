const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const generarTokenHLTL = (usuario) => {
    return jwt.sign(
        { id: usuario.emial }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
    );
};

const verificarTokenHLTL = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ mensaje: 'Acceso denegado' });

    try {
        const verificado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido' });
    }
};

module.exports = { generarTokenHLTL, verificarTokenHLTL };
