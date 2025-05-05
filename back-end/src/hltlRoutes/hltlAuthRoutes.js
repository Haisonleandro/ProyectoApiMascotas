const express = require('express');
const { hltlRegistrarUsers, hltlloginUsers } = require('../hltlControllers/hltlAuthControllers.js');

const router = express.Router();

router.post('/hltlregistro', hltlRegistrarUsers );
router.post('/hltllogin', hltlloginUsers);

module.exports = router;
