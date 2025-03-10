import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from '../components/dashboard/UserCard.js';

const Dashboard = () => {


  // Use the userId parameter as needed in your component

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" lg="4">
          <UserCard />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
