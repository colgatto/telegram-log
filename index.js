const https = require('https');
const dateformat = require('dateformat');

const send = (path) => {
	let req = https.request({
		host: 'api.telegram.org',
		method: 'GET',
		path
	});
	req.on('error',(err)=>{console.error(err);});
	//req.on('data',(data)=>{console.log(data);});
	req.end();
};

module.exports = {
	init: function(options){
		this.token = options.token;
		this.userId = options.userId;
		this.name = typeof options.name !== 'undefined' ? options.name : null;
		this.mode = typeof options.mode !== 'undefined' ? options.mode : 'text';
		this.disable_web_page_preview = typeof options.disable_web_page_preview !== 'undefined' && options.disable_web_page_preview !== false;
		this.disable_notification = typeof options.disable_notification !== 'undefined' && options.disable_notification !== false;
		this.dateformat = typeof options.dateformat !== 'undefined' ? options.dateformat : 'd/mm/yyyy, HH:MM:ss';
		return this;
	},
	pathMaker: function(label, text, code){
		switch(this.mode){
			case 'text':
				text = encodeURI(
					'[' + dateformat(new Date(),this.dateformat) + '] ' + (this.name !== null ? this.name : '') + '\n'
						+ label + (code!==null ? '(' + code + ')' : '') + '\n'
						+ text);
				break;
			//TODO
			/*
			case 'Markdown':
				text = encodeURI(
					'[' + dateformat(new Date(),this.dateformat) + '] ' + (this.name !== null ? this.name : '') + '\n'
						+ label + (code!==null ? '(' + code + ')' : '') + '\n'
						+ text
				);// + '&parse_mode=Markdown';
				break;
			*/
			case 'HTML':
				text = encodeURI(
					'<pre>'
						+ (this.name !== null ? this.name : '') + '\n'
						+ '[' + dateformat(new Date(),this.dateformat) + ']\n'
						+ label + (code!==null ? '(' + code + ')' : '') + '\n'
						+ text
					+'</pre>'
				) + '&parse_mode=HTML';
				break;
		}
		return '/bot' + this.token + '/sendMessage?chat_id=' + this.userId + '&text=' + text
			+ (this.disable_web_page_preview ? '&disable_web_page_preview=1' : '')
			+ (this.disable_web_page_preview ? '&disable_notification=1' : '');
	},
	info: function (text,code=null) {
		send(this.pathMaker('INFO', text, code));
	},
	warning: function (text,code=null) {
		send(this.pathMaker('WARNING', text, code));
	},
	error: function (text,code=null) {
		send(this.pathMaker('ERROR', text, code));
	},
	debug: function (text,code=null) {
		send(this.pathMaker('DEBUG', text, code));
	},
};