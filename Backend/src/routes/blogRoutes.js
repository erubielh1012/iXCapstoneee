const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogs");

const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

// CREATE blogs
router.post("/", protect, upload.single("image"), (req, res) => {
    console.log("made it here first");
    blogController.createBlog(req,res);
    // res.status(200).json({ message: "Create new blog!" });
});

// READ blogs
router.get("/", (req, res) => {
    blogController.getBlogs(req,res);
    // res.status(200).json({ message: "Return all blogs!", data:[]})
});

// READ blog by id
router.get("/:id", (req, res) => {
    blogController.getBlogById(req,res);
});

// READ blogs by category id
router.get("/category/:id", (req, res) =>{
    blogController.getBlogsByCategoryId(req,res);
});

// READ blogs by author id
router.get("/author/:id", (req,res) => {
    blogController.getBlogsByAuthorId(req,res);
});

// UPDATE 
router.put("/:id", protect, upload.single("image"), (req,res) => {
    blogController.updateBlogById(req,res);
});

// DELETE
router.delete("/:id", protect, (req,res) => {
    blogController.deleteBlogById(req,res);
});

module.exports = router;