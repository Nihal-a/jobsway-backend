const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const { USER_COLLECTION } = require('../config/collection')
const collection = require('../config/collection')
const SERVICE_ID = process.env.SERVICE_ID
const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN = process.env.AUTH_TOKEN
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
const { validationResult } = require('express-validator')


module.exports = {
    getFeaturedJobs :async (req, res) => {
        try {
            var allFeaturedJobs = await db.get().collection(collection.JOBS_COLLECTION).find({status : true}).limit(8).toArray()

            res.status(200).json(allFeaturedJobs)

        } catch (error) {
            console.log(error);
            res.status(500).json({Err : error})
        }
    },
    getAllJobs : async(req,res) => {
        try {
            var allFeaturedJobs = await db.get().collection(collection.JOBS_COLLECTION).find({status : true}).toArray()

            res.status(200).json(allFeaturedJobs)
        } catch (error) {
            console.log(error);
            res.status(500).json({Err : error})
        }
    }
}
