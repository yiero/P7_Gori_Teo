const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth')

router.get('/', auth, commentCtrl.get);
router.get('/:id', auth, commentCtrl.getOne);
router.post('/', auth, commentCtrl.create);
router.put('/:id', auth, commentCtrl.update);
router.delete('/:id', auth, commentCtrl.delete);


module.exports = router;