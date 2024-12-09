import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/success.css";
import successImg from "../assets/images/register.png";
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col lg="12" className="m-auto text-center">
          <div className="success__container">
            <div className="success__img">
              <img src={successImg} alt="Success" />
            </div>
            <h2>Registration Successful!</h2>
            <p>
              Thank you for confirming your email. You can now log in and start
              exploring our platform.
            </p>
            <Button
              className="btn secondary__btn auth__btn"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default RegistrationSuccess;
