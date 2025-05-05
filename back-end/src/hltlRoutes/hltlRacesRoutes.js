const express = require('express');
const {  hltlCreateRaces,hltlGetRaces,hltlGeRacesById,hltlUpdateRaces,hltlDeleteRaces} = require('../hltlControllers/hltlRacesController.js');

const router = express.Router();

router.post('/hltlregistro', hltlCreateRaces );
router.get('/hltllistar', hltlGetRaces );
router.get('/hltllistar/:id', hltlGeRacesById );
router.put('/hltlactualizar/:id', hltlUpdateRaces );
router.delete('/hltleliminar/:id', hltlDeleteRaces);

module.exports = router;
