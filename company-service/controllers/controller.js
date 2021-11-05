const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/connection')
const collection = require('../config/collection')
const { json } = require('body-parser')
const { ObjectId } = require('mongodb')


module.exports = {
    getDashboard : (req,res) => {
        res.send('This is company dashboard.')
    },
    registerCompany:async(req,res) => {
        const {email} = req.body
        const companyDetails = req.body
        try {
            var companyExist = await db.get().collection(collection.COMPANY_COLLECTION).findOne({email})

            if(companyExist) return res.status(200).send('Company already exists')

            companyDetails.password = await bcrypt.hash(companyDetails.password,10)

            let result =await db.get().collection(collection.COMPANY_COLLECTION).insertOne({...companyDetails})

            let company = await db.get().collection(collection.COMPANY_COLLECTION).findOne({_id:result.insertedId})

            const token = jwt.sign({email:result.email,id:result.insertedId.str},'secret',{expiresIn:"1h"})

            res.status(200).json({company,token})
        } catch (error) {
            console.log(error);
            res.status(500).json({error:error.message})
        }
    },
    loginCompany : async(req,res) => {
        const {email,password} = req.body
        try {
            const company = await db.get().collection(collection.COMPANY_COLLECTION).findOne({email})

            if(!company) return res.status(200).json('Company not found')

            const isPasswordCorrect = await bcrypt.compare(password,company.password)

            if(!isPasswordCorrect) return res.status(200).json('Incorrect Password')

            const token = jwt.sign({email:company.email,id:company._id.str},'secret',{expiresIn:"1h"})

            res.status(200).json({company,token})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:error.message})
        }
    },
    reregisterCompany : async (req,res) => {
        const id = req.query.id
        const {email} = req.body
        const companyDetails = req.body
        try {
            var updatedCompany = await db.get().collection(collection.COMPANY_COLLECTION).updateOne({ _id: ObjectId(id)} , {
                $set : {
                    companyName : companyDetails.companyName,
                    industry : companyDetails.industry,
                    email : companyDetails.email,
                    location : companyDetails.location,
                    phone : companyDetails.phone,
                    bio : companyDetails.bio,
                    website : companyDetails.website,
                    linkedIn : companyDetails.linkedIn,
                    facebook : companyDetails.facebook,
                    twitter : companyDetails.twitter,
                    instagram : companyDetails.instagram,
                    status : false,
                    imgUrl : companyDetails.imgUrl,
                    ban : false
                },
                $unset : {
                    reason : ""
                }
            })
            res.status(200).json({updatedCompany})
        } catch (error) {
            console.log(error);
        }
    }
}