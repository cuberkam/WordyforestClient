import { Container, Form, Card, Button } from "react-bootstrap";
import { useState } from "react";
import useTitle from "../hooks/useTitle";
import { login } from "../api/login";
import ErrorModal from "../components/ErrorModal";

function Login() {
  useTitle("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    login(email, password)
      .then((response) => {
        if (response.user) {
          localStorage.setItem("userName", response.user.email);
          localStorage.setItem("token", response.accessToken);
          window.location.href = "/";
        } else {
          console.error("Login error:", response.message);
        }
      })
      .catch((error) => {
        setError(error.message);
        setShowError(true);
        console.error("Login error:", error);
      });
  };

  return (
    <>
      <ErrorModal
        show={showError}
        onHide={() => setShowError(false)}
        title="Error"
        message={error}
      />
      <Container className="mt-5">
        <Card className="p-4">
          <Card.Title className="text-center">LOGIN</Card.Title>
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
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Login;
