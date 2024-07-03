import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom';
import user1 from "../../assets/images/users/user1.jpg";
const UserCard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    fetch(`https://microback.onrender.com/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Spinner color="primary" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className="text-center">
      <CardImg
        top
        width="100%"
        src={user.profilePicture || user1} // Replace with the actual profile picture URL if available
        alt="User image"
        className="rounded-circle mt-3"
        style={{ width: '150px', height: '150px', margin: '0 auto' }}
      />
      <CardBody>
        <CardTitle tag="h5">{user.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">{user.email}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default UserCard;
