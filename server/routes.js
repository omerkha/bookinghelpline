module.exports = function(app) {

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('*', function(req, res, next) {
        res.render('pages/index');
    });

}; // End Routes
