import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/authContext.js";
import './LoginPage.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // NEw commit

  const { token, setToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3001/api/auth/login",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: email.toString(),
          password: password.toString(),
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      setToken(result.token);
    }
  };

  useEffect(() => {
    if (token !== "") {
       navigate("/");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
      <div className="login-container">
        <div className="login-card">
          <Container>
            <Row className="justify-content-md-center">
              <Col md="12">
                <h1>Login</h1>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
  
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-4">
                    Login
                  </Button>
                </Form>
                <div className="register-link">
                  <Link to="/register">Non hai un account? Registrati.</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  );
}