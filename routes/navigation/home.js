var config = require('../../config');

module.exports = function(req, res){
        //if (signUpSuccessful(request, response)) {
    res.statusCode = 302;
    var redirectParams = (req._parsedUrl.search == null) ? '' : req._parsedUrl.search;
    res.setHeader("Location", "/discussions/" + config.MAIN_DISCUSSION + redirectParams);
    res.end();

        //}
     //res.render('index.ejs');
}