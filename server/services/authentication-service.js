const passport = require('passport'),
	  mongoose = require('mongoose'),
	  User = mongoose.model('User');

const sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function (req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	
	var user = new User();
	user.local.name = req.body.name;
	user.local.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function (err, response) {
		var token;

		if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			token = user.generateJwt();
			req.session._id = response._doc._id;
			req.session.token = token;
			sendJSONresponse(res, 200, {
				"token": token
			});
		}
	});
};

module.exports.login = function (req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	passport.authenticate('local', function (err, user, info) {
		var token;
		if (err) {
			sendJSONresponse(res, 404, err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			req.session._id = user._doc._id;
			req.session.token = token;
			sendJSONresponse(res, 200, {
				"token": token
			});
		} else {
			sendJSONresponse(res, 401, info);
		}
	})(req, res);
};
module.exports.updateProfile = function(req, res) {
	User.find({_id: req.session._id}, function(err, result) {
		if(err) {
			sendJSONresponse(res, 404, err);
			return;
		}
		if(result) {
			console.log("++server");
			console.log(" server result = " + result.profile);
			res.send({profile: result});
		}
	})
};

module.exports.getUserProfile = function(req, res) {
	// let user = {}
	User.find({_id: req.session._id}, function(err, result) {
		if(err) {
			sendJSONresponse(res, 404, err);
			return;
		}
		if(result) {
			// console.log("result= "+result);
			// console.log("result= "+result.profile);
			// let profile = result._doc.profile
			res.send({profile: result});
			// user = result
		}
	})
	// res.send({profile: user.profile})
};