import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Función auxiliar para formatear datos de usuario
const formatearUsuario = (usuario) => ({
    ...usuario,
    identificacion: String(usuario.identificacion)
});

export const createUserhltl = async (req, res) => {
    const { identificacion, fullname, email, password, rol } = req.body;
    try {
        if (!password) {
            return res.status(400).json({ mensaje: "Se requiere una contraseña" });
        }

        const contrasenaCifrada = await bcrypt.hash(password, 10);

        await db.users.create({
            data: {
                identificacion: BigInt(identificacion),
                fullname,
                email,
                password: contrasenaCifrada,
                rol
            }
        });

        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch (err) {
        console.error("Error al crear usuario:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getUserhltl = async (req, res) => {
    try {
        const listaUsuarios = await db.users.findMany();
        if (!listaUsuarios.length) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios" });
        }

        res.status(200).json(listaUsuarios.map(formatearUsuario));
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getUserByIdhltl = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await db.users.findUnique({
            where: { identificacion: BigInt(id) }
        });

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(formatearUsuario(usuario));
    } catch (err) {
        console.error("Error al obtener usuario:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const updateUserhltl = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password, rol } = req.body;
    try {
        const datosActualizados = { fullname, email, rol };
        if (password) {
            datosActualizados.password = await bcrypt.hash(password, 10);
        }

        const usuario = await db.users.update({
            where: { identificacion: BigInt(id) },
            data: datosActualizados
        });

        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const deleteUserhltl = async (req, res) => {
    const { id } = req.params;
    try {
        await db.users.delete({
            where: { identificacion: BigInt(id) }
        });
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};