"use strict"

const db = require('monk')('localhost/shopping');
const usersDB = db.get('users');
const todosDB = db.get('todos');
const bcrypt = require('bcrypt-nodejs');

const admin = {

	getUsers: function () {
	  usersDB.find({}, '-_id').then(function(docs) {
	    console.log(docs);
	  }).catch(function(error) {
	    console.log(error);
	  });
	},

	storeUser: function (obj) {
		bcrypt.hash(obj.password, null, null, function(err, hash) {
		    if (err) {
		    	return err;
		    } else {
		    	obj.password = hash;
		    	usersDB.insert(obj);
		    	console.log('inserted user: ', obj);
		    }
		});
	},

	storeTodos: function (todosArray) {
		todosArray.forEach((todo) => {
			todosDB.insert(todo);
			console.log('inserted todo: ', todo);
		});
	},
}

module.exports = admin;