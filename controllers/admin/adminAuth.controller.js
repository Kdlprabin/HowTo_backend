const Admin = require('../../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        })
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        })
    }

    try {

        const admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email: email.toLowerCase(),
            password: hashedPassword
        })

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'Admin created successfully',
            token
        })

    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    login,
    register
}