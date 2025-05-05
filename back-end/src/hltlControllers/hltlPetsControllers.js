const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const hltlCreatePet = async (req, res) => {
  try {
    const { nombre_mascota, Status, races_id, category_id, photo, genders_id_fk, users_id_fk } = req.body;
    const newPet = await prisma.pets.create({
      data: { nombre_mascota, Status, races_id, category_id, photo, genders_id_fk, users_id_fk },
    });
    res.json(newPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGetPets = async (req, res) => {
  try {
    const pets = await prisma.pets.findMany({
      include: { races: true, category: true, users: true, genders: true },
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGetPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pets.findUnique({
      where: { id: parseInt(id) },
      include: { races: true, category: true, users: true, genders: true },
    });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlUpdatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_mascota, Status, races_id, category_id, photo, genders_id_fk, users_id_fk } = req.body;
    const updatedPet = await prisma.pets.update({
      where: { id: parseInt(id) },
      data: { nombre_mascota, Status, races_id, category_id, photo, genders_id_fk, users_id_fk },
    });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlDeletePet = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pets.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Mascota eliminada con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  hltlCreatePet,
  hltlGetPets,
  hltlGetPetById,
  hltlUpdatePet,
  hltlDeletePet,
};