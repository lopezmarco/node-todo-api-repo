const {mongoose} = require('../server/db/mongo_configuration');
const {Todo} = require('./../server/models/todo');

var id = '59e51872ba731a2bd06d7534';

Todo.find({
	_id: id
}).then((todos) => {
	console.log(todos);
}, (err) => {
	console.log(err);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log(todo);
}, (err) => {
	console.log(err);
});

Todo.findById(id).then((todo) => {
	console.log(todo);
}, (err) => {
	console.log(err);
});
;