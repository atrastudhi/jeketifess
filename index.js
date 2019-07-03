var Twit = require('twit')
const env = require('dotenv')
const uploadImage = require('./uploadImage');
const badword = require('bad-words')


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

env.config()

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

let lastId = '1146288591213146117';

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
          let check = events[index - 1].message_create.message_data.text.toUpperCase();

          // KELUHAN
          if (check.includes('[KELUHAN]')) {
            // WHAT TO DO
          } else {
            // CHECK IF HAVE ATTACHMENT (PHOTO)
            if (events[index - 1].message_create.message_data.attachment) {
              if (events[index - 1].message_create.message_data.attachment.media.type == 'photo') {
                let fixTweet = events[index - 1].message_create.message_data.text.split('https')
                uploadImage(events[index - 1].message_create.message_data.attachment.media.media_url, fixTweet[0])
              }
            } else {
              T.post('statuses/update', { status: '[SUREL] ' + filter.clean(events[index - 1].message_create.message_data.text) }, function(err, data, response) {
                if (err) {
                  console.log(err)
                } else {
                  console.log('tweet send')
                }
              })
            }

          }

          lastId = events[index - 1].id
        } else {
          console.log('ga ada')
        }
      }
  })

}, 60000)