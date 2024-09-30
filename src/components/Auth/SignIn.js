import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../style-guide/button/button";
import Input from "../../style-guide/input/input";
import { useState } from "react";
import { validateEmptyFields } from "./helpers/validator";
import { checkData, checkRememberedUser } from "./helpers/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const rememberedUser = checkRememberedUser();
  const isRemembered =
    (!location.state?.fromSignUp && rememberedUser?.rememberMe) || false;

  const defaultEmail =
    (!location.state?.fromSignUp && rememberedUser?.email) || "";

  const [formData, setFormData] = useState({
    email: defaultEmail,
    password: "",
    remember: isRemembered,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChecked = (e) =>
    setFormData({ ...formData, remember: e.target.checked });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ email: "", password: "" });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = validateEmptyFields(formData);

    if (emptyFields.length) {
      emptyFields.forEach((item) =>
        setErrors((prev) => ({ ...prev, [item[0]]: "This field is required" }))
      );
      return;
    }

    const { isValidUser, message } = checkData(formData);
    if (!isValidUser) {
      toast.error(message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-container sign-in">
        <h2 className="auth-title">Sign In</h2>
        <form className="sign-in-form-container" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            errorMessage={errors.email}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            errorMessage={errors.password}
          />
          <label className="remember-checkbox">
            <Input
              type="checkbox"
              name="remember"
              onChange={handleChecked}
              checked={formData.remember}
            />
            Remember me
          </label>

          <Button type="submit" className="sign-in-submit-btn">
            Sign In
          </Button>
        </form>
        <p className="form-account-text mt-0">
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <ToastContainer hideProgressBar autoClose={2000} closeOnClick />
    </div>
  );
}
