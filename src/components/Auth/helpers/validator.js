const validateName = (name) => {
  return name.length && name.length < 16;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6 && password.length < 12;
};

export function validate(name, value, password) {
  switch (name) {
    case "firstName":
      return validateName(value);
    case "lastName":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "confirmPassword":
      return password === value;

    default:
      return false;
  }
}

export const validateEmptyFields = (data) =>
  Object.entries(data).filter((field) => field[1].length === 0);


