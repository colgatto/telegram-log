const config = require('./config');
const tLog = require('..');

let options = {
	name: 'awesome project',
	token: config.token,
	receivers: config.receivers
};

tLog.init(options);

//you can add custom options just for the single log
Promise.all([
	tLog.info('User login on https://facebook.com', { disableLinkPreview: true, template: '{{emojiType}}{{text}}' } ),
	tLog.warning('Hardisk `Games` is almost full', { mode: 'Markdown', silent: true, template: 'minimal' } ),
	tLog.error('<b>Internal Server Error</b>', 500, { mode: 'HTML' } ),
	tLog.debug('hello guy', { template: false } )
]).then(()=>{
	console.log('Done');
})