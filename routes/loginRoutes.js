const express = require("express");
const rootController = require("./../controllers/loginController");
const router = express.Router();


router.route("/").get((req, res) => {
  res.redirect("/login");
});

router
  .route("/login")
  .get(rootController.getUserLogin)
  .post(rootController.addUserLogin);

  router
  .route("/register")
  .get(rootController.getUserRegister)
  .post(rootController.addUserRegister);


module.exports = router;
