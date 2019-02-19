const config = require('./config');
const tLog = require('..');

let options = {
	token: config.token,
	receivers: config.userId
};

const shortDate = {
	dateformat: 'dd/mm/yy'
};

const noLink = {
	disableLinkPreview: true
};

tLog.init(options);

//you can add custom options just for the single log
tLog.info('User login on https://facebook.com', noLink);
tLog.warning('Hardisk is almost full', {mode: 'HTML'});
tLog.error('Internal Server Error', 500), {mode: 'HTML'};
tLog.debug('hello guy', 123, shortDate);