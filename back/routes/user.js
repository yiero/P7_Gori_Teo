const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/limiter');

router.get('/', userCtrl.get);
router.get('/:id', userCtrl.getOne);
router.put('/:id', userCtrl.update);
router.post('/', userCtrl.create);
router.delete('/:id', userCtrl.delete);
router.post('/signup', userCtrl.signup);
router.post('/login', limiter.limiter, userCtrl.login);

module.exports = router;
