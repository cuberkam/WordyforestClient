import { Container, Form, Card, Button } from "react-bootstrap";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/register";

function Register() {
  useTitle("Register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    register(email, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Card className="p-4">
          <Card.Title className="text-center">REGISTER</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Register;
