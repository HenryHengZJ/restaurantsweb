var twilio = require('twilio');
require('dotenv').config();

var accountSid = process.env.TWILIO_accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_authToken;   // Your Auth Token from www.twilio.com/console
var twilioPhoneNumber = process.env.TWILIO_phoneNumber;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);



exports.callToCaterer = function (orderID, parentOrderSpeech, childOrderItemSpeech, catererPhoneNumber, count, callback) {

  var parentOrderSpeechEncoded = encodeURIComponent(parentOrderSpeech);
  var childOrderItemSpeechEncoded = encodeURIComponent(childOrderItemSpeech);
  var catererPhoneNumberEncoded = encodeURIComponent(catererPhoneNumber);
  
  console.log('start calling...', catererPhoneNumber)
  
  var url = "https://foodiebee.herokuapp.com/twilio/voice?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded
  
  var finalcount = 0
  console.log("callCaterer count = ", count)
  if (typeof count !== 'undefined') {
	  finalcount = count
  }
  
  var callbackurl = "https://foodiebee.herokuapp.com/twilio/statuscallback?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded + "&catererPhoneNumber=" + catererPhoneNumberEncoded + "&count=" + finalcount

  client.calls
    .create({
       url: url,
       to: catererPhoneNumber,
       from: twilioPhoneNumber,
       statusCallback: callbackurl,
       statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
       statusCallbackMethod: 'POST',
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