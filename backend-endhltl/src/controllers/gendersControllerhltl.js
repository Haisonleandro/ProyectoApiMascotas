import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

export const createGenderhltl = async (req, res) => {
    const { name } = req.body;
    try {
        const newGender = await dbClient.genders.create({
            data: { name }
        });
        res.status(201).json({ 
            message: "Género creado correctamente", 
            data: newGender 
        });
    } catch (err) {
        console.error("Error creando género:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const getGendershltl = async (req, res) => {
    try {
        const genderList = await dbClient.genders.findMany();
        res.status(200).json(genderList);
    } catch (err) {
        console.error("Error obteniendo géneros:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const getGenderByIdhltl = async (req, res) => {
    const { id } = req.params;
    try {
        const gender = await dbClient.genders.findUnique({
            where: { id: parseInt(id) }
        });
        if (!gender) {
            return res.status(404).json({ message: "Género no encontrado" });
        }
        res.status(200).json(gender);
    } catch (err) {
        console.error("Error obteniendo género:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const updateGenderhltl = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedGender = await dbClient.genders.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.status(200).json({ 
            message: "Género actualizado correctamente", 
            data: updatedGender 
        });
    } catch (err) {
        console.error("Error actualizando género:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const deleteGenderhltl = async (req, res) => {
    const { id } = req.params;
    try {
        await dbClient.genders.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "Género eliminado correctamente" });
    } catch (err) {
        console.error("Error eliminando género:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};