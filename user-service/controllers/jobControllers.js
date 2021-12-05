const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const { validationResult } = require('express-validator')
const { cloudinary } = require('../utils/cloudinary')


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
        const {formData , image} = req.body
        var errors = validationResult(req)

        console.log(req.body);
        try {

            // Express Validator error.

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const uploadedResponse = await cloudinary.uploader.upload(image , {
                upload_preset : 'Applied_Users'
            })
    
            formData.imgUrl = uploadedResponse.url

            // await db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(details.userId)} , {
            //         $addToSet : {
            //             appliedJobs : ObjectId(details.jobId)
            //         }
            // })

            // await db.get().collection(collection.JOBS_COLLECTION).updateOne({_id : ObjectId(details.jobId)} , {
            //         $addToSet : {
            //             applications : details
            //         }
            // })

            // let job = await db.get().collection(collection.JOBS_COLLECTION).findOne({_id : ObjectId(details.jobId)})

            // let user = await db.get().collection(collection.USER_COLLECTION).findOne({_id : ObjectId(details.userId)})

            // res.status(200).json(job,user)

        } catch (error) {
            console.log(error);
            res.status(500).json({Err : error})
        }
    }
}
