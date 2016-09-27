let db = require('monk')('localhost/shopping');
let usersDB = db.get('users');
let todosDB = db.get('todos');
const bcrypt = require('bcrypt-nodejs');

const admin = {
	putThem: function () {
		usersDB.insert([{ username: "Bob", password: "$2a$10$fmBoV6eHIqiw5ediE1N88OvVCKiT4k4y9IuCTvtjSfLXfFiVBYWxS" },
	         { username: "Rob", password: "DSA"}]);
		console.log('inserted users');
	}


	getThem: function () {
	  usersDB.find({}, '-_id').then(function(docs) {
	    console.log(docs);
	  }).catch(function(error) {
	    console.log(error);
	  });
	}

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
	};

	storeTodos: function (todosArray) {
		todosArray.forEach((todo) => {
			todosDB.insert(todo);
			console.log('inserted todo: ', todo);
		})
	};
}

module.exports = admin;