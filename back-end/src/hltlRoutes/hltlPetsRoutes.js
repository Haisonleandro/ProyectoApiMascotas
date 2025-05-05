const express = require('express');
const {  hltlCreatePet,hltlGetPets,hltlGetPetById,hltlUpdatePet,hltlDeletePet,} = require('../hltlControllers/hltlPetsControllers.js');

const router = express.Router();

router.post('/hltlregistro', hltlCreatePet );
router.get('/hltllistar', hltlGetPets );
router.get('/hltllistar/:id', hltlGetPetById );
router.put('/hltlactualizar/:id', hltlUpdatePet );
router.delete('/hltleliminar/:id', hltlDeletePet);

module.exports = router;
