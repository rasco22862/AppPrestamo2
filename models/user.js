var mongoose = require ('mongoose')
	,Schema = mongoose.Schema
	,bcrypt = require('bcrypt')
	,SALT_WORK_FACTOR = 10;
	

var userSchema = new Schema ({
	first_name: String,
	last_name: String,
	accounts: [],
	username: {type: String, index: {unique: true}},
	password: {type: String},
	email: String,
	birthday: Date,
	gender: String,
	dni: String,
	provincia: String,
	localidad: String,
	up_date: Date,
	scoring: Number,
	social_scoring: Number,
	fb_raw: Schema.Types.Mixed
});

userSchema.pre('save', function (next){
	var user=this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash){
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, cb){
	bcrypt.compare (candidatePassword, this.password, function (err, isMatch){
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.fillWithForm = function (form, cb){
	this.first_name = form.inputNombre;
    this.last_name = form.inputApellido;
    this.email = form.inputEmail;
    this.birthday =  form.inputFecha;
    this.gender = form.inputSexo;
    this.dni = form.inputDNI;
    this.provincia = form.inputProvincia;
    this.localidad = form.inputLocalidad;
    if (form.inputUsuario) this.username = form.inputUsuario;
    if (form.inputPassword) this.password = form.inputPassword;
    return cb();

};

module.exports = mongoose.model('User', userSchema);