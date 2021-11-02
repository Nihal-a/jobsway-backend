const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const {ObjectId} = require('mongodb')

module.exports = {
    getUsers :async (req,res) => {
        console.log("readed");
        try {
            var allUsers = await db.get().collection(collection.USERS_COLLECTION).find({ban : false}).toArray()

            res.status(200).json(allUsers)

        } catch (error) {
            console.log(error);
            res.status(400).json(error)
        }
    },
}