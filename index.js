var express = require ("express");
var app = express();
var facebook = require ('./facebook');
var site = require('./site');
var templating = require('./templating');


app.set('view engine', 'html');
app.engine('html',templating.__express);
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: 'py862swwQWERTYpy862swwW'}));
app.use(facebook.initialize());
app.use(facebook.session());

app.post('/submit1', site.submit1); 
app.post('/submit2-rg', site.submit2_rg);
app.get('/form-rg', site.form_rg);
app.post('/submit2-fb', facebook.submit2_fb);
app.get('/form-fb', facebook.form_fb);
app.post('/submit3', site.submit3);

app.get('/review', site.review);

app.get('/auth/facebook', facebook.authenticate);
app.get('/auth/facebook/callback', facebook.callback);

app.listen(8000);
console.log("Commit2");