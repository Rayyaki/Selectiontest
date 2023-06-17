const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/", userController.register);
router.post("/login", userController.login);
router.post("/edituser, user");
router.get("/GA", userController.getAll);
router.get("/GBE", userController.getByEmail);
router.get("/GBN", userController.getByName);
router.get("/token", userController.getByToken, userController.getUserByToken);
router.patch("/verify", userController.verify);
router.patch(
  "/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.editUser
);
// avatar upload
router.post(
  "/image/v1/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.uploadAvatar
);

module.exports = router;
