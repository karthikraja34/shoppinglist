var express = require('express');
var router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var todos = [
      {
        id: 8484848484,
        text: "Ice Cream",
        complete: false
      },
      {
        id: 6262627272,
        text: "Chocolate",
        complete: true
      },
    ];



// PASSPORT CONFIG
const users = {
  findOne: function(obj, callback) {
    let user = this.list.filter((item) => {
      return obj.username === item.username;
    });
    if (user.length > 0) {
      console.log('user.password: ', user[0].password);
      user.validPassword = function(passToCheck) {
        var hash = user[0].password;
        return bcrypt.compareSync(passToCheck, hash);
      };
      callback(null, user);
    } else {
      callback(null, false);
    };
  },
  list: [{ username: "Bob", password: "$2a$10$fmBoV6eHIqiw5ediE1N88OvVCKiT4k4y9IuCTvtjSfLXfFiVBYWxS" },
         { username: "Rob", password: "DSA"}]
};



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


router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));
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
      res.redirect('/login');
    }
});

/* GET for API */
router.get('/todos', function(req, res, next) {
    if (req.user) {
      console.log(todos);
      res.send(todos);
    } else {
      res.redirect('/login');
    }
});

router.get('/mobile', function(req, res, next) {
    const todosList = todos.map((todo, index) => {
      const have = "We have ";
      const need = "We need ";
      return {
        "number": index + 1,
        "item": todo.complete ? have + todo.text : need + todo.text,
      }
    });
    //console.log(todosList);
    res.render('mobile', {todosList});
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

router.post('/newTodo', function(req, res, next) {
    if (req.user) {
      todos.push(req.body);
      res.send(todos);
    } else {
      res.redirect('/login');
    }
    //console.log(req.body);
});

router.post('/deleteTodo', function(req, res, next) {
    if (req.user) {
      todos = todos.filter((todo) => {
        return todo.id !== req.body.id;
      });
      res.send(todos);
    } else {
      res.redirect('/login');
    }
});

router.post('/completeTodo', function(req, res, next) {
    //console.log('req.body: ', req.body);
    if (req.user) {
      todos.forEach((todo) => {
      if (todo.id === req.body.id) {
        todo.complete = !todo.complete;
      }
    });
    res.send(todos);
    } else {
      res.redirect('/login');
    }
});

router.get('/getUser', function(req, res, next) {
    //console.log('req.body: ', req.body);
    if (req.user) {
      res.send(req.user);
    } else {
      res.redirect('/login');
    }
});





module.exports = router;