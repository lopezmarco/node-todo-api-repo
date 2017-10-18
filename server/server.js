var {mongoose} = require('./db/mongo_configuration');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
	var todo = new Todo({
		text: request.body.text
	});

	todo.save().then((result) => {
		response.send(result);
	}, (err) => {
		response.status(400).send(err);
	});
});

app.get('/todos',(request, response) => {
	Todo.find().then((todos) => {
		response.send({todos});
	}, (err) => {
		response.send(err);
	});
});

app.get('/todos/:id', (request, response) => {
	var id = request.params.id;
	if (!ObjectID.isValid(id)) {
		response.status(400).send();
	}else{
		Todo.findById(id).then((todo)=>{
			if (!todo) {
				response.status(400).send('Todo not found');
			}else{
				response.send({todo});
			}
		}).catch((err) => {
			response.status(400).send(err);
		});
	}

	
});


app.listen(3000, () => {
	console.log("running server on three thousand");
});