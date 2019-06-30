var Twit = require('twit')
const env = require('dotenv')

env.config()

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CUNSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

let lastId = '1145357730489618436';

setInterval(() => {
  console.log('running')
  let index;

  T.get('direct_messages/events/list', {}, (err, {events}, response) => {
      if (err) {
        console.log(err)
      } else {
        events.forEach((e, i) => {
          if (e.id === lastId) {
            index = i;
          }
        });

        if (index > 0) {
          console.log('ada dong')

          T.post('statuses/update', { status: events[index - 1].message_create.message_data.text }, function(err, data, response) {
            if (err) {
              console.log(err)
            } else {
              console.log('tweet send')
            }
          })

          lastId = events[index - 1].id
        } else {
          console.log('ga ada')
        }
      }
  })

}, 60000)