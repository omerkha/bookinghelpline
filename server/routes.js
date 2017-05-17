module.exports = function(app, utils) {

	utils.paypal.configure(utils.config.api);

	app.post('/api/get-paypal-token', function(req, res) {
		//var url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
		var url = 'https://api.paypal.com/v1/oauth2/token';

  	utils.rest.post(url, {
		  username: utils.config.api.client_id,
		  password: utils.config.api.client_secret,
		  data: {'grant_type': 'client_credentials'}
		}).on('complete', function(data, resp) {
				var obj = JSON.parse(resp.rawEncoded);
				res.json({
					token: obj.access_token
				});
		});
  })

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('*', function(req, res, next) {
        res.render('pages/index');
    });

}; // End Routes
