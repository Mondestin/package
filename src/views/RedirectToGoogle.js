import React, { useEffect, useState } from 'react';
import { Spinner, Container, Row, Col } from 'reactstrap';

const RedirectToGoogle = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Show the message for 3 seconds before redirecting
    const timer = setTimeout(() => {
      setShowMessage(false);
      window.location.href = 'https://www.google.com';
    }, 3000);

    // Cleanup the timer if the component unmounts before the timer ends
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" lg="4" className="text-center">
          {showMessage ? (
            <div>
              <p>You were not allowed to connect.</p>
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default RedirectToGoogle;
