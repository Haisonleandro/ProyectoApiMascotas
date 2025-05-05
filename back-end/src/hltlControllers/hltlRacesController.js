const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const hltlCreateRaces = async (req, res) => {
  try {
    const { races_id,name} = req.body;
    const newRaces = await prisma.races.create({
      data: { races_id, name },
    });
    res.json(newRaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGetRaces = async (req, res) => {
  try {
    const Races = await prisma.races.findMany({
      include: { races: true, name: true,},
    });
    res.json(Races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGeRacesById = async (req, res) => {
  try {
    const { id } = req.params;
    const Races = await prisma.races.findUnique({
      where: { id: parseInt(id) },
      include: { races_id: true, name: true, },
    });
    res.json(Races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlUpdateRaces = async (req, res) => {
  try {
    const { id } = req.params;
    const { races_id, name, } = req.body;
    const updatedraces = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { races_id, name, },
    });
    res.json(updatedraces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlDeleteRaces = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.races.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'raza eliminada con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  hltlCreateRaces,
  hltlGetRaces,
  hltlGeRacesById,
  hltlUpdateRaces,
  hltlDeleteRaces
};