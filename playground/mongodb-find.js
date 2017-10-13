//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //same but with object destructuring


MongoClient.connect('mongodb://localhost:27017/tododb', (err, db) => {
	if (err) {
		console.log('Unable to connect to specified mongodb server');
	}else{
		console.log('Connection succesful');	
	}

	db.collection('users').find().count().then((count) => {
		console.log('count: ' + count);
	}, (err) => { 
		console.log("unable to fetch collection")
	});

	db.close();
});