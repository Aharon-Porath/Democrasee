var config = require('../../config');

module.exports = function(req, res){
        //if (signUpSuccessful(request, response)) {
    res.statusCode = 302;
    res.setHeader("Location", "/discussions/" + config.MAIN_DISCUSSION);
    res.end();
        //}
     //res.render('index.ejs');
}