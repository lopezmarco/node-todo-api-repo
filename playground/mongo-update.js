const {MongoClient, ObjectID} = require('mongodb'); //same but with object destructuring

MongoClient.connect('mongodb://localhost:27017/tododb', (err, db) => {
	if (err) {
		console.log('Unable to connect to specified mongodb server');
	}else{
		console.log('Connection succesful');	
	}

	db.collection('users').findOneAndUpdate({
		_id: new ObjectID('59e4de5dbe0a6a83bbb9e4dc')
	}, {
		$set: {
			name: 'el nombre nuevo padre'
		},
		$inc: {
			age: 1
		}
	},{
		returnOriginal: false

	}).then((result) => {
		console.log(result);
	}, (err) => {
		console.log(err);
	});

	db.close();
});