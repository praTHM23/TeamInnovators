const Form = require('../models/form.model');
const cloudinary = require('../helpers/cloudinaryUpload')

exports.createForm = async (req, res) => {
    const { name, email } = req.body;
    try {
        const picture = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto'
        });
        const form = await Form.create({
            name,
            email,
            photo: picture.secure_url
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



