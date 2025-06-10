import React from "react";

import PropTypes from "prop-types";

import "./index.css";

export default function Categories({ categories, removeCategory }) {
  const pathname = window.location.pathname.split("/");   

  if (!categories && !categories?.length) return null;

  if (pathname[1] === "Blogs" || pathname[1] === "blogs") categories = categories.slice(0,2);

  let categoryID = pathname[2] ? pathname[2] : null;
  if (categoryID) {
    categories = [...categories].sort((a,b) => {
      if (a.id === categoryID) return -1;
      if (b.id === categoryID) return 1;
      return 0;
    })
  }

  return (
    <div className="d-flex flex-wrap ">
      {categories.map((category, index) => {
        return (
          <p
            key={index}
            className="category-tag"
            style={{
              color: "#3C3C3C",
              backgroundColor: category.color + "30",
            }}
            onClick={() => removeCategory ? removeCategory(category) : null}
          >
            {category.title}
          </p>
        );
      })}
    </div>
  );
}

Categories.prototype = {
  categories: PropTypes.array.isRequired,
};