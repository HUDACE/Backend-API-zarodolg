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
function tokencheck(){
    return (req, res, next) =>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null){
            console.log(notice(req.socket.remoteAddress) + ' >> ' + error('Tokencheck error!'));
            return res.status(401).json({ message: "Illetéktelen hozzáférés!"});
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err){
                console.log(notice(req.socket.remoteAddress) + ' >> ' + error('Tokencheck error!'));
                return res.status(403).json({ message: "Hibás token!"});
            }
            req.user = user;
            console.log(req.user)
            next();
        });
    }
}

module.exports = { 
    sendResults, 
    getOperator,
    tokencheck 
};