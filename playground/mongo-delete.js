//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //same but with object destructuring


MongoClient.connect('mongodb://localhost:27017/tododb', (err, db) => {
	if (err) {
		console.log('Unable to connect to specified mongodb server');
	}else{
		console.log('Connection succesful');	
	}

	/*db.collection('users').deleteMany({name: 'marco'}).then((result) => {
		console.log(result);
	},(err) => {
		console.log(err);
	});*/

	db.collection('users').deleteOne({_id: new ObjectID("59e4de55be0a6a83bbb9e4da")}).then((result) =>{
		console.log(result);
	},(err) => {
		console.log(err);
	});

	/*db.collection('users').findOneAndDelete({name: 'jose'}).then((result) => {
		console.log(result);
	}, (err) => {
			console.log(err);
	});*/

	db.close();
});