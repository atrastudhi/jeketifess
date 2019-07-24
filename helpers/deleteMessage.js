const axios = require('axios');
const oauth = require('oauth-signature');
const nonce = require('nonce-generator');
const dotenv = require('dotenv');

dotenv.config();

let oauth1 = (link, id) => {
    let ncn = nonce(11)
    let epoch = Math.floor(new Date() / 1000)
    let signature = oauth.generate('DELETE', link, {
        oauth_consumer_key: process.env.CONSUMER_KEY,
        oauth_signature_method: "HMAC-SHA1",
        oauth_token: process.env.ACCESS_TOKEN, 
        oauth_version: "1.0",
        oauth_nonce : ncn,
        oauth_timestamp : epoch,
        id: id
      }, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN_SECRET)
    return `OAuth oauth_consumer_key="${process.env.CONSUMER_KEY}",oauth_token="${process.env.ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${epoch}",oauth_nonce="${ncn}",oauth_version="1.0",oauth_signature="${signature}"`
}

let deleteMessage = (id) => {
    let link = `https://api.twitter.com/1.1/direct_messages/events/destroy.json?id=${id}`
    axios.delete(link, {
        headers: {
            Authorization: oauth1(link, id)
        }
    })
    .then(({data}) => {
        console.log('message deleted')
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = deleteMessage;