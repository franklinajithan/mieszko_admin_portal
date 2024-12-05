import React from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";


export default function Forbidden() {

  document.body.classList.remove("sidebar-show");

  return (
    <div className="page-error">
      <div className="header">
        <Container>
          <a href="/" className="sidebar-logo">Mieszko</a>
          <Nav className="nav-icon">
            <Nav.Link href=""><i className="ri-twitter-fill"></i></Nav.Link>
            <Nav.Link href=""><i className="ri-github-fill"></i></Nav.Link>
            <Nav.Link href=""><i className="ri-dribbble-line"></i></Nav.Link>
          </Nav>
        </Container>
      </div>

      <div className="content">
        <Container>
          <Row className="gx-5">
            <Col lg="5" className="d-flex flex-column align-items-center">
              <h1 className="error-number">505</h1>
              <h2 className="error-title">Forbidden</h2>
              <p className="error-text">Oopps. Something is broken. We've been automatically alerted of the issue and will work to fix it asap.</p>
              <Button variant="primary" className="btn-error">Back to Dashboard</Button>
            </Col>
            <Col xs="8" lg="6" className="mb-5 mb-lg-0">
            
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}