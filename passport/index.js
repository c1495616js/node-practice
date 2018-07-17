var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Express = require('express');
var BodyParser = require('body-parser');


var users = {
  zack: {
    username: 'zack',
    password: '1234',
    id: 1,
  },
  node: {
    username: 'node',
    password: '5678',
    id: 2,
  },
}
