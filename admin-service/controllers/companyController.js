const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const {ObjectId} = require('mongodb')

module.exports = {
    getUnVerifiedCompanies :async (req,res) => {
        try {
            var unVerifiedCompanies = await db.get().collection(collection.COMPANY_COLLECTION).find({status : false}).toArray()

            res.status(200).json(unVerifiedCompanies)

        } catch (error) {
            res.status(400).json(error)
        }
    },
    verifyCompany : async(req,res) => {
        var id = req.query.id  
        console.log("reached",id);
        try {
            console.log(".....",ObjectId(id));
            var verifiedCompany = await db.get().collection(collection.COMPANY_COLLECTION).updateOne({_id:ObjectId(id)},{
                $set : {
                    status : true
                }
            })
            console.log("changed");
            res.status(200).json(verifiedCompany)
        } catch (error) {
            console.log(error);
            res.status(400).json(error)
        }
    }
}