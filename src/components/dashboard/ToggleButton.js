import React, { useState } from 'react';
import { Button } from 'reactstrap';


const ToggleButton = () => {
  const [isLocked, setIsLocked] = useState(false);

  const toggle = () => {
    setIsLocked(!isLocked);
  };

  return (
    <Button color={isLocked ? 'danger' : 'success'} onClick={toggle}>
      {isLocked ? <i class="bi bi-lock-fill">locked</i> : <i class="bi bi-unlock-fill">unlocked</i> }
    </Button>
  );
};

export default ToggleButton;
