const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const postController = require("../controllers").postController;

//post
router.post(
  "/",
  fileUploader({ destinationFolder: "Imagepo" }).single("Imagepo"),
  postController.insertPost
);
router.patch(
  "/:id",
  fileUploader({ destinationFolder: "Imagepo" }).single("Imagepo"),
  postController.editPost
);
router.get("/getAll", postController.getPost);
router.get("/:id", postController.getPost1);
// router.get("/getpost", postController.getPost);
// router.patch("/:id", postController.editPost);
router.delete("/:id", postController.deletePost);

//like
router.post("/like", postController.like);
router.get("/like", postController.getLike);

//comment
router.post("/comment", postController.comment);
router.get("/comment", postController.getComment);
router.patch("/comment", postController.editComment);
router.delete("/comment", postController.deleteComment);

module.exports = router;
