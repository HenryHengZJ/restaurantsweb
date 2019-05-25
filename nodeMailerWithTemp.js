
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var Admin = require('./models/admin');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
   // secure: mailConfig.secure,
  //  port: mailConfig.port,
    auth: {
        user: 'foodiebeeie@gmail.com',
        pass: 'Welovetoeat!'
    }
}));

exports.sendWelcomeEmail = function (path, body, password) {
    console.log(password)
    console.log(body.catererEmail)
    readHTMLFile(__dirname + path, function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             useremail: body.catererEmail,
             userpassword: password
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'foodiebeeie@gmail.com',
            to : body.catererEmail,
            subject : 'Welcome to FoodieBee',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });
}

exports.sendRejectedEmail = function (path, sendtoemail) {
    readHTMLFile(__dirname + path, function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             useremail: sendtoemail,
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'foodiebeeie@gmail.com',
            to : sendtoemail,
            subject : 'Welcome to FoodieBee',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });
}

exports.sendNewCatererRegisterEmail = function (path, sendtoemail) {
    readHTMLFile(__dirname + path, function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'foodiebeeie@gmail.com',
            to : sendtoemail,
            subject : 'Welcome to FoodieBee',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });
}

exports.sendNewCatererRegisterAdminEmail = function (path, body) {

    Admin.find( (err,admin) => {
        if (err) return res.send(err);
		var emailArray = [];
		
		for(var i = 0; i < admin.length;i++){
			 emailArray.push(admin[i].adminEmail)
		}
        //console.log(JSON.stringify(emailArray))

        var finalEmailArray = JSON.stringify(emailArray).replace("[", "").replace("]", "")
        console.log(finalEmailArray)

        readHTMLFile(__dirname + path, function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                catererEmail    	: body.catererEmail,
                catererName	 	 	: body.catererName,
                catererPhoneNumber  : body.catererPhoneNumber,
                catererAddress      : body.catererAddress,
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'foodiebeeie@gmail.com',
                to : finalEmailArray,
                subject : 'NewCaterer to FoodieBee',
                html : htmlToSend
             };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            });
        });

       // return res.status(200).json(admin);
      });
}

exports.sendCustomerMessageEmail = function (path, body) {

    Admin.find( (err,admin) => {
        if (err) return res.send(err);
		var emailArray = [];
		
		for(var i = 0; i < admin.length;i++){
			 emailArray.push(admin[i].adminEmail)
		}

        var finalEmailArray = JSON.stringify(emailArray).replace("[", "").replace("]", "")

        readHTMLFile(__dirname + path, function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                email    	: body.email,
                message	 	 	: body.message,
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'foodiebeeie@gmail.com',
                to : finalEmailArray,
                subject : 'New Message',
                html : htmlToSend
             };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            });
        });

       // return res.status(200).json(admin);
      });
}


exports.sendResetPasswordEmail = function (path, sendtoemail, resetlink) {
    readHTMLFile(__dirname + path, function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            resetlink: resetlink
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'foodiebeeie@gmail.com',
            to : sendtoemail,
            subject : 'Password Reset',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
            else {
                console.log(response);
            }
        });
    });
}