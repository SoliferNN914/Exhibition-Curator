import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from '../Assets/Vault-background.jpg'

const ExhibitionContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-image: url(${img});
  width: 100vw;
  height: 100vh;
`;

const ExhibitionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ArtworkCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 10px;
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ArtworkTitle = styled.h3`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
`;

const RemoveButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;

const NoExhibition = styled.h3`
text-align: center;

`;

export default function UserExhibitions() {
  const [exhibition, setExhibition] = useState([]);

  useEffect(() => {
    // Get saved exhibition from session storage
    const savedExhibition = JSON.parse(sessionStorage.getItem('userExhibition')) || [];
    setExhibition(savedExhibition);
  }, []);

  const removeFromExhibition = (objectID) => {
    const updatedExhibition = exhibition.filter((artwork) => artwork.objectID !== objectID);
    setExhibition(updatedExhibition);
    sessionStorage.setItem('userExhibition', JSON.stringify(updatedExhibition));
  };

  return (
    <ExhibitionContainer>
      <ExhibitionTitle>Your Personal Vault of Saved Art</ExhibitionTitle>
      {exhibition.length === 0 ? (
        <NoExhibition>Vault Empty</NoExhibition>
      ) : (
        <GridContainer>
          {exhibition.map((artwork) => (
            <ArtworkCard key={artwork.objectID}>
              <ArtworkImage src={artwork.primaryImageSmall} alt={artwork.title} />
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <RemoveButton onClick={() => removeFromExhibition(artwork.objectID)}>
                Remove
              </RemoveButton>
            </ArtworkCard>
          ))}
        </GridContainer>
      )}
    </ExhibitionContainer>
  );
}
