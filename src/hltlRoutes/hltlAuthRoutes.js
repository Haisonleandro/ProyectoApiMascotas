const express = require('express');
const { hltlRegistrarUsers, hltlloginUsers } = require('../hltlControllers/hltlAuthControllers.js');

const router = express.Router();

router.post('/registro', hltlRegistrarUsers );
router.post('/login', hltlloginUsers);

module.exports = router;
