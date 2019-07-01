var Twit = require('twit');
const axios = require('axios');
const nonce = require('random-base64-string');
const oauth = require('oauth-signature');
 
var T = new Twit({
  consumer_key:         'FdTX2fTJIsZmLbreFLMGSDCC8',
  consumer_secret:      'bO918imcdfFyicujIHYhxd5J7aXoW4FPOprhP1LablTe0v0li2',
  access_token:         '1141197535110811648-l0ODHTjhJu5UcCAmNOi3asrfOJJNQ3',
  access_token_secret:  'P6pMnDfbQ5VNllS0bXeWDuNYYa5lHi2Q8dT56rmOJcjcE'
})

T.get('direct_messages/events/list', {}, (err, {events}, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(events[0])
      console.log(events[0].message_create.message_data.attachment)
    //   var epoch = (new Date).getTime();
    //   let generateNonce = nonce(30)

    //   let signature = oauth.generate('GET', 'https://ton.twitter.com/1.1/ton/data/dm/1145361919546519556/1145361203650154497/1aLJcJSN.jpg', {
    //     oauth_consumer_key: "FdTX2fTJIsZmLbreFLMGSDCC8",
    //     oauth_nonce: nonce(30),
    //     oauth_signature_method: "HMAC-SHA1", 
    //     oauth_timestamp: epoch, 
    //     oauth_token: "1141197535110811648-l0ODHTjhJu5UcCAmNOi3asrfOJJNQ3", 
    //     oauth_version: "1.0"
    //   }, 'bO918imcdfFyicujIHYhxd5J7aXoW4FPOprhP1LablTe0v0li2', 'P6pMnDfbQ5VNllS0bXeWDuNYYa5lHi2Q8dT56rmOJcjcE')

    //   console.log(epoch, 'epoch')
    //   console.log(generateNonce, 'nonce')
    //   console.log(signature, 'signature')

    //   axios.get('https://ton.twitter.com/1.1/ton/data/dm/1145547666195210244/1145547652253093888/wtpbDfKT.jpg', {
    //       headers: {
    //         authorization: 'OAuth',
    //         oauth_consumer_key: ,
    //         oauth_nonce: generateNonce,
    //         oauth_signature: signature, 
    //         oauth_signature_method: "HMAC-SHA1", 
    //         oauth_timestamp: epoch, 
    //         oauth_token: "1141197535110811648-l0ODHTjhJu5UcCAmNOi3asrfOJJNQ3", 
    //         oauth_version: "1.0"
    //       }
    //   })
    //   .then(data => {
    //     console.log('success ======================================================')
    //     console.log(JSON.stringify(data))
    //   })
    //   .catch(err => {
    //     console.log('error ======================================================')
    //     console.log(JSON.stringify(err))
    //   })
    }
})