const express = require('express');
const router = express.Router();
const midpoint = require('../controllers/midpoint');

router.get('/midpoint', midpoint.getMidpoint);


module.exports = router;