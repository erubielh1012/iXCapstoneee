import baseURL from '../config';

const register = async (userData) => {
  const response = await fetch(
    `${baseURL}/api/auth/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      try {
        let res = await response.json();
        throw res;
      } catch (err) {
        const error = new Error("Something went wrong");
        throw new Error(error);
      }
    }

    const responseData = await response.json();
    localStorage.setItem("user", JSON.stringify(responseData.data));
    return responseData;
};

const login = async (userData) => {
  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
}

const getAuthorInfo = async (id) => {
    const data = await fetch(
      `${baseURL}/api/auth/` + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
      if (!data.ok) {
        try {
          let authorData = await data.json();
          throw authorData.message;
        } catch (err) {
          const error = new Error("Something went wrong")
          throw new Error(error);
        }
      }
      
      const authorData = await data.json();
      return authorData;
};

const updateUser = async (user) => {
  const response = await fetch(
    `${baseURL}/api/auth/user/${user.get("id")}`,
    {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: user
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const authService = {
  getAuthorInfo,
  register,
  login,
  updateUser,
};

export default authService;