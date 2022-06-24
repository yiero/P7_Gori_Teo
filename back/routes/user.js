const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.get);
router.get('/:id', userCtrl.getOne);

module.exports = router;
