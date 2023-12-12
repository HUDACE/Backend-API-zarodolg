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
router.get('/:dolgozatok', (req, res) => {
  let table = req.params.table;
  pool.query(`SELECT * FROM ${table}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});

// id alapján való lekérdezés
router.get('/dolgozatok/:id', (req, res) => {
  let table = req.params.table;
  let id = req.params.id;
  pool.query(`SELECT * FROM ${table} WHERE ID=${id}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});
// mező alapján lekérés
router.get('/:dolgozatok/:field/:op/:value',(req, res)=>{
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
router.patch('/:dolgozatok/:field/:op/:value', (req, res) => {
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

// minden rekord törlése
router.delete('/:dolgozatok', (req, res) => {
  let table = req.params.table;
  pool.query(`DELETE FROM ${table}`, (err, results) => {
      sendResults(table, err, results, req, res, 'deleted from');
  }); 
});
// id alapján törlés
router.delete('/:dolgozatok/:id', (req, res) => {
  let table = req.params.table;
  let id = req.params.id;

  pool.query(`DELETE FROM ${table} WHERE ID=${id}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
  });
});
// mező alapján törlés
router.delete('/:dolgozatok/:field/:op/:value', (req, res) => {
  let table = req.params.table;
  let field = req.params.field;
  let value = req.params.value;
  let op = getOperator(req.params.op);

  if (op == ' like '){
      value = `%${value}%`;
  }
  pool.query(`DELETE FROM ${table} WHERE ${field}${op}'${value}'`, (err, results) => {
      sendResults(table, err, results, req, res, 'deleted from');
  }); 
});