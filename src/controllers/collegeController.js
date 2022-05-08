const collegeModels = require("../models/collegemodel")
const internmodel = require("../models/internmodel")


let createCollege = async function(req, res){
   try{
    let data = req.body
    if(Object.keys(data).length>0){
        if(!data.name){
            return res.status(400).send({status:false, message: "name should be present in body"})
        } 
        let regex = /^[a-zA-Z]*$/
        if(!data.name.match(regex)) return res.status(400).send({ status: false, message: "name is not in valid format"})
    
        
        let duplicate = await collegeModels.findOne({name:data.name})
        if(duplicate){
            return res.status(400).send({status:false, message: "college name is already present"})
        } 
        if(!data.fullName){
            return res.status(400).send({status:false, message: "fullName should be present in body"})
        } 
        let regex2 = /^[a-zA-z, ]*$/
        if(!data.fullName.match(regex2)){
            return res.status(400).send({ status: false, message: "fullname is not in valid format"})
        }
        
        if(!data.logoLink){
            return res.status(400).send({status:false, message: "logoLink should be present in body"})
        } 
        let save = await collegeModels.create(data)
        res.status(201).send({status:true, data:save})
    }
    else{
        res.status(400).send({status: false, message: "Request must contain a valid body"})
    }
    
} 

    catch (err){
    return res.status(500).send({ status: false, msg: err.message });
  }  
  
    
}


let collegeDetails= async function (req,res){

    try{
    let data = req.query
    
    if(Object.keys(data).length==0) {
       return res.status(400).send({status:false,message:"No query is being provided"})
   }
   if(!data.collegeName){
    return res.status(400).send({status:false,message:"Collegename not provided"})
   } 
   let check = await collegeModels.findOne({name:data.collegeName})
   if(!check) {
    return res.status(400).send({status:false,message:"Wrong college name provided"})
   }
   if(check.isDeleted==true)
   {
       return res.status(400).send({status:false,message:"college name already deleted"})
   }
   
   let get={}
    let result = await collegeModels.findOne({name:data.collegeName}).select({name:1,fullName:1,logoLink:1})

    get.name=result.name
    get.fullName=result.fullName
    get.logoLink=result.logoLink
  
    get.interests= await internmodel.find({collegeId:result._id}).select({_id:1,name:1,email:1,mobile:1})

    res.status(200).send({status:true,data:get})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }  

}


module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails