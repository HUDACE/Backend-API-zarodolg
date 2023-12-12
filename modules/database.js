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

// minden rekord lekérdezése
router.get('/:table', (req, res) => {
  let table = req.params.table;
  pool.query(`SELECT * FROM ${table}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});

// minden rekord lekérdezése
router.get('/:table', (req, res) => {
  let table = req.params.table;
  pool.query(`SELECT * FROM ${table}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});

// id alapján való lekérdezés
router.get('/:table/:id', (req, res) => {
  let table = req.params.table;
  let id = req.params.id;
  pool.query(`SELECT * FROM ${table} WHERE ID=${id}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});
// mező alapján lekérés
router.get('/:table/:field/:op/:value', tokencheck(), (req, res)=>{
  let table = req.params.table;
  let field = req.params.field;
  let value = req.params.value;
  let op = getOperator(req.params.op);

  if (op == ' like '){
      value = `%${value}%`;
  }
  pool.query(`SELECT * FROM ${table} WHERE ${field}${op}'${value}'`, (err, results)=>{
      sendResults(table, err, results, req, res, 'sent from');
  });
});
// update
router.patch('/:table/:field/:op/:value', tokencheck(), (req, res) => {
  let table = req.params.table;
  let field = req.params.field;
  let value = req.params.value;
  let op = getOperator(req.params.op);

  if (op == ' like '){
      value = `%${value}%`;
  }
  let values = Object.values(req.body);
  let fields = Object.keys(req.body);

  let sql = '';
  for(i=0; i< values.length; i++){
      sql += fields[i] + `='` + values[i] + `'`;
      if (i< values.length-1) {
      sql += ',';
      } 
  }
  pool.query(`UPDATE ${table} SET ${sql} WHERE ${field}${op}'${value}'`, (err, results)=>{
      sendResults(table, err, results, req, res, 'updated in');
  });
});

