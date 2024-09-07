import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 800px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin: 10px 0;
  font-size: 2rem;
  color: #333;
`;

const Artist = styled.h4`
  margin: 5px 0;
  font-size: 1.2rem;
  color: #777;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ArtCard = ({ artwork, onClose }) => {
  return (
    <CardContainer>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <Image src={artwork.primaryImage} alt={artwork.title} />
      <Title>{artwork.title}</Title>
      <Artist>{artwork.artistDisplayName || 'Unknown Artist'}</Artist>
      <Description>{artwork.objectDate || 'Unknown Date'}</Description>
      <Description>{artwork.medium || 'Unknown Medium'}</Description>
      <Description>{artwork.dimensions || 'Unknown Dimensions'}</Description>
    </CardContainer>
  );
};

export default ArtCard;
