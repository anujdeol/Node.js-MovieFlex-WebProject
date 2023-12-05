const express = require("express");
const rootController = require("./../controllers/rootController");
const router = express.Router();
router.route("/").get((req, res) => {
  res.redirect("/home");
});

router
  .route("/home")
  .get(rootController.getUserLogin)
  .post(rootController.addUserLogin);

module.exports = router;
