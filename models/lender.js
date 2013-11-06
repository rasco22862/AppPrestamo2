var mongoose = require ('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = Schema.ObjectId;

var lenderSchema = new Schema ({
	company: String,
	username: String,
	password: String,
	contact: String,
	email: String,
	status: String,
	up_date: String,
	loans: [ObjectId]
});

module.exports = mongoose.model('Lender', lenderSchema);