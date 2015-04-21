var config = {};

// facebook app params
config.fb_auth_params = {
    appId : process.env['FACEBOOK_APPID'] || '352750874913187',
    appSecret: process.env['FACEBOOK_SECRET'] || '8f25ee5ffe420955656613f6ef8da91b',
    appName: process.env['FACEBOOK_APPNAME'] || 'DemocraSee',
    callback: config.ROOT_PATH + '/account/facebooklogin',
    scope: 'email,publish_actions',
    failedUri: '/noauth'
};

config.fb_general_params = {
    fb_title: '',
    fb_description:  "",
    fb_image: ''
}

// amazon s3 credentials
config.s3_creds = {
    key: 'AKIAI3KFGZ2QM7A6L3ZA',
    secret: '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',
    bucket: 'idemos'
};

config.sendgrid_user = 'shailinnovate';
config.sendgrid_key = 'Zaq1Xsw2';
config.system_email = 'admin@dev6.linnovate.net';


config.MAIN_DISCUSSION = process.env['MAIN_DISCUSSION'] || '549ab39ada8a349714000026';

config.DB_URL = process.env['MONGOLAB_URI'] || 'mongodb://localhost/idemos';
config.ROOT_PATH = process.env.ROOT_PATH || 'http://idemos.herokuapp.com';
config.INDEX_PATH = process.env.INDEX_PATH || 'http://localhost:1180/tlv/';

module.exports = config;