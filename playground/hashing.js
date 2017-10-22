const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = "silmal";
bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash);
	});
});

/*var data = {
	id: 15
};

var token = jwt.sign(data, 'salty');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(message);
console.log(hash);

var data = {
	id: 4
};

var token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'added salt').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'added salt').toString();

if (resultHash === token.hash) {
	console.log('data unchanged');
}else{
	console.log('data changed');
};*/