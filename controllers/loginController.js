const userInfo = require("../models/loginResgisterSchema");

exports.getUserLogin = (req, res) => {
  console.log("login page called");
  res.render("login", { title: "LoginPage" });
};

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
