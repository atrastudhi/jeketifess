var Twit = require('twit');
const env = require('dotenv');
const badword = require('bad-words');

const uploadImage = require('./uploadImage');
const deleteMessage = require('./deleteMessage')


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
  'bugil',
  'kntl',
  'memeq',
  'bgst'
];

filter.addWords(...cursed);

env.config()

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

setInterval(() => {
  console.log('running')

  T.get('direct_messages/events/list', { count: 50 }, (err, {events}, response) => {
      if (err) {
        console.log(err)
      } else {

        if (events.length > 0) {
          console.log('has direct message')
          let check = events[events.length - 1].message_create.message_data.text.toUpperCase();

          // KELUHAN
          if (false) {
            // WHAT TO DO
          } else {
            // CHECK IF HAVE ATTACHMENT (PHOTO)
            if (events[events.length - 1].message_create.message_data.attachment) {
              if (events[events.length - 1].message_create.message_data.attachment.media.type == 'photo') {
                let fixTweet = events[events.length - 1].message_create.message_data.text.split('https')

                uploadImage(events[events.length - 1].message_create.message_data.attachment.media.media_url, fixTweet[0])
                deleteMessage(events[events.length - 1].id)
              } else {
		deleteMessage(events[events.length - 1].id)
	      }
            } else {
              T.post('statuses/update', { status: '[SUREL] ' + filter.clean(events[events.length - 1].message_create.message_data.text) }, function(err, data, response) {
                if (err) {
                  console.log(err)
		  deleteMessage(events[events.length - 1].id)
                } else {
                  console.log('tweet send')
                  deleteMessage(events[events.length - 1].id)
                }
              })
            }

          }

        } else {
          console.log('no direct message')
        }
      }
  })

}, 60000)
