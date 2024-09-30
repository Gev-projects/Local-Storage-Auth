const { stringify, parse } = JSON;
const getItem = localStorage.getItem.bind(localStorage);
const setItem = localStorage.setItem.bind(localStorage);
const removeItem = localStorage.removeItem.bind(localStorage);

export const initUsersData = () => {
  const usersData = getItem("users");
  if (!usersData) {
    setItem("users", stringify([]));
  }
};

export const insertData = (data) => {
  const users = parse(getItem("users"));
  const userExists = users.find((user) => user.email === data.email);

  if (userExists) {
    return {
      inserted: false,
      message: `user with email ${data.email} already exists`,
    };
  }
  const dataToInsert = stringify([...users, data]);
  setItem("users", dataToInsert);

  return { inserted: true, message: "user registered successfully" };
};

const handleRememberMe = (users, email, rememberMe) => {
  const newData = users.map((user) =>
    user.email === email
      ? { ...user, rememberMe }
      : { ...user, rememberMe: false }
  );

  setItem("users", stringify(newData));
};

export const checkData = (data) => {
  const users = parse(getItem("users"));
  const currentUser = users.find((user) => user.email === data.email);

  if (!currentUser) {
    return {
      isValidUser: false,
      message: `user with ${data.email} email doesn't exist`,
    };
  }
  if (currentUser.password !== data.password) {
    return { isValidUser: false, message: "password is incorrect" };
  }

  setItem("currentUser", stringify(currentUser));
  handleRememberMe(users, data.email, data.remember);

  return { isValidUser: true, message: "" };
};

export const getCurrentUser = () => {
  return parse(getItem("currentUser"));
};

export const checkRememberedUser = () => {
  const users = parse(getItem("users"));

  return users.find((user) => user.rememberMe);
};

export const logOut = () => removeItem("currentUser");
