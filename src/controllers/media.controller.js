const { mediaService } = require('../services');

const createMedia = async (req, res) => {
    try {
        const { parentId, contentType, format } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, mimetype } = req.file;

        // Check if the file format matches the specified content type
        if (mimetype !== contentType) {
            return res.status(400).json({ error: `Invalid content type for the uploaded file. MIMETYPE: ${mimetype}, contentType: ${contentType}` });
        }

        // No need to read the file as a buffer using fs.readFile, as multer provides req.file.buffer
        const mediaData = {
            data: req.file.buffer,  // Use req.file.buffer directly
            parentId: parentId,
            fileName: originalname,
            contentType: contentType,
            format: format,
            dimensions: req.body.dimensions || {},
        };

        // multer automatically removes the temporary file, so no need to unlink

        const media = await mediaService.createMedia(mediaData);
        res.status(201).json({
            _id: media._id,
            parentId: media.parentId,
            fileName: media.fileName,
            contentType: media.contentType,
            format: media.format,
            dimensions: media.dimensions,
            uploadedOn: media.uploadedOn,
        });
    } catch (error) {
        console.error('Error in createMedia controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const queryMediums = async (req, res) => {
    try {
        const media = await mediaService.queryMediums();
        if (!media) {
            res.status(404).json({ message: 'Media not found' });
        } else {
            res.status(200).json(media);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMediaById = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const media = await mediaService.getMediaById(mediaId);
        if (!media) {
            res.status(404).json({ message: 'Media not found' });
        } else {
            res.status(200).json(media);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMediaByFormat = async (req, res) => {
    try {
        const format = req.params.format;
        const mediaList = await mediaService.getMediaByFormat(format);
        res.status(200).json(mediaList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMediaById = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const result = await mediaService.deleteMediaById(mediaId);
        if (!result) {
            res.status(404).json({ message: 'Media not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMedia,
    queryMediums,
    getMediaById,
    getMediaByFormat,
    deleteMediaById,
};
