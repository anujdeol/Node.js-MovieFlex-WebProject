const userInfo = require("../models/loginResgisterSchema");

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
