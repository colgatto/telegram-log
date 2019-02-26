const https = require('https');
const dateformat = require('dateformat');
const template = require('./template.js');

module.exports = (function (){
	
	//#region PRIVATE
	
	const defaultOpt = {
		token: '',
		receivers: [],
		projectName: '',
		mode: 'text',
		dateformat: 'd/mm/yyyy, HH:MM:ss',
		disableLinkPreview: false,
		silent: false,
		template: 'default'
	};

	const send = (data) => {
		for (let i = 0, l = data.options.receivers.length; i < l; i++) {
			
			let req = https.request({
				host: 'api.telegram.org',
				method: 'GET',
				path: data.path + '&chat_id=' + data.options.receivers[i]
			});

			req.on('error',(err)=>{console.error(err);});
			//req.on('data',(data)=>{console.log(data);});
			req.end();
			
			//console.log('GET: https://api.telegram.org' + data.path + '&chat_id=' + data.options.receivers[i]);
			//console.log(decodeURI(data.path));
		}
	};

	const typeToEmoji = (type) => {
		switch(type){
			case 'info':
				return '\ud83d\udcac';
			case 'warning':
				return '\u26a0';
			case 'error':
				return '\u203c';
			case 'debug':
				return '\ud83d\udc1e';
			}
		return '';
	};

	const logFormatter = (text, code, options) => {
		let r = '';
		const templateValue = {
			text: text,
			code: code,
			projectName: options.projectName,
			date: dateformat(new Date(), options.dateformat),
			type: options.type,
			emojiType: typeToEmoji(options.type)
		}
		if(options.template){
			let t = typeof template[options.template] !== "undefined"
				? template[options.template][options.mode]
				: options.template;
			for(tv in templateValue){
				t = t.replace(
					new RegExp('\{\{' + tv + '\}\}','g'),
					(templateValue[tv]).replace(/{/g,'\\{').replace(/}/g,'\\}')
				);
			}
			t = t.replace(/\\{/g,'{').replace(/\\}/g,'}');
			return encodeURI(t);
		}else{
			return encodeURI(text);
		}
	};

	const pathMaker = (text, code, options) => {
		const initPath =  '/bot' + options.token + '/sendMessage?text=' + logFormatter(text, code, options);
		const additionalBlock = [{
			cond: options.disableLinkPreview,
			val: 'disable_web_page_preview=1'
		},{
			cond: options.silent,
			val: 'disable_notification=1'
		},{
			cond: options.mode === 'markdown',
			val: 'parse_mode=Markdown'
		},{
			cond: options.mode === 'html',
			val: 'parse_mode=HTML'
		}];
		const restOfPath = additionalBlock.filter(x=>x.cond).map(x=>x.val).join('&');
		return {
			path: restOfPath.length > 0 ? initPath + '&' + restOfPath : initPath,
			options
		};
	};
	
	const takeParameters = (code, options, type) => {
		let finalC = '';
		let customOpt = {};
		let codeIsOption = false;
		if(code !== null){
			if(typeof code === 'object'){
				customOpt = code;
				codeIsOption = true;
			}else{
				finalC = code + '';
			}
		}
		if(options!=null && !codeIsOption){
			customOpt = options;
		}
		let finalOpt = Object.assign({}, this.options, customOpt, { type: type } );
		let lowMode = finalOpt.mode.toLowerCase();
		if(lowMode === 'html') finalOpt.mode = 'html';
		else if(lowMode === 'markdown') finalOpt.mode = 'markdown';
		else finalOpt.mode = 'text';
		return {
			code: finalC,
			options: finalOpt
		};
	};
	
	//#endregion
	
	//#region PUBBLIC
	
	/**
	 * initialize logger
	 * @param {object} options option for the logger, options.token and options.receivers are required
	 * @return {telegram-log}
	 */
	this.init = (options) => {
		if(typeof options.token === 'undefined') throw 'token required!'
		if(typeof options.receivers === 'undefined') throw 'receivers required!'
		if(typeof options.receivers === 'string') options.receivers = [options.receivers];
		this.options = Object.assign( {}, defaultOpt, options);
		return this;
	};
	/**
	 * send log to bot whit type set to info
	 * @param {string} text message to log
	 * @param {number} code log code (optional)
	 * @param {object} options custom option for single-use (optional)
	 */
	this.info = (text, code=null, options=null) => {
		const param = takeParameters(code, options, 'info');
		//console.log(decodeURI(textFormatter(text, param.code, param.options)));
		send(pathMaker(text, param.code, param.options));
	};
	/**
	 * send log to bot whit type set to warning
	 * @param {string} text message to log
	 * @param {number} code log code (optional)
	 * @param {object} options custom option for single-use (optional)
	 */
	this.warning = (text, code=null, options=null) => {
		const param = takeParameters(code, options, 'warning');
		send(pathMaker(text, param.code, param.options));
	};
	/**
	 * send log to bot with type set to error
	 * @param {string} text message to log
	 * @param {number} code log code (optional)
	 * @param {object} options custom option for single-use (optional)
	 */
	this.error = (text, code=null, options=null) => {
		const param = takeParameters(code, options, 'error');
		send(pathMaker(text, param.code, param.options));
	};
	/**
	 * send log to bot with type set to debug
	 * @param {string} text message to log
	 * @param {number} code log code (optional)
	 * @param {object} options custom option for single-use (optional)
	 */
	this.debug = (text, code=null, options=null) => {
		const param = takeParameters(code, options, 'debug');
		send(pathMaker(text, param.code, param.options));
	};
	return this;
})();