module.exports = function(req, res){
        //if (signUpSuccessful(request, response)) {
    res.statusCode = 302;
    res.setHeader("Location", "/discussions/549ab39ada8a349714000026");
    res.end();
        //}
     //res.render('index.ejs');
}