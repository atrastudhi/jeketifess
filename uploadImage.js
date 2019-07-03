const axios = require('axios');
var Twit = require('twit');
const dotenv = require('dotenv');
const badword = require('bad-words')
const oauth = require('oauth-signature')
const nonce = require('nonce-generator');

const toBase64 = require('base64-arraybuffer')

dotenv.config();

const filter = new badword();

const cursed = [
  'ngentot',
  'ngewe',
  'kontol',
  'memek',
  'tai',
  'jancok',
  'asu',
  'bangsat',
  'tempik',
  'ngentu',
  'anjing',
  'babi',
  'peler',
  'pelir',
  'itil',
  'ngewe',
  'ewe',
  'bokep',
  'bugil'
];

filter.addWords(...cursed);

var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

let oauth1 = (link) => {
    let ncn = nonce(11)
    let epoch = Math.floor(new Date() / 1000)
    let signature = oauth.generate('GET', link, {
        oauth_consumer_key: process.env.CONSUMER_KEY,
        oauth_signature_method: "HMAC-SHA1",
        oauth_token: process.env.ACCESS_TOKEN, 
        oauth_version: "1.0",
        oauth_nonce : ncn,
        oauth_timestamp : epoch
      }, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN_SECRET)
    return `OAuth oauth_consumer_key="${process.env.CONSUMER_KEY}",oauth_token="${process.env.ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${epoch}",oauth_nonce="${ncn}",oauth_version="1.0",oauth_signature="${signature}"`
}

let uploadImage = (link, tweet) => {
    axios.get(link, {
        headers: {
            Authorization: oauth1(link)
        },
        responseType: 'arraybuffer',
        'content-type': 'application/x-www-form-urlencoded'
    })
    .then(({data}) => {
        var base64String = toBase64.encode(data)
        
        T.post('media/upload', { media_data: base64String }, (err, data, response) => {
            if (err) {
                console.log(err)
            } else {
                let media_id = data.media_id_string;
                T.post('statuses/update', { status: '[SUREL] ' + filter.clean(tweet), media_ids: media_id }, function(err, data, response) {
                    if (err) {
                    console.log(err)
                    } else {
                    console.log('tweet send')
                    }
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = uploadImage;