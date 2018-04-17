const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) =>{
    res.render('main');
});

app.post('/check', (req,res) =>{
  var a = moment(new Date());
  var b = moment(req.body.age);
  if (a.diff(b, 'years') >= 18) {
    res.render('major', { nome : req.body.username });
  }else{
    res.render('minor', { nome : req.body.username });
  }
});

const verificaPreenchimento = ((req,res,next)=> {
  const user = req.body.username;
  const age = req.body.age;
  if (!user & !age){
    res.render('main');
  }
});

app.get('/major', verificaPreenchimento, (req, res) => {
  res.render('major');
});

app.get('/minor', verificaPreenchimento, (req, res) => {
  res.render('minor');
});

app.listen(3000);
