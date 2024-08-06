import baseURL from '../config';

const createBlog = async (blog) => {
  const response = await fetch(
    `${baseURL}/api/blogs`, 
    {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: blog,
    });

    if (!response.ok) {
      try {
        let res = await response.json();
        throw res.message || JSON.stringify(res);
      } catch (err) {
        console.log(err);
        const error = new Error("Something went wrong!");
        throw error.message;
      }
    };

    const responseData = await response.json();
    return responseData;
};

const fetchBlogs = async () => {
  console.log("Trying to grab all Blogs")
  const response = await fetch(
    `${baseURL}/api/blogs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  if (!response.ok) {
    try {    
      let res = await response.json();
      throw res.message || console.log(res);
    } catch (err) {
      const error = new Error("Something went wrong")
      throw new Error(error);
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const fetchBlogById = async (id) => {
  const data = await fetch(
    `${baseURL}/api/blogs/` + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  if (!data.ok) {
    try {
      let blogsApiData = await data.json();
      throw blogsApiData.message;
    } catch (err) {
      const error = new Error("Something went wrong")
      throw new Error(error);
    }
  }
  
  const blogsApiData = await data.json();
  return blogsApiData;
}

const fetchBlogsByCategoryId = async ( categoryId ) => {
  console.log("Trying to grab filtered blogs by cats ID")

  console.log(`${baseURL}/api/blogs/category/` + categoryId);

  const data = await fetch(
    `${baseURL}/api/blogs/category/` + categoryId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!data.ok) {
      try {
        let res = await data.json();
        throw res.message || console.log(res);
      } catch(err) {
        const error = new Error("Something went wrong");
        throw new Error(error);
      }
    }
    const blogsApiData = await data.json();
    return blogsApiData;
};

const fetchBlogsByAuthorId = async ( authorId ) => {
  console.log("Trying to grab filtered blogs by author's ID")

  const data = await fetch(
    (`${baseURL}/api/blogs/author/` + authorId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  if (!data.ok) {
    try {
      let res = await data.json();
      throw res.message || console.log(res);
    } catch(err) {
      const error = new Error("Something went wrong");
      throw new Error(error);
    }
  }

  const responseData = await data.json();
  return responseData;
}


const updateBlog = async (blog) => {
  const response = await fetch(`${baseURL}/api/blogs/` + blog.get("id"), {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: blog,
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const deleteBlogById = async (id) => {
  const response = await fetch(`${baseURL}/api/blogs/` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const blogService = {
  createBlog,
  fetchBlogs, 
  fetchBlogById,
  fetchBlogsByCategoryId,
  fetchBlogsByAuthorId,
  updateBlog,
  deleteBlogById,
};
  
  export default blogService;