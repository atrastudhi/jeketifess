var Twit = require('twit');
const env = require('dotenv');

env.config()

const deleteMessage = require('../helpers/deleteMessage');


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

setInterval(() => {
    console.log('running...')
  
  T.get('direct_messages/events/list', { count: 50 }, async (err, {events}, response) => {
    if (events.length > 0) {
        console.log('otw delete');
        deleteMessage(events[events.length - 1]);
    } else {
        console.log('gaono maneh')
    }
  })

}, 60000)