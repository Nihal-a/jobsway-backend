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
const { ObjectId } = require('bson')


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
    },
    getJobsByCompany : async (req,res) => {
        const id = req.params.id

        try {
            var jobsOfCompany = await db.get().collection(collection.JOBS_COLLECTION).find({companyId : id}).toArray()
            console.log("helk");
            console.log(jobsOfCompany);
            res.status(200).json(jobsOfCompany)
        } catch (error) {
            console.log(error);
            res.status(500).json({Err : error})
        }
    },
    applyJob : async (req , res) => {
        const details = req.body

        try {

            await db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(details.userId)} , {
                    $addToSet : {
                        appliedJobs : ObjectId(details.jobId)
                    }
            })

            await db.get().collection(collection.JOBS_COLLECTION).updateOne({_id : ObjectId(details.jobId)} , {
                    $addToSet : {
                        applications : details
                    }
            })

            res.status(200).json({msg : 'Application Successfull'})
        } catch (error) {
            console.log(error);
            res.status(500).json({Err : error})
        }
    }
}
