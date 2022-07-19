const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const topicCtrl = require('../controllers/topic');

router.post('/', commentCtrl.create(topicCtrl.create.id));
router.get('/', commentCtrl.get);
router.get('/:id', commentCtrl.getOne);
router.put('/:id', commentCtrl.update);
router.delete('/:id', commentCtrl.delete);


module.exports = router;