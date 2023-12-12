//functions
let clr = require('cli-color'); 
var jwt = require('jsonwebtoken');
var error = clr.red.bold;
var info = clr.white;
var warn = clr.yellow;
var notice = clr.blue;

// az eredmény adatainak vissza küldése a kliensnek
function sendResults(table, err, results, req, res, msg){
    if (err){
        console.log(notice(req.socket.remoteAddress) + ' >> ' + error(err.sqlMessage));
        res.status(500).send(err.sqlMessage);
    }else{
        console.log(notice(req.socket.remoteAddress) + ' >> ' +results.length + ` record(s) ${msg} ${table} table.`);
        res.status(200).send(results);
    }
}
function getOperator(op){
    switch(op){
        case 'eq': {op = '='; break}
        case 'lt': {op = '<'; break}
        case 'gt': {op = '>'; break}
        case 'lte': {op = '<='; break}
        case 'gte': {op = '>='; break}
        case 'not': {op = '!='; break}
        case 'lk': {op = ' like '; break}
    }
    return op;
}


module.exports = { 
    sendResults, 
    getOperator,
    tokencheck 
};