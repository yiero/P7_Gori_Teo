const express = require('express');
const router = express.Router();
const topicCtrl = require('../controllers/topic');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, topicCtrl.create);
router.get('/', auth, topicCtrl.get);
router.get('/:id', auth, topicCtrl.getOne);
router.put('/:id', auth, multer, topicCtrl.update);
router.delete('/:id', auth, topicCtrl.delete);

router.post('/:id/like', auth, topicCtrl.like);
router.delete('/:id/like', auth, topicCtrl.unlike);


module.exports = router;