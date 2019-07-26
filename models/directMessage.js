const Sequelize = require('sequelize');
const config = require('../config/db');

const DM = config.define('DirectMessage', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content_dm: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		screen_name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		followers_count: {
				type: Sequelize.INTEGER,
				allowNull: true
		},
		friends_count: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		status_count: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		twitter_created_at: {
			type: Sequelize.STRING,
			allowNull: true
		},
		bio: {
			type: Sequelize.STRING,
			allowNull: true
		},
}, {
})

module.exports = DM;