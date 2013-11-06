var db = require ('./db');

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "graficacopymundo@gmail.com",
    pass: "copymundo1788"
  }
});

exports.notifyUser = function (user, type, cb){
	
	db.User.findById(user, function(err, foundUser){
		var mailOptions = {
			from: "info@prestamomercado.com.ar",
			to: foundUser.email,
			subject: type,
			text: "Felicidades! Ha realizado una consulta de préstamo"
		}

		smtpTransport.sendMail (mailOptions, cb);
	});
}

exports.notifyMe = function (cb){

	var mailOptions= {
		from: "info@prestamomarcado.com.ar",
		to: "rasco22@gmail.com",
		subject: "Me - Nueva solicitud de préstamo en el sitio",
		text: "Nueva solicitud de préstamo en el sitio"
	}

	smtpTransport.sendMail (mailOptions, cb);
}

exports.notifyLenders = function (cb){
	db.Lender.find({}, 'email', function (err, foundLenders){
		var lendersAddress = foundLenders.map(function(lender){
			return lender.email;
		});
		var mailOptions = {
			from: "info@prestamomercado.com.ar",
			bcc: lendersAddress,
			subject: "Lender - Nueva solicitud de préstamo en el sitio",
			text: "Nueva solicitud de préstamo en el sitio",
		}
		smtpTransport.sendMail (mailOptions,cb);
	});
}
