const express = require('express');
const router = express.Router();
const mediaController = require('../../controllers/media.controller');
const upload = require('../../middlewares/media.middleware');

router.post('/', upload.single('data'), mediaController.createMedia);
router.get('/', mediaController.queryMediums);
router.get('/:id', mediaController.getMediaById);
router.get('/format/:format', mediaController.getMediaByFormat);
router.delete('/:id', mediaController.deleteMediaById);

module.exports = router;
