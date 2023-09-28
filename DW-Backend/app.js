var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var userRouter = require('./routes/user.js');
var authRouter = require('./routes/auth.js');
var uploadRouter = require('./routes/upload.js');
var cors = require('cors');

require('dotenv').config();

var app = express();

app.use(cors());
// if we use withCrenditals true
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  // Add other headers if needed
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serving the static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/uploads', uploadRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

module.exports = app;
