let validate = (T, sender_id) => {
    return new Promise((resolve, reject) => {
        T.get('followers/ids', { user_id: sender_id },  function (err, data, response) {
            if (err) {
                console.log(err)
                resolve(false)
            }
            
            if (!data.ids) {
                return false
            }

            let followers = data.ids.length;
            console.log('followers: ' + followers)
    
            if (followers < 16) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

module.exports = validate;