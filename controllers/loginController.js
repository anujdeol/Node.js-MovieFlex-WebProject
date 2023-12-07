const userInfo = require("../models/loginResgisterSchema");
const saltRounds = 10;
const bcrypt = require('bcrypt');

//login rendering 

exports.getUserLogin = (req, res) => {
  console.log("login page called");
  res.render("login", { title: "LoginPage" });
};

// login controller
exports.addUserLogin = (req, res) => {
  console.log("add user called");
  const username = req.body.username;
  const password = req.body.password;

  userInfo.findOne({ username }, (err, user1) => {
    if (err) {
      console.error(err);
      console.log("error in find");
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (user1) {
      bcrypt.compare(password, user1.password, (compareErr, result) => {
        if (compareErr) {
          console.error(compareErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result) {
          console.log("Password matches through bcrypt");
          
          req.session.user = {
            username: user1.username,
            password: user1.password
          };

        
          res.redirect("/api/movies");
        } else {
          // Passwords do not match
          console.log("Password does not match");
          res.redirect("/login");
        }
      });
    } else {
      // User not found
      res.redirect("/register");
    }
  });
};

exports.getUserRegister = (req, res) => {
  console.log("reguister route called");
  res.render("register", { title: "LoginPage" });
};


//register
exports.addUserRegister = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // Hash the password before saving it to the database
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Create a new user document with the hashed password
    userInfo.create({ username, password: hashedPassword, email }, (err, newUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // User registered successfully
      console.log('User registered successfully');
      res.redirect('/login');
    });
  });
};

