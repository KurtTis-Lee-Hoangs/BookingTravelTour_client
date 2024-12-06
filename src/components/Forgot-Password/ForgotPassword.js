import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./forgot-password.css";
import { BASE_URL } from "../../utils/config";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch(`${BASE_URL}/users/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const result = await res.json();
  
        if (!res.ok) {
          alert(result.message);
        } else {
          alert("A reset link has been sent to your email.");
        }
      } catch (err) {
        alert("An error occurred. Please try again later.");
      }
    };
  
    const handleBackToLogin = () => {
      navigate("/login");
    };
  
    return (
      <section className="forgot-password">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
              <div className="forgot-password__box">
                {/* Nút mũi tên quay lại với dòng chữ */}
                <button
                  className="back-to-login-btn"
                  onClick={handleBackToLogin}
                >
                  &#8592; <span>Back to Login</span>
                </button>
                <h2 className="text-center">Forgot Password?</h2>
                <Form onSubmit={handleSubmit} className="forgot-password__form">
                  <FormGroup>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <Button className="btn primary__btn auth__btn w-100" type="submit">
                    Send Reset Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

export default ForgotPassword
