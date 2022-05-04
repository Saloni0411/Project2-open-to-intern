const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const InternSchema = new mongoose.Schema({
	name: { type: String, required: true,trim :true },
    email:{type:String,unique:true},
	mobile: { type: String, required: true,unique:true,trim :true },
	collegeId: {
		type: ObjectId, 
        ref:"College"
	},
	isDeleted: {type:Boolean, default: false}
	
	

})

module.exports = mongoose.model('Intern', InternSchema)
// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
// collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}






