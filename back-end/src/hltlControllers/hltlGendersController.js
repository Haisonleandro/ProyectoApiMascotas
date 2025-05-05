const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const hltlCreateGenders = async (req, res) => {
  try {
    const { genders_id,name} = req.body;
    const newGenders = await prisma.genders.create({
      data: { genders_id, name },
    });
    res.json(newGenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGetGenders = async (req, res) => {
  try {
    const Genders = await prisma.genders.findMany({
      include: { genders: true, name: true,},
    });
    res.json(Genders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGeGendersById = async (req, res) => {
  try {
    const { id } = req.params;
    const Genders = await prisma.genders.findUnique({
      where: { id: parseInt(id) },
      include: { genders_id: true, name: true, },
    });
    res.json(Genders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlUpdateGenders = async (req, res) => {
  try {
    const { id } = req.params;
    const { genders_id, name, } = req.body;
    const updatedgenders = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { genders_id, name, },
    });
    res.json(updatedgenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlDeleteGenders = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.genders.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'genero eliminada con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  hltlCreateGenders,
  hltlGetGenders,
  hltlGeGendersById,
  hltlUpdateGenders,
  hltlDeleteGenders,
};