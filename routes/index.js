const express = require('express');
const router = express.Router();
const db = require('monk')('localhost/shopping');
const usersDB = db.get('users');
const todosDB = db.get('todos');

const passport = require('passport');
  , LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt-nodejs');

// Memory stores

let todos = {

  update: function (callback) {
    todosDB.find({}, '-_id').then(function(docs) {
      todos.list = docs;
      callback(todos.list);
    }).catch(function(error) {
      console.log(error);
    });
  },

  list: []

};

todos.update((data) => {
  //console.log(data);
});


let users = {

  findOne: function(obj, callback) {
    let user = this.list.filter((item) => {
      return obj.username === item.username;
    });
    if (user.length > 0) {
      console.log('user.password: ', user[0].password);
      user.validPassword = function(passToCheck) {
        const hash = user[0].password;
        return bcrypt.compareSync(passToCheck, hash);
      };
      callback(null, user);
    } else {
      callback(null, false);
    };
  },

  update: function (callback) {
    usersDB.find({}, '-_id').then(function(docs) {
      users.list = docs;
      console.log('users.list is ', users.list);
      callback(users.list);
    }).catch(function(error) {
      console.log(error);
    });
  },

  list: []

};

users.update((data) => {
  //console.log(data);
});



// PASSPORT CONFIG
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('passcheck started, user: ', username, ' pass: ', password);
    users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('!user');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('!user.validPassword');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('successful');
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// ROUTES
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/invalid' }));
  // function(req, res) {
  //   // If this function gets called, authentication was successful.
  //   // `req.user` contains the authenticated user.
  //   res.redirect('/users/' + req.user.username);
  //});

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
      res.render('index');
    } else {
      res.redirect('/invalid');
    }
});

/* GET for API */
router.get('/todos', function(req, res, next) {
    if (req.user) {
      console.log(todos.list);
      res.send(todos.list);
    } else {
      res.redirect('/invalid');
    }
});

// Created this to get a list for my iphone which doesnt like react - TODO get react native working
router.get('/mobile', function(req, res, next) {
    const mobileList = todos.list.map((todo, index) => {
      const have = "We have ";
      const need = "We need ";
      return {
        "number": index + 1,
        "item": todo.complete ? have + todo.text : need + todo.text,
      }
    });
    //console.log(mobileList);
    res.render('mobile', {mobileList});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

router.get('/invalid', function(req, res){
  res.render('login', { msg: "Error: Not authenticated"});
});

router.post('/newTodo', function(req, res, next) {
    if (req.user) {
      todosDB.insert(req.body);
      todos.update((data) => {
        res.send(data);
      });
    } else {
      res.redirect('/invalid');
    }
});

router.post('/deleteTodo', function(req, res, next) {
    if (req.user) {
      todosDB.remove({ id: req.body.id });
      todos.update((data) => {
        res.send(data);
      });
    } else {
      res.redirect('/invalid');
    }
});

router.post('/completeTodo', function(req, res, next) {
    if (req.user) {
      todos.list.forEach((todo) => {
        if (todo.id === req.body.id) {
          todo.complete = !todo.complete;
          todosDB.findOneAndUpdate({ id: todo.id }, { id: todo.id, text: todo.text, complete: todo.complete })
          .then((updatedDoc) => {
            todos.update((data) => {
              res.send(data);
            });
          }).catch(function(error) {
            console.log(error);
          });
        }
      });
    } else {
      res.redirect('/invalid');
    }
});

router.get('/getUser', function(req, res, next) {
    if (req.user) {
      res.send(req.user);
    } else {
      res.redirect('/invalid');
    }
});



// db.close();


module.exports = router;