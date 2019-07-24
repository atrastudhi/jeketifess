const DM = require('../models/directMessage')

let pushDB = async (userId, content) => {
    try {
        const dm = await DM.create({
            user_id: userId,
            content_dm: content
        })
        console.log(dm)
    } catch (err) {
        console.log(err)
    }
}

module.exports = pushDB