const express = require('express');

const routes = express.Router();

const AuthController = require('./controllers/AuthController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', AuthController.signin);
routes.get('/signup', AuthController.signup);

routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);

module.exports = routes;
