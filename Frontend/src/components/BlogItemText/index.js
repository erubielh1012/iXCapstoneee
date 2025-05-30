import React from "react";
import PropTypes from "prop-types";

import Categories from "../Categories";
import "./index.css";

export default function BlogItemText({ blogPost, headerFontSize }) {
    const isHomePage = window.location.pathname === "/Home";

    return (
        <div>
            <div style={{ display: "flex" }}>
                <p className="date-author-text">
                    {blogPost.author.firstName} {blogPost.author.lastName}
                </p>
                <div className="dot-divider"></div>
                <p className="date-author-text">
                    {blogPost.createdAt ? blogPost.createdAt.substring(0, 10) : "N/A"}
                </p>
            </div>
            <p
                style={{
                    fontSize: headerFontSize,
                    fontWeight: "bold",
                    textAlign: "left",
                }}
            >
                {blogPost.title}
            </p>
            <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
                {blogPost.description ? blogPost.description.substring(0, 100) : "N/A"}...
            </p>
            { !isHomePage && (<Categories categories={blogPost.categories} />) }
            {/* i want to be able to show categories on a blog post only when it 
            is not in the home page */}
        </div>
    );
}
BlogItemText.propTypes = {
    blogPost: PropTypes.object.isRequired,
    headerFontSize: PropTypes.string,
}