import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";

import "../../App.css";
import "./index.css";

export default function BlogItem({
    index,
    blogPost,
    imageOrientation,
}) {
    
  console.log(index);
  
    const nav = useNavigate();

    if (imageOrientation === "top") {
        return (
          <>
          <div
            key={index}
            className="card-1 rounded"
            onClick={() => nav(`/blog/${blogPost.id}`)}
          >
            <img src={blogPost.image} className="card-img-top" alt="..." />
            <div className="card-text-bottom">
              <BlogItemText blogPost={blogPost} headerFontSize={"1.5rem"} />
            </div>
          </div>
            </>
        );
    } else {
        return (
          <div
            key={index}
            className="card-2"
            style={{borderRadius: "40px 0 40px 0"}}
            onClick={() => nav(`/blog/${blogPost.id}`)}
          >
            <img src={blogPost.image} className="card-img-left" alt="..." />
            <div className="card-text-right">
              <BlogItemText blogPost={blogPost} headerFontSize={"1.25rem"} />
            </div>
          </div>
        );
      }
  }
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
  setEditBlog: PropTypes.func, 
  setBlogDelete: PropTypes.func
}