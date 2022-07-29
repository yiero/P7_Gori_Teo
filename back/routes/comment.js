const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.get('/', commentCtrl.get);
router.get('/:id', commentCtrl.getOne);
router.post('/', commentCtrl.create);
router.put('/:id', commentCtrl.update);
router.delete('/:id', commentCtrl.delete);


module.exports = router;