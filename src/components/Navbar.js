import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Search } from "semantic-ui-react";

const NavBar = () => {
  const navbarStyle = {
    justifyContent: "space-between",
    padding: "30px 50px",
  };

  const navLinkStyle = {
    margin: "0 50px",
    color: "white",
  };
  return (
    <div>
      <header>
        <Navbar className="navbar" variant="dark" style={navbarStyle}>
          <Navbar.Brand href="/">
            <h1>FilmDizi</h1>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/film" style={navLinkStyle} className="nav-link">
              <h3>Film</h3>
            </Nav.Link>
            <Nav.Link href="/dizi" style={navLinkStyle} className="nav-link">
              <h3>Dizi</h3>
            </Nav.Link>
            <Nav.Link href="/" style={navLinkStyle} className="nav-link">
              <h3>Anime</h3>
            </Nav.Link>
          </Nav>
          <Search id="search" placeholder="Ara..." />
        </Navbar>
      </header>
    </div>
  );
};

export default NavBar;
