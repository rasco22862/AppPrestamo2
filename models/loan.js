var mongoose = require ('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = Schema.ObjectId;

var loanSchema = new Schema ({
	user: ObjectId,
	amount: String,
	destiny: String,
	income_amount: String,
	income_type: String,
	status: String,
	dateRequested: String
});

loanSchema.methods.fillWithForm = function (form, cb){
	this.amount = form.inputMonto;
	this.destiny = form.inputDestino;
	this.income_amount = form.inputIngresos;
	this.income_type = form.inputFuente;
	this.status = "Requested";

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
	this.dateRequested = today;
};

module.exports = mongoose.model('Loan', loanSchema);