const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mediaValidation = require('../../validations/media.validation');
const mediaController = require('../../controllers/media.controller');
const upload = require('../../middlewares/media.middleware');

const router = express.Router();

router.post('/', upload.single('data'), validate(mediaValidation.createMedia), mediaController.createMedia);
router.get(auth('/'), validate(mediaValidation.queryMediums), mediaController.queryMediums);
router.get('/:id', validate(mediaValidation.getMedium), mediaController.getMediaById);
router.get('/format/:format', validate(mediaValidation.getMediumByFormat), mediaController.getMediaByFormat);
router.delete('/:id', validate(mediaValidation.deleteMedium), mediaController.deleteMediaById);

module.exports = router;
