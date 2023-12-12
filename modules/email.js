const router = require('express').Router();
var nodemailer = require('nodemailer');
let clr = require('cli-color'); 

var error = clr.red.bold;
var notice = clr.blue;

var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
router.post('/send', (req, res)=>{

    var mailOptions = {
        from: process.env.SMTP_USER,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message

        
    }
    transport.sendMail(mailOptions, (err, info)=>{
        if (err) {
            console.log(error(`Az e-mail elküldése sikertelen! - ${err}`));
        }else
        {
            console.log(notice(`Az e-mail sikeresen elküldve! - ${info}`));
        }
    });


    res.send('Elküldve...');
});
module.exports = router;