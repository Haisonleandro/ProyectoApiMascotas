const express = require('express');
const {hltlCreateCategory,hltlGetCategory,hltlGetCategoryById,hltlUpdateCategory,hltlDeleteCategory} = require('../hltlControllers/hltlCategoryControllers.js');

const router = express.Router();

router.post('/hltlregistro', hltlCreateCategory );
router.get('/hltllistar', hltlGetCategory );
router.get('/hltllistar/:id', hltlGetCategoryById );
router.put('/hltlactualizar/:id', hltlUpdateCategory );
router.delete('/hltleliminar/:id', hltlDeleteCategory);

module.exports = router;
