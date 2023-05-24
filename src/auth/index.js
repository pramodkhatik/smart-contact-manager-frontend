// check authentication
export const isLogged = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  }
  return true;
};

// do login
export const doLogIn = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// do logout
export const doLogOut = (next) => {
  localStorage.removeItem("data");
  next();
};

// get current user
export const getCurrentUser = () => {
  if (isLogged) {
    return JSON.parse(localStorage.getItem("data")).user;
  }
  return false;
};
