var Twit = require('twit');
const axios = require('axios');
const nonce = require('random-base64-string');
const oauth = require('oauth-signature');
 
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

T.get('direct_messages/events/list', {}, (err, {events}, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(events[0])
      console.log(events[0].message_create.message_data.attachment)
      var epoch = (new Date).getTime();
      let generateNonce = nonce(30)

      let signature = oauth.generate('GET', 'https://ton.twitter.com/1.1/ton/data/dm/1145361919546519556/1145361203650154497/1aLJcJSN.jpg', {
        oauth_consumer_key: process.env.CONSUMER_KEY,
        oauth_nonce: nonce(30),
        oauth_signature_method: "HMAC-SHA1", 
        oauth_timestamp: epoch, 
        oauth_token: process.env.ACCESS_TOKEN, 
        oauth_version: "1.0"
      }, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN_SECRET)

      console.log(epoch, 'epoch')
      console.log(generateNonce, 'nonce')
      console.log(signature, 'signature')

      axios.get('https://ton.twitter.com/1.1/ton/data/dm/1145547666195210244/1145547652253093888/wtpbDfKT.jpg', {
          headers: {
            authorization: 'OAuth',
            oauth_consumer_key: process.env.CONSUMER_KEY,
            oauth_nonce: generateNonce,
            oauth_signature: signature, 
            oauth_signature_method: "HMAC-SHA1", 
            oauth_timestamp: epoch, 
            oauth_token: process.env.ACCESS_TOKEN, 
            oauth_version: "1.0"
          }
      })
      .then(data => {
        console.log(JSON.stringify(data))
      })
      .catch(err => {
        console.log(JSON.stringify(err))
      })
    }
})