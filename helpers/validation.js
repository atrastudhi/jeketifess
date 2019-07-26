const validate = (T, sender_id) => {
    return new Promise((resolve, reject) => {
      T.get('users/lookup', { user_id: sender_id }, (err, data, response) => {
          if (err) {
              console.log(err);
              resolve(false);
          }

          if (!data.length) {
              resolve(false);
          }

          const result = {
              name: data[0].name,
              screen_name: data[0].screen_name,
              followers_count: data[0].followers_count,
              friends_count: data[0].friends_count,
              status_count: data[0].statuses_count,
              twitter_created_at: data[0].created_at,
              bio: data[0].description
          };
          
          if (result.followers_count < 26) {
            resolve(false);
          }

          resolve(result);
      });
    })
}

module.exports = validate;