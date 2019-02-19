# telegram-log
Send the log from your project directly on telegram, no backend or webHook needed!

## Install

```sh
npm install --save telegram-log
```

Use [@botfather](https://t.me/botfather) to generate your bot and [@get_userId_bot](https://t.me/get_userId_bot) to know your user id.

### Note
Remember that users in the receiverList must have `/start`ed your bot to be able to receive messages!

## Example 

Basic usage:

```js
const tLog = require('telegram-log').init({
	token: 'TELEGRAM_BOT_TOKEN', // get your token from https://t.me/botfather
	receivers: 'TELEGRAM_USER_ID' // get your id from https://t.me/get_userId_bot
});

tLog.info('User login');
tLog.warning('Hard disk is almost full');
tLog.error('Internal Server Error',500);
tLog.debug('hello guy',123);
```
Using custom options:

```js
const tLog = require('telegram-log');

const options = {
	token: 'TELEGRAM_BOT_TOKEN',
	receivers: 'TELEGRAM_USER_ID',
	dateFormat: 'd/mm/yy, H:MM:ss',
};

tLog.init(options);

//you can add custom options just for the single log
tLog.info('User login on https://facebook.com', { disableLinkPreview: true } );
tLog.warning('Hard disk is almost full', { mode: 'Markdown', silent:true });
tLog.error('Internal Server Error', 500, { mode: 'HTML' } );
tLog.debug('hello guy', 123, { dateFormat: 'dd/mm/yy' } );
```

### Options


| Parameter | Type | Description | Required |
| ------ | ------ | ------ | ------ |
| token | string | telegram bot token (get your bot's from [@botfather](https://t.me/botfather)) | required |
| receivers | string/Array | user ids that will receive message, (get yours from [@get_userId_bot](https://t.me/get_userId_bot)) | required |
| mode | string| message format, `"text"`,`"HTML"` are valid modes | optional (default `"text"`) |
| dateFormat   | string | represents the format of the date, uses [dateformat](https://www.npmjs.com/package/dateformat) | optional (default `"d/mm/yyyy, HH:MM:ss"`) |
| silent       | bool | send the message without a notification | optional (default `false`) |
| disableLinkPreview  | bool | disable preLoading urls inside the telegram chat | optional (default `false`) |