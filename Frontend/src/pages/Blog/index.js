import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import ShowBlog from "../../components/ShowBlog";

// Multer
import { fetchBlogById, resetSuccessAndError, reset } from "../../features/blogSlice";

export default function BlogPage() {
    const { blogId } = useParams();
    const dispatch = useDispatch();

    const {
      blog, 
      isError,
      isSuccess,
      isLoading,
      message
    } = useSelector((state) => state.blogs)

    // Debugging logs
    console.log("Blog ID:", blogId);
    console.log("State:", { blog, isError, isSuccess, isLoading, message });

    
    useEffect(() => {
        dispatch(fetchBlogById(blogId));
        return () => {
          dispatch(reset());
        }
      }, [dispatch, blogId]);
    
      if (isLoading) {
        return <Loading />;
      }
    
      return (
        <>
          <Navbar />
          <ShowBlog blog={blog} />
          <Footer />
          <SuccessToast
            show={isSuccess}
            message={message}
            onClose={() => { dispatch(resetSuccessAndError())}}
          />
          <ErrorToast
            show={isError}
            message={message}
            onClose={() => { dispatch(resetSuccessAndError())}}
          />
        </>
      );
    }