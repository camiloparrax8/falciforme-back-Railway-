const express = require('express');
const router = express.Router();

//controladores
const authController = require('../controllers/authController');

router.post(`/login`, authController.login);
router.use(authController.verificarToken);

module.exports = router;
