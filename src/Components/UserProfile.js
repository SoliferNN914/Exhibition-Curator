import React, { Fragment, useState } from 'react';
import UserExhibitions from './UserExhibitions';
import styled from 'styled-components';

// Styling for the button
const Button = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background-color: #555;
  }
`;

export default function UserProfile() {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true); // Show UserExhibitions on button click
  };

  return (
    <Fragment>
      <Button onClick={handleButtonClick}>View User Exhibitions</Button>
      {showComponent && <UserExhibitions />}
    </Fragment>
  );
}
