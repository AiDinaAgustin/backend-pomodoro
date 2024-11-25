const express = require("express");
const router = express.Router();
const validateRequest = require("../../middlewares/validation/validation");
const {
  handleSignUp,
  handleSignIn,
  handleCreateAdmin,
  handleGetUsers,
  signUpSchema
} = require("../../controllers/auth/controllerAuth");

router.post("/signup", validateRequest(signUpSchema), handleSignUp);

router.post("/signin", handleSignIn);

router.post("/create-admin", validateRequest(signUpSchema), handleCreateAdmin);

router.get("/users", handleGetUsers);

module.exports = router;
