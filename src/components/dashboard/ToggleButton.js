import React, { useState } from 'react';
import { Button } from 'reactstrap';

const ToggleButton = ({ userId, initialStatus }) => {
  const [isLocked, setIsLocked] = useState(initialStatus === true);

  const updateCardStatusInDB = async (userId, status) => {


    try {
      const response = await fetch(`https://microback.onrender.com/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ cardStatus: status }),
      });
        console.error('Status', status);
      if (!response.ok) {
        throw new Error('Failed to update card status');
      }

      const data = await response.json();
      console.log('Card status updated:', data);
    } catch (error) {
      console.error('Error updating card status:', error);
    }
  };

  const toggle = async () => {
    const newStatus = !isLocked ? true : false;
    setIsLocked(!isLocked);
    await updateCardStatusInDB(userId, newStatus);
  };

  return (
    <Button color={isLocked ? 'danger' : 'success'} onClick={toggle}>
      {isLocked ? <i className="bi bi-lock-fill"></i> : <i className="bi bi-unlock-fill"></i>}
    </Button>
  );
};

export default ToggleButton;
