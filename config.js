var config = {};

// facebook app params
config.fb_auth_params = {
    appId : process.env['FACEBOOK_APPID'] || '593100544072637',
    appSecret: process.env['FACEBOOK_SECRET'] || '1e383954a0e5ce39be394d1e4e967bc7',
    appName: process.env['FACEBOOK_APPNAME'] || 'idemos_dev',
    callback: config.ROOT_PATH + '/account/facebooklogin',
    scope: 'email,publish_actions',
    failedUri: '/noauth'
};

config.fb_general_params = {
    fb_title: 'עורו',
    fb_description:  "עורו היא תנועה חברתית לייצוג הרוב בישראל. אנו מאמינים שבעידן שבו אנו חיים, כולנו מסוגלים וזכאים להשתתף בקבלת ההחלטות. לכן, עורו מנהלת פלטפורמה לדיון ציבורי, יסודי ואפקטיבי שיוביל שינוי בסדר היום. אצלנו, האג'נדה מוכתבת מלמטה.",
    fb_image: 'http://site.e-dologic.co.il/philip_morris/Xls_script/uru_mailing/logo.jpg'
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




config.DB_URL = process.env['MONGOLAB_URI'] || 'mongodb://localhost/idemos';
config.ROOT_PATH = process.env.ROOT_PATH || 'http://idemos.herokuapp.com';

module.exports = config;