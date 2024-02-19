import "../App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function NavBar () {
    return (
      <>
      <div style={{ background: "#000035", width: "100%", color: "white", height: "40px"}}  className="d-flex justify-content-end px-2">
      <Navbar className="d-flex justify-content-between">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavDropdown title="Contact" id="basic-nav-dropdown" className="ml-auto dropdown-center dropdown-hover">
          <NavDropdown.Item href="https://myrapid.com.my/">MyRapidKL Website</NavDropdown.Item>
          <NavDropdown.Item href="https://www.mymrt.com.my/">MRT Corp Website</NavDropdown.Item>
          <NavDropdown.Item href="tel:60378852585">Call MyRapidKL</NavDropdown.Item>
          <NavDropdown.Item href="tel:1800886782">Call MRT Corp</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Download the PULSE App" id="basic-nav-dropdown" className="ml-auto dropdown-center dropdown-hover">
            <NavDropdown.Item href="https://myrapid.com.my/pulse/mobile-app/">Learn about PULSE App</NavDropdown.Item>
            <NavDropdown.Item href="https://apps.apple.com/my/app/myrapid-pulse/id1545938705">Download for iOS</NavDropdown.Item>
            <NavDropdown.Item href="https://play.google.com/store/apps/details?id=com.prasarana.pulse">Download for Android</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>

      <Navbar expand="lg" className="d-flex justify-content-between">
        <div>
          <Navbar.Brand to="/" className="mr-auto px-2">
            <h1><a href="/" style={{textDecoration: "none"}}>Public Transit Guide</a></h1>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto px-2 custom-nav">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/transitmap" target="_blank">Transit Map</Nav.Link>
              <Nav.Link href="/parknride">Park N&apos; Ride</Nav.Link>
              <Nav.Link href="/issues">Report Issues</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    )
}