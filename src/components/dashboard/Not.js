import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import user1 from "../../assets/images/users/221.jpg";

const Not = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" lg="4">
        <img src={user1} alt="User" style={{ width: '100%', borderRadius: '10px' }} />

        </Col>
      </Row>
    </Container>
  );
};

export default Not;
