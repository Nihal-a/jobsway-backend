const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const {USER_COLLECTION} = require('../config/collection')
const collection = require('../config/collection')
const {ObjectId} = require('mongodb')
const { json } = require('body-parser')


module.exports = {
    getDashboard : (req,res) => {
        res.send('This is user home.')
    },
    signup : async(req,res) => {
        const {email,firstName,lastName,password} = req.body
        try {
            var userExist =await db.get().collection(collection.USER_COLLECTION).find({email}).toArray()

            if(userExist.length > 0) return res.status(200).send('User already exists')

            const hashedPassword = await bcrypt.hash(password,12)

            var name = `${firstName} ${lastName}`

            if(lastName == undefined) name = firstName;

            let result = await db.get().collection(USER_COLLECTION).insertOne({email,password:hashedPassword,name})

            let user = await db.get().collection(collection.USER_COLLECTION).findOne({_id:result.insertedId})

            const token = jwt.sign({email:result.email,id:result.insertedId.str},'secret',{expiresIn:"1h"})

            return res.status(200).json({user,token})
            
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    signin : async(req,res) => {
        const {email,password} = req.body
        try {

            var user =await db.get().collection(collection.USER_COLLECTION).findOne({email})

            if(!user) return res.status(200).send('No account found.')

            const isPasswordCorrect = await bcrypt.compare(password,user.password)

            if(!isPasswordCorrect) return res.status(200).send('Incorrect Password')

            const token = jwt.sign({email : user.email , id:user._id},'secret',{expiresIn:"1h"})

            res.status(200).json({user,token})
            
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
}
