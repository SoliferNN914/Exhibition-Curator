import React, { useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const AdditionalInfoUrl = styled.a`
  margin: 5px 0;
  font-size: 1.2rem;
  color: #777;
`;

function useOutsideAlerter(ref, onClose) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}

const saveToExhibition = (artwork) => {
  let exhibition = JSON.parse(sessionStorage.getItem('userExhibition')) || [];
  exhibition.push(artwork);
  sessionStorage.setItem('userExhibition', JSON.stringify(exhibition));
  alert(`${artwork.title} added to your exhibition!`);
};

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
        {artwork.objectURL && (
          <AdditionalInfoUrl
            href={artwork.objectURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info on Wikidata
          </AdditionalInfoUrl>
        )}
        <button onClick={() => saveToExhibition(artwork)}>Add to Exhibition</button>
      </CardContent>
    </CardContainer>
  );
};

export default ArtCard;
