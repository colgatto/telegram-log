const config = require('./config');
const botLog = require('./botLog').init({
	name: 'progetto di prova',
	token: config.token,
	userId: config.userId,
	dateformat: 'd/mm/yyyy, HH:MM:ss',
	mode: 'HTML',
	disable_web_page_preview: false,
	disable_notification: false,
});

botLog.warning('3');