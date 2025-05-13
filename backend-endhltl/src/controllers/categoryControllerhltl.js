import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const createCategoryhltl = async (req, res) => {
    const { name } = req.body;
    try {
        await db.categories.create({
            data: { name }
        });
        res.status(201).json({ message: "Categoría creada exitosamente" });
    } catch (err) {
        console.error("Error al crear categoría:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const getCategorieshltl = async (req, res) => {
    try {
        const allCategories = await db.categories.findMany();
        res.status(200).json(allCategories);
    } catch (err) {
        console.error("Error al obtener categorías:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const getCategoryByIdhltl = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await db.categories.findUnique({
            where: { id: parseInt(id) }
        });
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(category);
    } catch (err) {
        console.error("Error al obtener categoría:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const updateCategoryhltl = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await db.categories.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (err) {
        console.error("Error al actualizar categoría:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const deleteCategoryhltl = async (req, res) => {
    const { id } = req.params;
    try {
        await db.categories.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        res.status(500).json({ message: "Error del servidor" });
    }
};