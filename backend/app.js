var createError = require('http-errors');
const mongoose=require("mongoose");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');
const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: "myapikey",
});



var userRouter = require('./routes/user');
var videoRouter = require('./routes/video');
var bookrouter = require('./routes/book');
var passwordresetrouter = require('./routes/resetpassword');
var journalRouter = require('./routes/journal');
var emotiontimerouter = require('./routes/emotiontime');
var journaltimerouter = require('./routes/journaltime');
var meditationtimerouter = require('./routes/meditationtime');
var reviewrouter = require('./routes/review');
var verifyuserrouter = require('./routes/verifyuser');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3001"}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/videos',videoRouter);
app.use('/books',bookrouter);
app.use('/password',passwordresetrouter);
app.use('/journal',journalRouter);
app.use('/emotiontime',emotiontimerouter);
app.use('/journaltime',journaltimerouter);
app.use('/meditationtime',meditationtimerouter);
app.use('/review',reviewrouter);
app.use('/verifyuser',verifyuserrouter);

const textGeneration = async (prompt) => {

  try {
      const response = await openai.chat.completions({
          model: 'text-curie-001',
          prompt: `Human: ${prompt}\nAI: `,
          temperature: 0.8,
          max_tokens: 64,
          top_p: 1,
          // frequency_penalty: 0,
          // presence_penalty: 0.6,
          // stop: ['Human:', 'AI:']
      });
  
      return {
          status: 1,
          response: `${response.data.choices[0].text}`
      };
  } catch (error) {
      return {
          status: 0,
          response: ''
      };
  }
};


app.post('/dialogflow', async (req, res) => {
  let action = req.body.queryResult.action;
  let queryText = req.body.queryResult.queryText;

  if (action === 'input.unknown') {
      let result = await textGeneration(queryText);
      if (result.status == 1) {
          res.send(
              {
                  fulfillmentText: result.response
              }
          );
      } else {
          res.send(
              {
                  fulfillmentText: `Sorry, I'm not able to help with that.`
              }
          );
      }
  } else {
      res.send(
          {
              fulfillmentText: `No handler for the action ${action}.`
          }
      );
  }
});


mongoose.connect('mongodb://127.0.0.1:27017/WECARE',function(err,db){
  // if(err) return next(err);
  if (err) throw err;
  console.log("DB Connected");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
