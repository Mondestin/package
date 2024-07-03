import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

import user1 from "../../assets/images/users/user1.jpg";

const UserCard = () => {
  return (
    <Card className="text-center">
      <CardImg top width="100%" src={user1} alt="User image" className="rounded-circle mt-3" style={{ width: '150px', height: '150px', margin: '0 auto' }} />
      <CardBody>
        <CardTitle tag="h5">VASKEN MOURADIAN</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">Sr. UX Designer</CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default UserCard;
