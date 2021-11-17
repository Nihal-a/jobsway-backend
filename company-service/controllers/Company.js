const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const { json } = require('body-parser')
const { ObjectId } = require('mongodb')



module.exports = {
    getCompanyDetails :async (req,res) => {
        const id = req.params.id
        try {
            var company = await db.get().collection(collection.COMPANY_COLLECTION).findOne({_id : ObjectId(id)})

            res.status(200).json({company})
        } catch (error) {
            res.status(500).json({error})
        }
    },
    addJob : async (req,res) => {
        const id = req.query.id
        const jobDetails = {...req.body , companyId : ObjectId(id)}
        try {
            let result  = await db.get().collection(collection.JOBS_COLLECTION).insertOne(jobDetails)

            let job = await db.get().collection(collection.JOBS_COLLECTION).findOne({_id:result.insertedId})

            res.status(200).json({job})
        } catch (error) {
            res.status(500).json({Err : "Something went wrong"})
        }
    }
}