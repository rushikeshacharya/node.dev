import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("flash@bharat.in");
  const [password, setPassword] = useState("India@1234");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong");
      console.log("Error in Login:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong");
      console.log("Error in Signup:", error);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {" "}
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form id="loginForm">
            {!isLogin && (
              <>
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=""
                />
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=""
                />
              </>
            )}
            <legend className="fieldset-legend">Email Id:</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder=""
            />
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </form>
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </div>
        <p
          className="m-auto py-2 cursor-pointer flex justify-center"
          onClick={() => setIsLogin((value) => !value)}
        >
          {isLogin ? "New User ? Signup here " : " Existing User ? Login here "}
        </p>
      </div>
    </div>
  );
};

export default Login;
