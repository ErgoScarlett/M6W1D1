import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './RegisterPage.css'

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/auth/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: username.toString(),
        email: email.toString(),
        password: password.toString(),
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      const error = await response.json();
      console.error("Errore durante la registrazione:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="12">
              <h1>Registrati</h1>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
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
                  Registrati
                </Button>
              </Form>
              <div className="register-link">
                <Link to="/login">Hai già un account? Login.</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
