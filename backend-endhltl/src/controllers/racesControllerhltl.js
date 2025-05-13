import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

export const createRacehltl = async (req, res) => {
    const { name } = req.body;
    try {
        await dbClient.races.create({
            data: { name }
        });
        res.status(201).json({ mensaje: "Raza registrada correctamente" });
    } catch (err) {
        console.error("Error al crear raza:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getRaceshltl = async (req, res) => {
    try {
        const listaRazas = await dbClient.races.findMany();
        res.status(200).json(listaRazas);
    } catch (err) {
        console.error("Error al obtener razas:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getRaceByIdhltl = async (req, res) => {
    const { id } = req.params;
    try {
        const raza = await dbClient.races.findUnique({
            where: { id: parseInt(id) }
        });
        if (!raza) {
            return res.status(404).json({ mensaje: "Raza no encontrada" });
        }
        res.status(200).json(raza);
    } catch (err) {
        console.error("Error al obtener raza:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const updateRacehltl = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await dbClient.races.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.status(200).json({ mensaje: "Raza actualizada correctamente" });
    } catch (err) {
        console.error("Error al actualizar raza:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const deleteRacehltl = async (req, res) => {
    const { id } = req.params;
    try {
        await dbClient.races.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ mensaje: "Raza eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar raza:", err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};