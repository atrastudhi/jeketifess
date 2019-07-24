var Twit = require('twit');
const env = require('dotenv');
const badword = require('bad-words');

env.config()

const uploadImage = require('./helpers/uploadImage');
const deleteMessage = require('./helpers/deleteMessage');
const pushDM = require('./helpers/pushDB');
const validate = require('./helpers/validation');

const DM = require('./models/directMessage')

const filter = new badword();


const cursed = [
  'ngentot',
  'ngewe',
  'kontol',
  'memek',
  'pepek',
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


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

setInterval(() => {
  console.log('running...')
  
  T.get('direct_messages/events/list', { count: 50 }, async (err, {events}, response) => {
      if (err) {
        console.log(err)
      } else {
        if (events.length > 0) {
          console.log('has direct message')
          
          let validation = await validate(T, events[events.length - 1].message_create.sender_id);
          
          // validate followers minimal 15
          if (validation) {
              console.log('validated user');
              // CHECK IF HAVE ATTACHMENT (PHOTO)
              if (events[events.length - 1].message_create.message_data.attachment) {
                if (events[events.length - 1].message_create.message_data.attachment.media.type == 'photo') {
                  let fixTweet = events[events.length - 1].message_create.message_data.text.split('https')
                  
                  uploadImage(events[events.length - 1].message_create.message_data.attachment.media.media_url, fixTweet[0], events[events.length - 1].message_create.sender_id)
                  deleteMessage(events[events.length - 1].id)
                } else {
                  deleteMessage(events[events.length - 1].id)
                }
              } else {
                // NOT HAVE ATTACHMENT PHOTO
                T.post('statuses/update', { status: '[SUREL] ' + filter.clean(events[events.length - 1].message_create.message_data.text) }, function(err, data, response) {
                  if (err) {
                    console.log(err)
                    deleteMessage(events[events.length - 1].id)
                  } else {
                    console.log('tweet send')
                    await pushDM(events[events.length - 1].message_create.sender_id, data.id_str);
                    deleteMessage(events[events.length - 1].id);
                  }
                })
              }
          } else {
            console.log('not validated user')
            pushDM(events[events.length - 1].message_create.sender_id, events[events.length - 1].message_create.message_data.text);
            deleteMessage(events[events.length - 1].id);
          }

        } else {
          console.log('no direct message')
        }
      }
  })

}, 60000)
