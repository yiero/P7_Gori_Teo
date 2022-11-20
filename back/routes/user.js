const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/limiter');
const auth = require('../middleware/auth');

router.get('/', userCtrl.get);
router.get('/:id', userCtrl.getOne);
router.put('/:id', auth, userCtrl.update);
router.post('/', userCtrl.create);
router.delete('/:id', auth, userCtrl.delete);
router.post('/signup', userCtrl.signup);
router.post('/login', limiter.limiter, userCtrl.login);

module.exports = router;
