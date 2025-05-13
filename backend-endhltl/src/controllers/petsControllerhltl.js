import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Función auxiliar para formatear datos de mascotas
const formatearMascota = (mascota) => ({
    ...mascota,
    User_id: String(mascota.User_id),
    user: mascota.user ? {
        ...mascota.user,
        identificacion: String(mascota.user.identificacion)
    } : null
});

export const createPethltl = async (req, res) => {
    const { race_id, category_id, gender_id, User_id, name, estado, latitude, longitude } = req.body;
    try {
        // Validar entradas
        if ([race_id, category_id, gender_id, User_id].some(id => isNaN(id))) {
            return res.status(400).json({ mensaje: "Los IDs proporcionados no son válidos" });
        }

        // Validar coordenadas si se proporcionan
        if (latitude !== undefined && longitude !== undefined) {
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ mensaje: "Coordenadas no válidas" });
            }
        }

        // Manejar la carga de la foto
        const foto = req.file?.filename || null;

        // Crear nueva mascota
        const nuevaMascota = await db.pets.create({
            data: {
                race: { connect: { id: parseInt(race_id) } },
                category: { connect: { id: parseInt(category_id) } },
                gender: { connect: { id: parseInt(gender_id) } },
                user: { connect: { identificacion: BigInt(User_id) } },
                name,
                photo: foto,
                estado,
                latitude: latitude ? Number(latitude) : null,
                longitude: longitude ? Number(longitude) : null
            },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true
            }
        });

        res.status(201).json({
            mensaje: "Mascota registrada correctamente",
            mascota: formatearMascota(nuevaMascota)
        });
    } catch (err) {
        console.error("Error al crear mascota:", err);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: err.message
        });
    }
};

export const getPetshltl = async (req, res) => {
    try {
        const listaMascotas = await db.pets.findMany({
            include: {
                race: true,
                category: true,
                gender: true,
                user: true
            }
        });

        res.status(200).json(listaMascotas.map(formatearMascota));
    } catch (err) {
        console.error("Error al obtener mascotas:", err);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: err.message
        });
    }
};

export const getPetByIdhltl = async (req, res) => {
    const { id } = req.params;
    try {
        const mascota = await db.pets.findUnique({
            where: { id: parseInt(id) },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true
            }
        });

        if (!mascota) {
            return res.status(404).json({ mensaje: "Mascota no encontrada" });
        }

        res.status(200).json(formatearMascota(mascota));
    } catch (err) {
        console.error("Error al obtener mascota:", err);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: err.message
        });
    }
};

export const updatePethltl = async (req, res) => {
    const { id } = req.params;
    const { race_id, category_id, gender_id, User_id, name, photo, estado, latitude, longitude } = req.body;
    try {
        // Validar coordenadas si se proporcionan
        if (latitude !== undefined && longitude !== undefined) {
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ mensaje: "Coordenadas no válidas" });
            }
        }

        const mascotaActualizada = await db.pets.update({
            where: { id: parseInt(id) },
            data: {
                race_id: race_id ? parseInt(race_id) : undefined,
                category_id: category_id ? parseInt(category_id) : undefined,
                gender_id: gender_id ? parseInt(gender_id) : undefined,
                User_id: User_id ? BigInt(User_id) : undefined,
                name,
                photo: req.file ? req.file.filename : photo,
                estado,
                latitude: latitude ? Number(latitude) : null,
                longitude: longitude ? Number(longitude) : null
            },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true
            }
        });

        res.status(200).json({
            mensaje: "Mascota actualizada correctamente",
            mascota: formatearMascota(mascotaActualizada)
        });
    } catch (err) {
        console.error("Error al actualizar mascota:", err);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: err.message
        });
    }
};

export const deletePethltl = async (req, res) => {
    const { id } = req.params;
    try {
        await db.pets.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ mensaje: "Mascota eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar mascota:", err);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: err.message
        });
    }
};