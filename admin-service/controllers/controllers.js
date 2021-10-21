const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')

module.exports = {
    getDashboard : (req,res) => {
        res.send('This is dashboard.')
    },
    signin : async(req,res) => {
        const {email,password} = req.body;
        try {
            const admin =await db.get().collection('admin').findOne({email})
            
            if(!admin) return res.status(200).json('Invalid Credentials.')

            const checkPassword =await bcrypt.compare(password,admin.password)

            if(!checkPassword)return res.status(200).json('Invalid Credentials.')

            const token = jwt.sign({email : admin.email , id:admin._id},'secret',{expiresIn:"1h"})

            res.status(200).json({admin,token})
        } catch (error) {
            res.status(400).json('Error in signin' + error)
        }
    }
}