import React, { useRef, useEffect } from "react";
import styled from 'styled-components';

const CardContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CardContent = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
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
  margin: 5px 0 15px;
  font-size: 1.2rem;
  color: #777;
`;

const DescriptionItem = styled.div`
  margin-bottom: 15px;
`;

const DescriptionTitle = styled.h5`
  margin: 0 0 5px;
  font-size: 1rem;
  color: #555;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 0;
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

const AdditionalInfoText = styled.p`
  margin: 20px 0 10px;
  font-size: 1rem;
  color: #555;
`;

const AdditionalInfoLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AddToExhibitionButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  width: 100%;
  
  &:hover {
    background-color: #45a049;
  }
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
        <Image src={artwork.imageUrl || artwork.primaryImageSmall} alt={artwork.title || 'Untitled'} />
        <Title>{artwork.title}</Title>
        <Artist>{artwork.artistDisplayName || 'Unknown Artist'}</Artist>
        <DescriptionItem>
          <DescriptionTitle>Date:</DescriptionTitle>
          <Description>{artwork.objectDate || 'Unknown'}</Description>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTitle>Medium:</DescriptionTitle>
          <Description>{artwork.medium || 'Unknown'}</Description>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTitle>Dimensions:</DescriptionTitle>
          <Description>{artwork.dimensions || 'Unknown'}</Description>
        </DescriptionItem>
        {artwork.objectURL && (
          <AdditionalInfoText>
            For more details, visit the{' '}
            <AdditionalInfoLink
              href={artwork.objectURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              artwork's page
            </AdditionalInfoLink>
            .
          </AdditionalInfoText>
        )}
        <AddToExhibitionButton onClick={() => saveToExhibition(artwork)}>
          Add to Exhibition
        </AddToExhibitionButton>
      </CardContent>
    </CardContainer>
  );
};

export default ArtCard;