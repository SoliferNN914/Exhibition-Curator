import React, { useRef, useEffect } from "react";
import styled from 'styled-components';

const CardContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CardContent = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 90%; /* Ensure the card does not overflow the screen */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto; /* Enable scrolling if content is too tall */
  position: relative;
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

function useOutsideAlerter(ref, onClose) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(); // Close the ArtCard when clicked outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}

const handleLike = () => {
  
}

const ArtCard = ({ artwork, onClose }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClose);

  return (
    <CardContainer>
      <CardContent ref={wrapperRef}>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <Image src={artwork.primaryImage} alt={artwork.title} />
        <Title>{artwork.title}</Title>
        <Artist>{artwork.artistDisplayName || 'Unknown Artist'}</Artist>
        <Description>{artwork.objectDate || 'Unknown Date'}</Description>
        <Description>{artwork.medium || 'Unknown Medium'}</Description>
        <Description>{artwork.dimensions || 'Unknown Dimensions'}</Description>
        <button onClick={handleLike}>Like</button>
      </CardContent>
    </CardContainer>
  );
};

export default ArtCard;
