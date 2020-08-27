const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const Routes = require('./routes');
const Settings = require('./settings');
const ErrorsHandler = require('./controllers/errorHandler');

app.use(Settings.cors);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', Routes.UsersRoutes);

app.use(ErrorsHandler.nonExistingEndpointHandler);
app.use(ErrorsHandler.errorHandler);

module.exports = app;