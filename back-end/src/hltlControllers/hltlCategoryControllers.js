const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const hltlCreateCategory = async (req, res) => {
  try {
    const { category_id,name} = req.body;
    const newCategory = await prisma.category.create({
      data: { category_id, name },
    });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });

    
  }
};

const hltlGetCategory = async (req, res) => {
  try {
    const Category = await prisma.category.findMany({
      include: { category: true, name: true,},
    });
    res.json(Category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlGetCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, name: true, },
    });
    res.json(Category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlUpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, } = req.body;
    const updatedcategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { category_id, name, },
    });
    res.json(updatedcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hltlDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'categoria eliminada con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    hltlCreateCategory,
    hltlGetCategory,
    hltlGetCategoryById,
    hltlUpdateCategory,
    hltlDeleteCategory
};