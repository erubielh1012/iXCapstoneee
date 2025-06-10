import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import DeleteBlogModal from "../../components/DeleteBlogModal";

// State
import {
  setAddBlog,
  fetchBlogsByCategoryId,
  resetSuccessAndError as resetBlog,
  fetchBlogs,
} from "../../features/blogSlice";
import {
  fetchCategories,
  resetSuccessAndError as resetCategory,
} from "../../features/categoriesSlice";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  // const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogSuccess,
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);
  const {
    categories,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
    isLoading: isLoadingCategories,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    if (categoryId){
      dispatch(fetchBlogsByCategoryId(categoryId));
    } else {
      dispatch(fetchBlogs());
    }
    return () => {
      dispatch(resetBlog());
      dispatch(resetCategory());
    };
  }, [dispatch, categoryId]);

  const onBlogAdd = () => {
    dispatch(
      setAddBlog({
        image: "https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-blue-and-purple-neon-star-3d-art-background-with-a-cool-image_3705286.jpg",
        title: "",
        description: "",
        categories: [],
        author: user.id,
        content: [
          {
            sectionHeader: "Introduction",
            sectionText:
              "I'm so excited to share my first blog post with the world. I've been working on this for a while and I'm happy to finally share it with you.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ],
      })
    );
  };
/*
  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setBlogs((prev) => {
        return [...prev, newBlog.data];
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setAddBlog(null);
  };

*/
  const CategoriesList = () => {
    if (!categories && !categories?.length) {
      return null;
    }

    return categories.map((category, index) => {
      return categoryId === category.id.toString() ? (
        <Link
          // className="link"
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          // className="link"
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  
const AddBlog = () => {
  if(!user?.token) return null;
  return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* <p className="page-subtitle">Blog Posts</p> */}
      {user && (
        <button
        style={{ margin: "16px", fontWeight: "bold", }}
        type="button"
        className="btn btn-outline-dark h-75"
        onClick={onBlogAdd}
        >
          Add Blog Post
        </button>
      )}
    </div>
  );
}

if (isLoadingBlogs || isLoadingCategories) {
  return <Loading />;
}

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
          <AddBlog />
        </div>
        <BlogList
          blogPosts={blogs}
        />
        <AddEditBlogModal/>
        <DeleteBlogModal/>
      </div>

      <Footer />
      {/* <SuccessToast
        show={isBlogSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          // setIsSuccess(false);
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />

      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      /> */}
    </>
  );
}