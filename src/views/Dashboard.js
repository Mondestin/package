import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from '../components/dashboard/UserCard.js';
import { useParams } from 'react-router-dom';
const Dashboard = () => {

  const { userId } = useParams();

  // Use the userId parameter as needed in your component
  console.log('User ID:', userId);


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
