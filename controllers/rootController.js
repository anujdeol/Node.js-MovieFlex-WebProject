exports.getUserLogin = (req, res) => {
  console.log("login page called");
  res.render("login", { title: "LoginPage" });
};

exports.addUserLogin = (req, res) => {};
