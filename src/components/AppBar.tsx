// import { useState } from "react";
import { Navbar, NavbarText, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../api/logout";

function AppBar() {
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    console.log("Logged out");
    logout();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Wordyforest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {userName === null ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/my-lists">
                  MyLists
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {userName && (
              <NavbarText style={{ fontWeight: "bold" }}>
                Hi {userName}
              </NavbarText>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
