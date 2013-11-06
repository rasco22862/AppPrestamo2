var db = require('./db.js');
var mail = require('./mail.js');


exports.submit1 = function (req,res){
	//validations...
	req.session.form1 = req.body;    
  if (req.body.button_fb){
    res.redirect('/auth/facebook');
  }else{
    res.redirect("/form-rg");
  }
};

exports.form_rg = function (req,res){

	res.render('form-rg',{});
}

exports.submit2_rg = function (req, res){
	//validations...

	var newUser = new db.User ({});
	newUser.fillWithForm(req.body, function(){
		newUser.save(function (err, user){
			req.login(user, function (err){
				if (err) {return next (err);}
				console.log(user);
				return res.redirect('/review');
			});		
		});
	});
};


exports.review = function (req, res){	
	res.render('form-review', req.session.form1);
};

exports.submit3 = function (req, res){
	//validations...
	var loan = new db.Loan();
	loan.user = db.mongoose.Types.ObjectId(req.user);
	loan.fillWithForm(req.body);
	loan.save(function (err,loan){
		
		console.log(loan);
		mail.notifyLenders(function (err,response){
			 
		})
		mail.notifyUser(req.user, "Asunto", function (err, response){
			
		});
		res.send("Listo!");
	});

};