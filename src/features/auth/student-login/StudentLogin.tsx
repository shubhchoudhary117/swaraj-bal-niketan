import React, { useState } from "react";
import "./StudentLogin.scss";
import bannerImg from "./images/login-banner.png";

import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [form, setForm] = useState({
    studentId: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/study-v1")
      console.log("Login Data:", form);
    }
  };

  return (
    <div className="student-login">
      <div className="student-login__container">

        {/* Banner */}
        <div className="student-login__banner">
          <img src={bannerImg} alt="school" />
          <div className="student-login__overlay" />

          <div className="student-login__banner-content">
            <div className="student-login__school-name">
              SWARAJ BAL NIKETAN
            </div>
            <div className="student-login__tagline">
              Learn • Grow • Succeed
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="student-login__form">

          <div className="student-login__title">Student Login</div>

          {/* Student ID */}
          <div className="student-login__input-group">
            <label>Student ID</label>
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              placeholder="Enter your ID"
              className={errors.studentId ? "error" : ""}
            />
            {errors.studentId && (
              <span className="student-login__error">
                {errors.studentId}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="student-login__input-group">
            <label>Password</label>

            <div className="student-login__password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={errors.password ? "error" : ""}
              />

              <span
                className="student-login__eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {errors.password && (
              <span className="student-login__error">
                {errors.password}
              </span>
            )}
          </div>

          <button className="student-login__btn" onClick={handleSubmit}>
            Login →
          </button>

          <div className="student-login__footer">
            Forgot Password?
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLogin;