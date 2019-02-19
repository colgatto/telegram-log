# telegram-log
Send log from your project directly on telegram, any backend or webHook needed!

## Install

```sh
npm install --save telegram-log
```

use [@botfather](https://t.me/botfather) to generate your bot and [@get_userId_bot](https://t.me/get_userId_bot) for know your user id.

### note
Remember thats users in the receiverList must have '/start'ed your bot to be able to receive messages!

## Example 

Basic usage:

```js
const tLog = require('telegram-log').init({
	token: 'TELEGRAM_BOT_TOKEN', // get your token with https://t.me/botfather
	receivers: 'TELEGRAM_USER_ID' // get your id with https://t.me/get_userId_bot
});

tLog.info('User login');
tLog.warning('Hardisk is almost full');
tLog.error('Internal Server Error',500);
tLog.debug('hello guy',123);
```
Using custom option:

```js
const tLog = require('telegram-log');

const options = {
	token: 'TELEGRAM_BOT_TOKEN',
	receivers: 'TELEGRAM_USER_ID',
	dateformat: 'd/mm/yy, H:MM:ss'
};

tLog.init(options);

//you can add custom options just for the single log
tLog.info('User login on https://facebook.com', { disableLinkPreview: true } );
tLog.warning('Hardisk is almost full', { mode: 'Markdown', silent: true } );
tLog.error('Internal Server Error', 500, { mode: 'HTML'} );
tLog.debug('hello guy', 123, { dateformat: 'dd/mm/yy' } );
```

### options


| parameter | type | description | |
| ------ | ------ | ------ | ------ |
| token | string | telegram bot token (get your bot with [@botfather](https://t.me/botfather)) | required |
| receivers | string/Array | users id that receive message, (get your id with with [@get_userId_bot](https://t.me/get_userId_bot)) | required |
| mode | string| how format message, `"text"`,`"HTML"`,`"Markdown"` are valid mode | optional (default `"text"`) |
| dateFormat   | string | string rappresent format of the date, use [dateformat](https://www.npmjs.com/package/dateformat) | optional (default `"d/mm/yyyy, HH:MM:ss"`) |
| silent       | bool | send message without notification | optional (default `false`) |
| disableLinkPreview  | bool | disable preLoad urls inside telegram chat | optional (default `false`) |