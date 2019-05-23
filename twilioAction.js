var twilio = require('twilio');

var accountSid = 'ACff696d39950bf3f9955ccc4527134942'; // Your Account SID from www.twilio.com/console
var authToken = '0cc422c0e9ac64e0aa63177ecb9be52f';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

exports.callToCaterer = function () {
    console.log('start calling')
    client.calls
      .create({
         url: 'https://12a720c4.ngrok.io/auth/voice-call',
         method: 'GET',
         to: '+353831861716',
         from: '+14342150670'
       })
      .then(call => console.log(call.sid))
      .catch((error)=>{console.log("error making call"+ error)});
}

