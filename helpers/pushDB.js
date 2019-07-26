const DM = require('../models/directMessage')

let pushDB = async (userId, content, validation = {}) => {
    try {
				const insertion = {
					user_id: userId,
					content_dm: content,
					...validation
				};
				console.log(insertion);
        const dm = await DM.create(insertion)
        console.log('saved to db')
    } catch (err) {
        console.log(err)
    }
}

module.exports = pushDB