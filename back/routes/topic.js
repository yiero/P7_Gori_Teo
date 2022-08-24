const express = require('express');
const router = express.Router();
const topicCtrl = require('../controllers/topic');
const auth = require('../middleware/auth');


router.post('/', auth, topicCtrl.create);
router.get('/', auth, topicCtrl.get);
router.get('/:id', auth, topicCtrl.getOne);
router.put('/:id', auth, topicCtrl.update);
router.delete('/:id', auth, topicCtrl.delete);

router.post('/:id/like', auth, topicCtrl.like);
router.delete('/:id/unlike', auth, topicCtrl.unlike);


module.exports = router;