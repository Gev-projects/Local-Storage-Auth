import { Link, useNavigate } from "react-router-dom";
import Button from "../../style-guide/button/button";
import Input from "../../style-guide/input/input";
import UserAvatar from "../../assets/user_avatar.svg";
import { useState } from "react";
import { validate } from "./helpers/validator";
import { ToastContainer, toast } from "react-toastify";
import { insertData } from "./helpers/storage";
import "react-toastify/dist/ReactToastify.css";
import "./style/auth.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validate(name, value, formData.password);
    if (!isValid) {
      setErrors({ ...errors, [name]: "invalid input" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emptyFields;

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "wrong confirmation" });
      return;
    }

    for (let input in errors) {
      if (!formData[input].length) {
        setErrors((prev) => ({ ...prev, [input]: "This field is required" }));
        emptyFields = true;
      }

      if (!!errors[input].length) {
        return;
      }
    }

    if (!emptyFields) {
      const { inserted, message } = insertData(formData);
      if (!inserted) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setTimeout(
        () => navigate("/signIn", { state: { fromSignUp: true } }),
        1000
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container sign-up">
        <h2 className="auth-title">Sign Up</h2>
        <img src={UserAvatar} alt="user avatar" className="user-avatar" />
        <form onSubmit={handleSubmit}>
          <div className="sign-up-form-container">
            <div className="form-col">
              <Input
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                errorMessage={errors.firstName}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                errorMessage={errors.email}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                errorMessage={errors.password}
              />
            </div>
            <div className="form-col">
              <Input
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                errorMessage={errors.lastName}
              />
              <Input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                errorMessage={errors.confirmPassword}
              />
            </div>
          </div>
          <Button className="sign-up-submit-btn" type="submit">
            Sign up
          </Button>
          <p className="form-account-text">
            Already have an account? <Link to="/signIn">Log in</Link>
          </p>
        </form>
        <ToastContainer hideProgressBar autoClose={2000} closeOnClick />
      </div>
    </div>
  );
}
