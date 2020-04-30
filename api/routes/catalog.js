const express = require('express');
const router = express.Router();

//Controllers
const catalog_controller = require('../controllers/catalogController');

router.get('/list-catalog', catalog_controller.list_catalog);

module.exports = router;
