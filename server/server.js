var {mongoose} = require('./db/mongo_configuration');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');

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

app.delete('/todos/:id', (request, response) => {
	Todo.findByIdAndRemove(request.params.id).then((result) => {
		response.send(result);
	}, (err) => {
		response.send(err);
	});
});

app.patch('/todos/:id', (request, response) => {
	var id = request.params.id;
	var body = lodash.pick(request.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		response.status(404).send("");
	}else{
		if (lodash.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		}else{
			body.completed = false;
			body.completedAt = null; //null removes value of atribute indatabase
		}
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			response.status(404).send();
		}else{
			response.send({todo});
		}
	}).catch((err) => {
		response.status(400).send();
	});
});

app.post('/users', (req, res) =>{
	var body = lodash.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then((user) => {
		console.log('user in first save() ' + user);
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((err) => {
		res.status(400).send(err);
	})
});


app.get('/users/me',authenticate, (req, res) => {
	var token = req.header('x-auth');

	res.send(req.user);
});

app.post('/users/login', (req, res) => {
	var body = lodash.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user)=>{
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((err) => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log("running server on three thousand");
});