var twilio = require('twilio');
require('dotenv').config();

var accountSid = process.env.TWILIO_accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_authToken;   // Your Auth Token from www.twilio.com/console
var twilioPhoneNumber = process.env.TWILIO_phoneNumber;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

/*exports.call = function () {
    console.log('start calling')
    client.calls
      .create({
         url: 'https://42e8d16f.ngrok.io/auth/voice-call',
         method: 'GET',
         to: '+353831861716',
         from: '+14342150670'
       })
      .then(call => console.log(call.sid))
      .catch((error)=>{console.log("error making call"+ error)});
}*/

/*exports.callToCaterer = function (orderID, catererName, callback) {
  var catererNameEncoded = encodeURIComponent(catererName);
  console.log('start calling...', catererNameEncoded)
  var url = "https://263b1ee6.ngrok.io/twilio/voice?orderID=" + orderID + "&catererName=" + catererNameEncoded
  client.calls
    .create({
       url: url,
       to: '+353831861716',
       from: '+14342150670'
     })
    .then(call => 
      {
        callback(null, call) 
        console.log(call.sid)
      }
    )
    .catch((error)=>{
      callback(error) 
      console.log("error making call"+ error)
    });
}*/

exports.callToCaterer = function (orderID, parentOrderSpeech, childOrderItemSpeech, catererPhoneNumber, callback) {

  var parentOrderSpeechEncoded = encodeURIComponent(parentOrderSpeech);
  var childOrderItemSpeechEncoded = encodeURIComponent(childOrderItemSpeech);
  
  console.log('start calling...', catererPhoneNumber)
  
  var url = "https://foodiebee.eu/twilio/voice?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded
  
  client.calls
    .create({
       url: url,
       to: catererPhoneNumber,
       from: twilioPhoneNumber
     })
    .then(call => 
      {
        callback(null, call) 
        console.log(call.sid)
      }
    )
    .catch((error)=>{
      callback(error) 
      console.log("error making call"+ error)
    });
}