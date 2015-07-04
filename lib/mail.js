

var SendGrid = require('sendgrid').SendGrid
    ,Email = require('sendgrid').Email;

var sendgrid, from;

exports.load = function(app)
{
    sendgrid = new SendGrid(app.settings.sendgrid_user, app.settings.sendgrid_key);
    from = app.settings.system_email;
};

var sendMail = exports.sendMail = function(to,body,subject,callback) {


    if(!sendgrid) {
        console.log('email not sent because it\'s off in app.js. to turn mails on set app.set("send_mails",true); ');
        callback();
        return;
    }

    console.log('sending to ' + to + ' ' + subject);

    var email = new Email({
        to:[to],
        from:from,
        fromname:'אמנת הולכי רגל ורוכבי אופניים',
        subject:subject,
        html:body
    });

    console.log('mail sent to ' + to);

    sendgrid.send(email,function(success,message) {
        if(!success){
            console.error('mail was not sent');
            console.error(message);
            callback(message);
        }
        else{
            console.log('mail was sent');
            callback(null,message);
        }
    });

    //sendSMTPMail(to, from,  body, subject, function(err) {
    //        if(err){
    //            console.error('mail was not sent');
    //            callback('mail was not sent');
    //        }
    //        else{
    //            console.log('mail was sent');
    //            callback(null, 'mail was sent');
    //        }
    //    });

};

var sendMailFromTemplate = exports.sendMailFromTemplate = function(to, string,callback) {
    var parts = string.split('<!--body -->');
    var subject = parts[0] || 'אמנת הולכי רגל ורוכבי אופניים';
    var body = parts[1] || parts[0];
    sendMail(to,body,subject,callback);
};

var sendSMTPMail = module.exports.sendSMTPMail = function (userMail, from, body, subject, callback) {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport(smtpTransport({
        secure: false,
        debug: true,
        tls: {rejectUnauthorized: false}
    }));

    var mailOptions = {
        from: from , // sender address
        to: userMail, // list of receivers
        subject: subject, // Subject line
        html: body // html body
    };
    //
    //// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            callback(null, info);
        }else{
            console.log('Message sent: ' + info.response);
            callback();
        }
    });
};
