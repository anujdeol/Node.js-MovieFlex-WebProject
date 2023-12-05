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

module.exports = router;
