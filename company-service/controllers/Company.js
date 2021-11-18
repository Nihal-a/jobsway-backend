require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const { json } = require('body-parser')
const { ObjectId } = require('mongodb')
const shortid = require('shortid')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
})


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
    },
    addJobPayment : async (req,res) => {

        const amount = req.body.amount
        const currency = "INR"

        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency,
            receipt: shortid.generate()
        }
        try {
            const result = await razorpay.orders.create(options)    

            res.status(200).json({
                id:result.id,
                currency:result.currency,
                amount:result.amount
            })      
        } catch (error) {
            console.log(error);
            res.status(500).json({Err : 'Somthing went wrong'})
        }
    } 
}