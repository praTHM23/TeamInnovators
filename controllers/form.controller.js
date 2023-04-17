const Form = require('../models/form.model');
const cloudinary = require('../helpers/cloudinaryUpload')

exports.createForm = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0 && !req.file) {
            return res.status(404).json({ message: 'Request body and file both are empty' });
        }

        const { name, email } = req.body;
        let picObj = {

        }
        if (req.file != undefined) {
            const picture = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto'
            });
            picObj['photo'] = picture.secure_url;

        }
        const form = await Form.create({
            name,
            email,
            ...picObj
        });
        res.status(201).json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



