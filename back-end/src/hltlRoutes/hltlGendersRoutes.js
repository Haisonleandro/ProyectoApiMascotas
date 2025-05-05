const express = require('express');
const { hltlCreateGenders,hltlGetGenders,hltlGeGendersById,hltlUpdateGenders,hltlDeleteGenders,} = require('../hltlControllers/hltlGendersController.js');

const router = express.Router();

router.post('/hltlregistro', hltlCreateGenders );
router.get('/hltllistar', hltlGetGenders );
router.get('/hltllistar/:id', hltlGeGendersById );
router.put('/hltlactualizar/:id', hltlUpdateGenders );
router.delete('/hltleliminar/:id', hltlDeleteGenders);

module.exports = router;
