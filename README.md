# telegram-log
Send the log from your project directly on telegram, no backend or webHook needed!

Can use two different template or you can easily create and use your own too.

## Install

```sh
npm install --save telegram-log
```

Use [@botfather](https://t.me/botfather) to generate your bot and [@get_userId_bot](https://t.me/get_userId_bot) to know your user id.

### Note
Remember that users in the receiverList must have `/start`ed your bot to be able to receive messages!

## Example 

### Basic usage

```js
const tLog = require('telegram-log').init({
	token: 'TELEGRAM_BOT_TOKEN',
	receivers: 'TELEGRAM_USER_ID'
});

tLog.info('User login');
tLog.warning('Hard disk is almost full');
tLog.error('Internal Server Error',500);
tLog.debug('hello guy',123);
```
### Custom options

```js
const tLog = require('telegram-log');

const options = {
	token: 'TELEGRAM_BOT_TOKEN',
	receivers: 'TELEGRAM_USER_ID',
	dateFormat: 'd/mm/yy, H:MM:ss',
};

tLog.init(options);

//you can add custom options just for the single log
tLog.info('User login on https://facebook.com', { disableLinkPreview: true, template: '{{emojiType}}{{text}}' } );
tLog.warning('Hardisk `Games` is almost full', { mode: 'Markdown', silent: true, template: 'minimal' } );
tLog.error('<b>Internal Server Error</b>', 500, { mode: 'HTML' } );
tLog.debug('hello guy', { template: false } );
```
#### Result

![example image](https://i.imgur.com/ebtz8Kp.png)


# Documentation

## Options

| Parameter           | Type         | Description                                                                                         | Required |
| ------              | ------       | ------                                                                                              | ------ |
| token               | string       | telegram bot token (get your bot's from [@botfather](https://t.me/botfather))                       | required |
| receivers           | string/Array | user ids that will receive message, (get yours from [@get_userId_bot](https://t.me/get_userId_bot)) | required |
| projectName         | string       | if you use same bot for many project or application                                                 | optional (default `""`) |
| mode                | string       | message format, can be `"text"`, `"html"`, `"markdown"`                                             | optional (default `"text"`) |
| dateFormat          | string       | represents the format of the date, uses [dateformat](https://www.npmjs.com/package/dateformat)      | optional (default `"d/mm/yyyy, HH:MM:ss"`) |
| silent              | bool         | send the message without a notification                                                             | optional (default `false`) |
| disableLinkPreview  | bool         | disable preLoading urls inside the telegram chat                                                    | optional (default `false`) |
| template            | string/bool  | can use to select template(`"default"` or `"minimal"`) or create your custom template, set it `false` to disable template | optional (default `"default"`) |

## Template

If you don't like `default` or `minimal` template you can create and use your own template using the options's parameter.

Use double curly braces to add variables to your template like `{{date}}` or `{{projectName}}`.

Accepted names for variables are :
- text
- code
- projectName
- date
- type (`info`, `warning`, `error`, `debug`)
- emojiType (:speech_balloon:, :warning:, :bangbang:, :beetle:)