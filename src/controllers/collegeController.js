const { ignore } = require("nodemon/lib/rules")
const collegeModels=require("../models/collegemodels")


let createcollege = async function(req,res){
   
    let data =req.body
    if(!data.name) return res.status(400).send( {status:false,message:"name should be present in body"})
    if(!data.fullName) return res.status(400).send({status:false,message:"fullName should be present in body"})
    if(!data.logoLink) return res.status(400).send({status:false,message:"logoLink should be present in body"})
   let save= await collegeModels.create(data)
   res.status(201).send({status:true,data:save})



}



module.exports.createcollege=createcollege