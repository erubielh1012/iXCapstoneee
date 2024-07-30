const Blog = require("../models/Blog");

const { uploadToFirebaseStorage } = require("../service/google-cloud");

const createBlog = async (req, res) => {
    console.log("req.body");
    try {
        let imageURL = "";
        if (req?.file?.path) {
            imageURL = await uploadToFirebaseStorage(
                req?.file?.path,
                req?.file?.path
            );
        }

        console.log(req)

        console.log("chkpt 0");
        const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
        console.log("chkpt 1");
        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: imageURL,
            content: JSON.parse(req.body.content),
            author: req.body.author,
            categories: categoryIds,
        });

        console.log("chkpt 2");

        const newBlog = await blog.save();

        const blogRes = await Blog.findById(newBlog.id)
        .populate({ path: "categories" })
        .populate({ path: "author" });

        res.status(201).json({ 
            message: "Created new blog!", 
            data: blogRes });
    } catch (error) { 
        res.status(500).json({
            message: error.message,
            data: {},
        });
     }
  };
  
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate({ path: "author" }).populate({ path: "categories" });
    
        res.status(200).json({ 
            message: "Return all blogs!", 
            data: blogs });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        console.log(req.params.id);
        const blog = await Blog.findById(req.params.id).populate({
            path: "categories",
        }).populate({ path: "author" });
        
        res.status(200).json({ 
            message: "Return blog by the BLOG ID!", 
            data: blog });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

// not sure how this one works
const getBlogsByCategoryId = async (req, res) => {
    try {
        // console.log("We want to get the blogs with catId of", req.params.id);
        let filter = {};
        if (req.params.id != "null" && req.params.id != "undefined"){
            filter = {categories: req.params.id};
        }

        // console.log("The filter is created:", filter);

        const blogs = await Blog.find(filter).populate({ path: "categories" }).populate({ path: "author" });

        // console.log("Filter applied to blogs:", blogs);

        res.status(200).json({ 
            message: "Return blog by the category ID!",
            data: blogs});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const getBlogsByAuthorId = async (req,res) => {
    try {
        // console.log("Retrieving all the blogs by AUTHOR ID", req.params.id);
        let filter = {};
        if (req.params.id != "null" && req.params.id != "undefined"){
            filter = {author: req.params.id};
        }

        // console.log("The filter is created:", filter);

        const blogs = await Blog.find(filter).populate({ path: "categories" }).populate({ path: "author" });
        
        // console.log("Filter applied to blogs:", blogs);

        res.status(200).json({ 
            message: "Return blogs by the Author ID!",
            data: blogs});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
}

const updateBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)
        .populate({
            path: "categories",
        }).populate({ path: "author" });
    
        if (blog) {
            const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
            (blog.image = req?.file?.path
                ? req?.protocol + "://" + req?.headers?.host + "/" + req.file.path
                : blog.image);
            blog.title = req?.body?.title || blog.title;
            blog.description = req?.body?.description || blog.description;
            blog.categories = categoryIds ? categoryIds : blog.categories;
            blog.author = req?.body?.author || blog.author;
            blog.content = req.body.content ? JSON.parse(req.body.content) : blog.content;
            const updatedBlog = await blog.save();
            const blogRes = await updatedBlog.populate({
                path: "categories",
            });
            res.status(200).json({ 
                message: "Updated blog by ID!", 
                data: blogRes });
        } else {
            res.status(404).json({ message: "Blog not found!", data: [] });
        };
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: []
        });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
    
        if (blog) {
            return res.status(200).json({ message: "Blog deleted!", id: req.params.id})
        } else {
            return res.status(404).json({ message: `Blog not found! ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getBlogs,
    // getBlog,
    getBlogsByCategoryId,
    getBlogsByAuthorId,
    getBlogById,
    createBlog,
    updateBlogById,
    deleteBlogById,
  };
  

//   {
//     "image": "https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-blue-and-purple-neon-star-3d-art-background-with-a-cool-image_3705286.jpg",
//     "title": "Booty calls is a thing",
//     "description": "Why do booty calls occur?",
//     "categories": [
//         {
//             "color": "#026AA2",
//             "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//             "id": "66587f6f3c15f9f00128865b",
//             "title": "Web Development"
//         }
//     ],
//     "author": [
//         {
//             "firstName": "Byron",
//             "lastName": "de Villiers",
//             "image": "some-image",
//             "bio": "Did great stuff trust."
//         }
//     ],
//     "content": "hey we did it"
// }