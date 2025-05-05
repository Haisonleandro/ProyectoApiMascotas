const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

const hltlRegistrarUsers = async (req, res) => {
    try {
        console.log("Intentando registrar usuario...");
        console.log("Datos recibidos:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Faltan datos: email o password no proporcionados.");
            return res.status(400).json({ error: "email y password son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log("Contraseña encriptada:", hashedPassword);

        const nuevoUsers = await prisma.users.create({
            data: {
                email: Number(email), 
                password: hashedPassword
            }
        });

        console.log("Usuario registrado con éxito:", nuevoUsers);
        res.status(201).json({ mensaje: "Usuario registrado correctamente", Users: nuevoUsers });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: "Error en el servidor", details: error.message });
    }
};

const hltlloginUsers = async (req, res) => {
    try {
        console.log("Intentando iniciar sesión...");
        console.log("Datos recibidos:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("email o password faltantes.");
            return res.status(400).json({ error: "email y password son obligatorios" });
        }

        const Users = await prisma.users.findUnique({
            where: { email: Number(email) }
        });

        console.log("Usuario encontrado:", Users);

        if (!Users) {
            console.log("Usuario no encontrado.");
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, Users.password);
        console.log("Comparando password, resultado:", passwordMatch);

        if (!passwordMatch) {
            console.log("password incorrecta.");
            return res.status(401).json({ error: "password incorrecta" });
        }

        const token = jwt.sign(
            { email: Users.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Token generado:", token);
        res.json({ token });
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).json({ error: "Error en la autenticación", details: error.message });
    }
};

module.exports = { hltlRegistrarUsers, hltlloginUsers };
