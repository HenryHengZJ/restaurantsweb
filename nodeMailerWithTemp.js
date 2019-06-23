
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var Admin = require('./models/admin');
var moment = require('moment');
require('dotenv').config();

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
    //  service: 'gmail',
  //  host: 'smtp.gmail.com',
    host: 'smtp.zoho.com',
   // secure: mailConfig.secure,
  //  port: mailConfig.port,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.zohoUser,
        pass: process.env.zohoPassword
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
            from: 'FoodieBee <support@foodiebee.eu>',
            to : body.catererEmail,
            subject : 'Welcome to FoodieBee',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
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
            from: 'FoodieBee <support@foodiebee.eu>',
            to : sendtoemail,
            subject : 'Thank you for your interest in FoodieBee',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
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
            from: 'FoodieBee <support@foodiebee.eu>',
            to : sendtoemail,
            subject : 'Thanks for your interest',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
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
                from: 'FoodieBee <support@foodiebee.eu>',
                to : finalEmailArray,
                subject : 'NewCaterer to FoodieBee',
                html : htmlToSend
             };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                }
            });
        });

       // return res.status(200).json(admin);
      });
}

exports.sendCustomerMessageEmail = function (path, body) {

    Admin.find( (err,admin) => {
        if (err) {
            return res.send(err);
        }
        else {
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
                    from: 'FoodieBee <support@foodiebee.eu>',
                    to : finalEmailArray,
                    subject : 'New Message',
                    html : htmlToSend
                };
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(response);
                    }
                });
            });
        }

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
            from: 'FoodieBee <support@foodiebee.eu>',
            to : sendtoemail,
            subject : 'Password Reset',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(response);
            }
        });
    });
}

var fs = require('fs');

exports.sendCustomerOrderEmail = function (path,  orderdetails,  catererName, customerEmail) {
  
    getCustomerOrderVariables(orderdetails, function(err, totalRow, str_orderDescrip, str_orderStatus, str_orderID, str_orderDate, str_orderType, str_orderTypeCapitalLetter, str_deliveryDate, str_deliveryTime, str_deliveryAddress, str_subtotal, str_deliveryfee, str_ordertotal, str_footer1) {

        readHTMLFile(__dirname + path, function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                catererName: catererName,
                newrow: totalRow,
                str_orderDescrip: str_orderDescrip,
                str_orderStatus: str_orderStatus,
                str_orderID: str_orderID,
                str_orderDate: str_orderDate,
                str_orderType: str_orderType,
                str_orderTypeCapitalLetter: str_orderTypeCapitalLetter,
                str_deliveryDate: str_deliveryDate,
                str_deliveryTime: str_deliveryTime,
                str_deliveryAddress: str_deliveryAddress,
                str_subtotal: str_subtotal,
                str_deliveryfee: str_deliveryfee,
                str_ordertotal: str_ordertotal,
                str_footer1: str_footer1
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'FoodieBee <support@foodiebee.eu>',
                to : customerEmail,
                subject : orderdetails.orderStatus === "pending" ? 'Pending Order Details' : orderdetails.orderStatus === "accepted" ? 'Order Accepted Details' : orderdetails.orderStatus === "rejected" ? 'Order Rejected Details' : "Order Details",
                html : htmlToSend
             };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(response);
                }
            });
    
           
            /*fs.writeFile("test.html", htmlToSend, function(err) {
                if(err) {
                    return console.log(err);
                }
            });*/
        });

    });

}


exports.sendCatererOrderEmail = function (path,  orderdetails,  catererEmail) {
  
    getCatererOrderVariables(orderdetails, function(err, totalRow, str_orderTitle, str_orderDescrip, str_orderStatus, str_orderID, str_orderDate, str_orderType, str_paymentType, str_paymentStatus, str_orderTypeCapitalLetter, str_deliveryDate, str_deliveryTime, str_deliveryAddress, str_customerName, str_customerPhone, str_subtotal, str_deliveryfee, str_ordertotal, str_footer1) {

        readHTMLFile(__dirname + path, function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                newrow: totalRow,
                str_orderTitle: str_orderTitle,
                str_orderDescrip: str_orderDescrip,
                str_orderStatus: str_orderStatus,
                str_orderID: str_orderID,
                str_orderDate: str_orderDate,
                str_orderType: str_orderType,
                str_paymentType: str_paymentType,
                str_paymentStatus: str_paymentStatus,
                str_orderTypeCapitalLetter: str_orderTypeCapitalLetter,
                str_deliveryDate: str_deliveryDate,
                str_deliveryTime: str_deliveryTime,
                str_deliveryAddress: str_deliveryAddress,
                str_customerName: str_customerName,
                str_customerPhone: str_customerPhone,
                str_subtotal: str_subtotal,
                str_deliveryfee: str_deliveryfee,
                str_ordertotal: str_ordertotal,
                str_footer1: str_footer1
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'FoodieBee <support@foodiebee.eu>',
                to : catererEmail,
                subject : orderdetails.orderStatus === "pending" ? 'Pending Order Details' : orderdetails.orderStatus === "accepted" ? 'Order Accepted Details' : orderdetails.orderStatus === "rejected" ? 'Order Rejected Details' : "Order Details",
                html : htmlToSend
             };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(response);
                }
            });
    
           
            /*fs.writeFile("testcaterer.html", htmlToSend, function(err) {
                if(err) {
                    return console.log(err);
                }
            });*/
        });

    });

}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function capitalizeAllLetter(string) {
    return string.toUpperCase();
}

var getCustomerOrderVariables = function(orderdetails, callback) {

    var order = orderdetails
    var ordereditem = order.orderItem

    var str_orderDescrip = ""
    var str_orderStatus = ""
    
    if (order.orderStatus === 'pending') {
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">Your order status is now pending. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">We will notify you as orders are accepted or rejected.&nbsp;</p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#D48344;background:#F6B26B;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#F6B26B;border-width:10px 20px 10px 20px;display:inline-block;background:#F6B26B;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">PENDING</a> </span>`
    }
    else if (order.orderStatus === 'accepted') {
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">Your order status is accepted. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">You will receive your invoice in 2-3 business days.&nbsp;</p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#32CD32;background:#32CD32;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#32CD32;border-width:10px 20px 10px 20px;display:inline-block;background:#32CD32;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">ACCEPTED</a> </span>`
    }
    else if (order.orderStatus === 'rejected') {
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">Your order status is rejected. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">If you have any queries, contact us at <a target="_blank" href="mailto:support@foodiebee.eu" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#47AADA;">support@foodiebee.eu</a></p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#ff0000;background:#ff0000;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#ff0000;border-width:10px 20px 10px 20px;display:inline-block;background:#ff0000;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">REJECTED</a> </span>`
    }

    var str_orderID = order._id;
    
    var str_orderDate = moment(order.createdAt).format("MMM DD, YYYY");

    var str_orderType = capitalizeFirstLetter(order.orderType);

    var str_orderTypeCapitalLetter = capitalizeAllLetter(order.orderType)

    var str_deliveryDate = moment(order.deliverydate).format("MMM DD, YYYY");
  
    var str_deliveryTime = moment(order.deliverytime, "HH:mm").format("hh:mm A");
     
    var str_deliveryAddress = order.orderType === 'delivery' ? `<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-bottom:30px;"><table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td width="560" align="left" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFFFFF;border-width:1px;border-style:solid;border-color:#EFEFEF;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tr style="border-collapse:collapse;"><td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;">DELIVERY ADDRESS:</h4></td></tr><tr style="border-collapse:collapse;"><td id="deliveryAddress" align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">${order.deliveryaddress}</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table>` : "";
  
    var subtotal = order.totalOrderPrice - order.deliveryfee
    var str_subtotal = '€' + Number(subtotal).toFixed(2);
      
    var str_deliveryfee = '€' + Number(order.deliveryfee).toFixed(2);
      
    var str_ordertotal = '€' + Number(order.totalOrderPrice).toFixed(2);
     
    var str_footer1 = `This email was sent to ${order.customerDetails[0].customerEmail}. If you have any questions or concerns, please contact us at `
    
    var totalRow = ""

    for(var x=0; x<ordereditem.length; x++) {
      
        var newRow = "";
 
        var selections  = ordereditem[x].selection
        var selectionitems_html  = "";
        for(var y=0; y<selections.length; y++) {
          var selectionstext = selections[y].selectioncategory + ": "
          
          var selectionsitem = selections[y].selectionitem
          var selections_itemtext = ""
          for(var z=0; z<selectionsitem.length; z++) {
            if (z === selectionsitem.length - 1) {
              selections_itemtext = selections_itemtext + selectionsitem[z].selectionitemtitle
            }
            else {
              selections_itemtext = selections_itemtext + selectionsitem[z].selectionitemtitle + ", "
            }
          }
          
          selectionstext = selectionstext + selections_itemtext

          selectionitems_html = selectionitems_html + `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#696969;">&nbsp;- ${selectionstext}</p>`;
          
        }
        
        if (typeof ordereditem[x].instruction !== 'undefined') {
          selectionitems_html = selectionitems_html + `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#696969;">&nbsp;- Instruction: ${ordereditem[x].instruction}</p>`;
        }
        
        newRow = `<tr style="border-collapse:collapse;"> <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-right:20px;padding-left:40px;"> <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td width="540" align="left" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0"> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:15px;text-decoration:underline;color:#0C9CE2;" href="https://foodiebee.eu">${ordereditem[x].title}</a></td><td style="padding:0;Margin:0;text-align:center;" width="60">${ordereditem[x].quantity}</td><td style="padding:0;Margin:0;text-align:center;" width="100">€${Number(ordereditem[x].totalprice).toFixed(2)}</td></tr><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;font-size:14px;color:#808080;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#808080;"><em>serves ${ordereditem[x].serveperunit} per unit</em></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p></td><td style="padding:0;Margin:0;text-align:center;" width="60"><br></td><td style="padding:0;Margin:0;text-align:center;" width="100"><br></td></tr><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;">${selectionitems_html}</td><td style="padding:0;Margin:0;text-align:center;" width="60"><br></td><td style="padding:0;Margin:0;text-align:center;" width="100"><br></td></tr></table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p></td></tr></table> </td></tr></table> </td></tr>`;

        totalRow = totalRow + newRow
      }

      callback(null, totalRow, str_orderDescrip, str_orderStatus, str_orderID, str_orderDate, str_orderType, str_orderTypeCapitalLetter, str_deliveryDate, str_deliveryTime, str_deliveryAddress, str_subtotal, str_deliveryfee, str_ordertotal, str_footer1)

}


var getCatererOrderVariables = function(orderdetails, callback) {

    var order = orderdetails
    var ordereditem = order.orderItem

    var str_orderTitle = ""
    var str_orderDescrip = ""
    var str_orderStatus = ""
    
    if (order.orderStatus === 'pending') {
      str_orderTitle = "New Order"
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">You have a new pending order. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">You may accept or reject the order from your caterer dashboard.&nbsp;</p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#D48344;background:#F6B26B;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://caterer.foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#F6B26B;border-width:10px 20px 10px 20px;display:inline-block;background:#F6B26B;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">PENDING</a> </span>`
    }
    else if (order.orderStatus === 'accepted') {
      str_orderTitle = "Order Accepted"
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">Your have accepted the order. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">Payment will be deposited to your account in 7 business working day.&nbsp;</p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#32CD32;background:#32CD32;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://caterer.foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#32CD32;border-width:10px 20px 10px 20px;display:inline-block;background:#32CD32;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">ACCEPTED</a> </span>`
    }
    else if (order.orderStatus === 'rejected') {
      str_orderTitle = "Order Rejected"
      str_orderDescrip = `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">You have rejected the order. <br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;">If you have any queries, contact us at <a target="_blank" href="mailto:support@foodiebee.eu" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#47AADA;">support@foodiebee.eu</a></p> `;
      str_orderStatus = `<span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#ff0000;background:#ff0000;border-width:0px;display:inline-block;border-radius:15px;width:auto;"> <a href="https://caterer.foodiebee.eu" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#ff0000;border-width:10px 20px 10px 20px;display:inline-block;background:#ff0000;border-radius:15px;font-weight:600;font-style:normal;line-height:19px;width:auto;text-align:center;">REJECTED</a> </span>`
    }

    var str_orderID = order._id;
    
    var str_orderDate = moment(order.createdAt).format("MMM DD, YYYY");

    var str_orderType = capitalizeFirstLetter(order.orderType);

    var str_paymentType = capitalizeFirstLetter(order.paymentType);

    var str_paymentStatus = capitalizeFirstLetter(order.paymentStatus);

    var str_orderTypeCapitalLetter = capitalizeAllLetter(order.orderType)

    var str_deliveryDate = moment(order.deliverydate).format("MMM DD, YYYY");
  
    var str_deliveryTime = moment(order.deliverytime, "HH:mm").format("hh:mm A");
     
    var str_deliveryAddress = order.orderType === 'delivery' ? `<tr style="border-collapse:collapse;"><td style="padding:0;Margin:0;font-size:14px;line-height:21px;">Delivery To:</td><td id="deliveryTime" style="padding:0;Margin:0;font-size:14px;line-height:21px;">${order.deliveryaddress}</td></tr>` : "";
      
    var str_customerName = order.customerDetails[0].customerFirstName +  " " + order.customerDetails[0].customerLastName

    var str_customerPhone = order.customerDetails[0].customerPhoneNumber  
    
    var subtotal = order.totalOrderPrice - order.deliveryfee
    var str_subtotal = '€' + Number(subtotal).toFixed(2);
      
    var str_deliveryfee = '€' + Number(order.deliveryfee).toFixed(2);
      
    var str_ordertotal = '€' + Number(order.totalOrderPrice).toFixed(2);
     
    var str_footer1 = `This email was sent to ${order.customerDetails[0].customerEmail}. If you have any questions or concerns, please contact us at `
    
    var totalRow = ""

    for(var x=0; x<ordereditem.length; x++) {
      
        var newRow = "";
 
        var selections  = ordereditem[x].selection
        var selectionitems_html  = "";
        for(var y=0; y<selections.length; y++) {
          var selectionstext = selections[y].selectioncategory + ": "
          
          var selectionsitem = selections[y].selectionitem
          var selections_itemtext = ""
          for(var z=0; z<selectionsitem.length; z++) {
            if (z === selectionsitem.length - 1) {
              selections_itemtext = selections_itemtext + selectionsitem[z].selectionitemtitle
            }
            else {
              selections_itemtext = selections_itemtext + selectionsitem[z].selectionitemtitle + ", "
            }
          }
          
          selectionstext = selectionstext + selections_itemtext

          selectionitems_html = selectionitems_html + `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#696969;">&nbsp;- ${selectionstext}</p>`;
          
        }
        
        if (typeof ordereditem[x].instruction !== 'undefined') {
          selectionitems_html = selectionitems_html + `<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#696969;">&nbsp;- Instruction: ${ordereditem[x].instruction}</p>`;
        }
        
        newRow = `<tr style="border-collapse:collapse;"> <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-right:20px;padding-left:40px;"> <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td width="540" align="left" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0"> <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:15px;text-decoration:underline;color:#0C9CE2;" href="https://caterer.foodiebee.eu">${ordereditem[x].title}</a></td><td style="padding:0;Margin:0;text-align:center;" width="60">${ordereditem[x].quantity}</td><td style="padding:0;Margin:0;text-align:center;" width="100">€${Number(ordereditem[x].totalprice).toFixed(2)}</td></tr><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;font-size:14px;color:#808080;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#808080;"><em>serves ${ordereditem[x].serveperunit} per unit</em></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p></td><td style="padding:0;Margin:0;text-align:center;" width="60"><br></td><td style="padding:0;Margin:0;text-align:center;" width="100"><br></td></tr><tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0;">${selectionitems_html}</td><td style="padding:0;Margin:0;text-align:center;" width="60"><br></td><td style="padding:0;Margin:0;text-align:center;" width="100"><br></td></tr></table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p></td></tr></table> </td></tr></table> </td></tr>`;

        totalRow = totalRow + newRow
      }

      callback(null, totalRow, str_orderTitle, str_orderDescrip, str_orderStatus, str_orderID, str_orderDate, str_orderType,  str_paymentType, str_paymentStatus, str_orderTypeCapitalLetter, str_deliveryDate, str_deliveryTime, str_deliveryAddress, str_customerName, str_customerPhone, str_subtotal, str_deliveryfee, str_ordertotal, str_footer1)

}