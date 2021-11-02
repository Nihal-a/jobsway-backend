const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const {ObjectId} = require('mongodb')

module.exports = {
    getUsers :async (req,res) => {
        try {
            var allUsers = await db.get().collection(collection.USERS_COLLECTION).find({ban : false}).toArray()

            res.status(200).json(allUsers)

        } catch (error) {
            console.log(error);
            res.status(400).json(error)
        }
    },
    banUser: async(req,res) => {
        id = req.query.id
        console.log("ID" , id);
        try {
            var bannedUser = await db.get().collection(collection.USERS_COLLECTION).updateOne({_id:ObjectId(id)},{
                $set : {
                    ban : true
                }
            })
            res.status(200).json(bannedUser)
            
        } catch (error) {
            console.log(error);
            res.status(400).json(error)
        }
    }
}