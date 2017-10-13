//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //same but with object destructuring
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/tododb', (err, db) => {
	if (err) {
		console.log('Unable to connect to specified mongodb server');
	}else{
		console.log('Connection succesful');	
	}

	db.collection('users').insertOne({
		name: 'jose',
		age: 23,
		location: 'mexico'
	}, (err, result) =>{
		if (err) {
			console.log('Error inserting document: ' + err);
		}else{
			console.log(result.ops[0]._id);
			console.log(result.ops[0]._id.getTimestamp());
		}
	});

	db.close();
});