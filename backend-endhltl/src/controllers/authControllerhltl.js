import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const loginUserhltl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await db.users.findUnique({ where: { email } });

        if (!foundUser) {
            return res.status(404).json({ message: "No se encontró el usuario" });
        }

        const isPasswordValid = await compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const jwtPayload = {
            userId: Number(foundUser.identificacion),
            userEmail: foundUser.email,
            role: foundUser.rol
        };

        const token = sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Autenticación exitosa",
            token,
            userData: {
                userId: Number(foundUser.identificacion),
                name: foundUser.fullname,
                email: foundUser.email,
                role: foundUser.rol
            }
        });
    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const verifyTokenhltl = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = header.replace("Bearer ", "");

    try {
        const verified = verify(token, process.env.JWT_SECRET);
        req.authUser = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token no válido o caducado" });
    }
};