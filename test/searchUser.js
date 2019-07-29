var Twit = require('twit');
const env = require('dotenv');

env.config()

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

T.get('users/lookup', { user_id: '551679581' }, (err, data, response) => {
    console.log(data)
})