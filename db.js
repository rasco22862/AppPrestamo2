var mongoose = exports.mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/prestamodb');

exports.Loan = require('./models/loan');
exports.User = require('./models/user');
exports.Lender = require('./models/lender');