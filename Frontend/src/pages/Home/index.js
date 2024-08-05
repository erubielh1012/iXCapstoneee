import React, { useEffect } from "react";

import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import BlogGrid from "../../components/BlogGrid";
import Footer from "../../components/Footer";
import SubHeading from "../../components/SubHeading";
import CategoryList from "../../components/CategoryList";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlogs, resetSuccessAndError as resetBlogSucAndErr } from "../../features/blogSlice";
import { fetchCategories, reset as resetCategories, resetSuccessAndError as resetCatSucAndErr } from "../../features/categoriesSlice";

export default function Home() {

  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogsSuccess,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);
  const {
    categories, 
    isError: isCategoriesError, 
    isSuccess: isCategoriesSuccess,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchCategories());

    return () => {
      dispatch(resetBlogs());
      dispatch(resetCategories());
    };
  }, [dispatch]);


  return (
    <>
      <Navbar />
      <Heading />
       <div className="container">
        <SubHeading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
      </div>
      <div className="bg-grey corner-clip-top-bottom py-15vmin mt-5">
        <div className="container">
          <div className="py-5">
            <SubHeading subHeading={"Categories"} />
            <CategoryList isHome={true} categories={categories.slice(0,3)}></CategoryList>
          </div>
        </div>
      </div>
      <Footer />
      <SuccessToast 
        show={isBlogsSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
        onClose={ () => {
          dispatch(resetBlogSucAndErr());
          dispatch(resetCatSucAndErr());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={ () => {
          dispatch(resetBlogSucAndErr());
          dispatch(resetCatSucAndErr());
        }}
      />
    </>
  );
}