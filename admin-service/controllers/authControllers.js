const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const { validationResult } = require('express-validator');

module.exports = {
    signin : async (req, res) => {
        
        var errors = validationResult(req)

        const { email, password } = req.body;
        try {
            const admin = await db.get().collection('admin').findOne({ email })

            if (!admin) return res.status(200).json('Invalid Credentials.')

            const checkPassword = await bcrypt.compare(password, admin.password)

            if (!checkPassword) return res.status(200).json('Invalid Credentials.')

            const token = jwt.sign({ email: admin.email, id: admin._id }, 'secret', { expiresIn: "1h" })

            res.status(200).json({ admin, token })
        } catch (error) {
            console.log(error);
            res.status(400).json('Error in signin' + error)
        }
    }
}