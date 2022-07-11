const express = require('express');
const router = express.Router();
const topicCtrl = require('../controllers/topic');


router.post('/', topicCtrl.create);
router.get('/', topicCtrl.get);
router.get('/:id', topicCtrl.getOne);
router.put('/:id', topicCtrl.update);
router.delete('/:id', topicCtrl.delete);

module.exports = router;