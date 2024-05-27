const accountSid = "Your_account_sid";
const authToken = "Your_auth_token";
const client = require("twilio")(accountSid, authToken);

exports.sendMsg = (msg) => {
    client.messages
        .create({ body: msg, from: "+12057493265", to: "+your_number" })
        .then(message => console.log(message.sid));
}