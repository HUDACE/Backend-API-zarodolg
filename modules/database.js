const router = require('express').Router();
var mysql = require('mysql');
var { sendResults, getOperator, tokencheck } = require('./functions');
var jwt = require('jsonwebtoken');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME,
  timezone: 'UTC'
});