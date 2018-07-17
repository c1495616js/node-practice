var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Express = require('express');
var BodyParser = require('body-parser');
var bcrypt = require('bcrypt')


const saltRounds = 10;
const myPassword = 'password1';
const testPassword = 'password2';
const myHash ='$2a$10$fok18OT0R/cWoR0a.VsjjuuYZV.XrfdYd5CpDWrYkhi1F0i8ABp6e';





var users = {
  zack: {
    username: 'zack',
    password: myHash,
    id: 1,
  },
  node: {
    username: 'node',
    password: '5678',
    id: 2,
  },
}

// passport config
var localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done){
    var user = users[ username ];
    if( user == null ){
      return done(null, false, {message: 'Invalid user'});
    }

    // async

    // bcrypt.compareSync(password, user.password).then(function (res) {
    //   console.log(res); // true
    //   if(!res)return done(null, false, {message: 'Invalid password'});      
    // });

    // sync
    const res = bcrypt.compareSync(password, user.password)
    if(!res)return done(null, false, {message: 'Invalid password'});           

    return done(null, user);
  }
)

Passport.use('local', localStrategy);

// express

var app = Express();
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use(Passport.initialize());

app.post(
  '/login',
  Passport.authenticate('local', {session: false}),
  function(req, res){ 
    // if(req.error){
    //   res.send(req.error.message)
    // } 
    // console.log(req.isAuthenticated())
    res.json({
     id: req.user.id
    });
  }
)

app.listen(3000, function(){
  console.log('listening on 3000');
})