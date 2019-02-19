const https = require('https');
const dateformat = require('dateformat');

module.exports = (function (){

	const defaultOpt = {
		token: '',
		receivers: [],
		name: null,
		mode: 'text',
		dateformat: 'd/mm/yyyy, HH:MM:ss',
		disableLinkPreview: false,
		silent: false,
	};

	this.init = (options) => {
		if(typeof options.token === 'undefined') throw 'token required!'
		if(typeof options.receivers === 'undefined') throw 'receivers required!'
		if(typeof options.receivers === 'string') options.receivers = [options.receivers];
		this.options = Object.assign( {}, defaultOpt, options);
		return this;
	};

	const send = (data) => {
		for (let i = 0, l = data.options.receivers.length; i < l; i++) {
			
			let fullPath = data.path + '&chat_id=' + data.options.receivers[i];

			let req = https.request({
				host: 'api.telegram.org',
				method: 'GET',
				path: fullPath
			});
			req.on('error',(err)=>{console.error(err);});
			//req.on('data',(data)=>{console.log(data);});
			req.end();

			console.log('MANDO: ' + decodeURI(fullPath));
		}
	};
	
	const pathMaker = (label, text, code, options) => {
		switch(options.mode){
			case 'HTML':
				text = encodeURI(
					'<pre>'
						+ (options.name !== null ? options.name + '\n' : '')
						+ '[' + dateformat(new Date(), options.dateformat) + ']\n'
						+ label + (code!=='' ? '(' + code + ')' : '') + '\n'
						+ text
					+'</pre>'
				) + '&parse_mode=HTML';
				break;
			//TODO
			/*
			case 'Markdown':
				text = encodeURI(
					'[' + dateformat(new Date(), options.dateformat) + '] ' + (options.name !== null ? options.name : '') + '\n'
						+ label + (code!=='' ? '(' + code + ')' : '') + '\n'
						+ text
				);// + '&parse_mode=Markdown';
				break;
			*/
			default:
				text = encodeURI(
					'[' + dateformat(new Date(), options.dateformat) + '] ' + (options.name !== null ? options.name : '') + '\n'
						+ label + (code!=='' ? '(' + code + ')' : '') + '\n'
						+ text);
				break;
		}
		return {
			path: '/bot' + options.token + '/sendMessage?text=' + text
				+ (options.disableLinkPreview ? '&disable_web_page_preview=1' : '')
				+ (options.silent ? '&disable_notification=1' : ''),
			options
		};
	};
	
	const takeParameters = (code,options) => {
		/*
		botLog('ciao');
		botLog('ciao',42);
		botLog('ciao',{silent:true});
		botLog('ciao',42,{silent:true});
		*/
		let finalC = '';
		let finalOpt = {};
		let codeIsOption = false;
		if(code !== null){
			if(typeof code === 'object'){
				finalOpt = code;
				codeIsOption = true;
			}else{
				finalC = parseInt(code);
			}
		}
		if(options!=null && !codeIsOption){
			finalOpt = options;
		}
		return {
			code: finalC,
			options: Object.assign({},this.options,finalOpt)
		};
	};

	this.info = (text, code=null, options=null) => {
		const param = takeParameters(code,options);
		send(pathMaker('INFO', text, param.code, param.options));
	};
	
	this.warning = (text,code=null, options=null) => {
		const param = takeParameters(code,options);
		send(pathMaker('WARNING', text, param.code, param.options));
	};
	
	this.error = (text,code=null, options=null) => {
		const param = takeParameters(code,options);
		send(pathMaker('ERROR', text, param.code, param.options));
	};
	
	this.debug = (text,code=null, options=null) => {
		const param = takeParameters(code,options);
		send(pathMaker('DEBUG', text, param.code, param.options));
	};
	
	return this;
})();