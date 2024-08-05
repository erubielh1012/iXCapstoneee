import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./index.css";

import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import EditProfileModal from "../../components/EditProfileModal";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import { fetchAuthor, fetchBlogsByAuthorId, resetSuccessAndError, reset } from '../../features/authorSlice';
import { setAddBlog } from "../../features/blogSlice";
import { updateUser } from "../../features/authSlice";

export default function ProfilePage() {
    const user = JSON.parse(localStorage.getItem("user"));

    const { authorId } = useParams();
    const [ editProfile, setEditProfile ] = useState();

    const dispatch = useDispatch();
    const {
      author, 
      authorBlogs,
      isError,
      isSuccess,
      isLoading,
      message,
    } = useSelector ((state) => state.author);
  
    useEffect(() => {
      dispatch(fetchAuthor(authorId));
      dispatch(fetchBlogsByAuthorId(authorId));
      return () => {dispatch(reset())}
    }, [dispatch, authorId]);

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
    const AddBlog = () => {
      if((user?.id !== authorId)) return null;
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
              Add Post
            </button>
          )}
        </div>
      );
    }

    const updateProfile = async (profile) => {
      // console.log(JSON.stringify(profile));
      dispatch(updateUser({profile}))
    }

    const EditButton = () => {
      return (
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "60px",
            border: "none",
            zIndex: 1,
          }}
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setEditProfile(author)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
      )
    }

    const AuthorDetails = () => {
      if (!author || author === "null" || author === "undefined") {
        return null;
      }
      return (
        <div className="mt-5">
          <div className="position-sticky my-4" style={{ top: "2rem" }}>
            <div className="pt-4 pe-4 mb-3">
              <h4 className="fst-italic">Let's Get to Know Me</h4>
              <h1>{author.firstName} {author.lastName}</h1>
              <div>
                <img className="my-3 rounded" style={{ boxShadow: "0 0 15px 0 grey"}} width="100%" height="100%" src={author.image} alt="Author" />
                {user && user.token && user.id === author.id ? <EditButton /> : null }
              </div>
              <p>{author.bio}</p>
            </div>
          </div>
        </div>
      );
    }

    if (isLoading) {
      <Loading />
    }
  
    return (
      <>
        <Navbar />
        <div className="container d-flex">
          <div className="col-md-4" >
            <AuthorDetails author={author} />
          </div>

          <div className="col-md-8 position-relative pt-5 mt-5 ms-5" >
            <div className="d-flex">
              <p className="page-subtitle">Author Blog Posts</p>
              {/* <div style={{ position: "absolute", top: "0", right: "0" }}> */}
                <AddBlog />
              {/* </div> */}
            </div>
            <BlogList blogPosts={authorBlogs} />
          </div>
        </div>
          <Footer />
        <EditProfileModal 
          editProfile={editProfile}
          updateProfile={updateProfile}
          info={author}
          onClose={() => {
            setEditProfile(false);
          }}
        />
        <AddEditBlogModal />
        <DeleteBlogModal />
        <SuccessToast
          show={isSuccess}
          message={message}
          onClose={() => {dispatch(resetSuccessAndError())} }
        />
        <ErrorToast
          show={isError}
          message={message}
          onClose={() => {dispatch(resetSuccessAndError())} }
        />
      </>
    );
  }