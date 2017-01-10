const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};