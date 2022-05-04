const mongoose = require('mongoose')


const CollegeSchema = new mongoose.Schema({
	name: { type: String, required: true,trim :true,unique:true },
	fullName: { type: String, required: true,trim :true },
	logoLink: {
		type: String, 
        required: true
	},
	isDeleted: {type:Boolean, default: false}
    // interests:[Object]
	
	

})

module.exports = mongoose.model('College', CollegeSchema)

// { name: { mandatory, unique, example iith}, 
// fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
// logoLink: {mandatory}, isDeleted: {boolean, default: false} }




