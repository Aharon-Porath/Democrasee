
module.exports = function(router){
   router.all('', require('./profile'));
   router.all(/\/([0-9a-f]+)\/?$/,require('./profile'));

};



