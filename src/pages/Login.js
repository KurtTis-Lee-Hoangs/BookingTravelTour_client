import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // navigate("/homepage");

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      //   if(!res.ok) {
      //     alert(result.message);
      //   }

      //   // console.log(result.data);

      //   // dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      //   dispatch({ type: "LOGIN_SUCCESS", payload:{ ...result.data, role: result.role} });
      //   navigate("/");
      // } catch (err) {
      //   dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      // }

      if (!res.ok) {
        alert(result.message); // Show an error message if login fails
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { ...result.data, role: result.role },
        });
        navigate("/"); // Only navigate if login is successful
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      alert("Login failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Gửi credential tới server để xác thực
      const res = await fetch(`${BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ credential }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("accessToken", result.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { ...result.data, role: result.role },
        });
        navigate("/"); // Điều hướng về trang chính
      } else {
        alert(result.message || "Something went wrong.");
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
      }
    } catch (err) {
      console.error(err);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed. Please try again.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <GoogleOAuthProvider clientId="477572149820-q650bbuuum6fraik5kmk2jvsnteh17la.apps.googleusercontent.com">
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Login</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <Button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="btn">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />
                  </div>
                  <p className="mb-0">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                  <p className="mt-0">
                    <Link to="/forgotpassword">Forgot password</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
