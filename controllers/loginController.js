const userInfo = require("../models/loginResgisterSchema");

//login rendering 

exports.getUserLogin = (req, res) => {
  console.log("login page called");
  res.render("login", { title: "LoginPage" });
};

//login

exports.addUserLogin = (req, res) => {
  console.log("add user called");
  const username = req.body.username;
  const password = req.body.password;

  userInfo.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (user) {
      // User found, print logged in
      res.redirect("/api/movies");
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



exports.addUserRegister = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // Create a new user document and save it to the database
  userInfo.create({ username, password, email }, (err, newUser) => {
      console.log("create method called");
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // User registered successfully
    console.log("registered");
    res.status(201).json({ message: 'User registered successfully', user: newUser });
    res.redirect("/login");
  });
};

