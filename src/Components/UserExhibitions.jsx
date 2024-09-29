import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import ArtCard from "./ArtCard";

const ExhibitionContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ExhibitionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 10px;
  }
`;

const ArtworkCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;

  @media (max-width: 768px) {
    padding: 8px;
  }
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

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 8px 0;
  }
`;

const RemoveButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background-color: #c9302c;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;

const NoExhibition = styled.h3`
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default function UserExhibitions() {
  const [exhibition, setExhibition] = useState([]);
  const [selectedArtWork, setSelectedArtWork] = useState(null);

  useEffect(() => {
    const savedExhibition =
      JSON.parse(sessionStorage.getItem("userExhibition")) || [];
    setExhibition(savedExhibition);
  }, []);

  const removeFromExhibition = (objectID) => {

    const updatedExhibition = exhibition.filter(
      (artwork) => artwork.objectID !== objectID
    );
    setExhibition(updatedExhibition);
    sessionStorage.setItem("userExhibition", JSON.stringify(updatedExhibition));
  };

  const handleArtWorkClick = (artwork) => {
    setSelectedArtWork(artwork);
  };

  return (
    <>
      {selectedArtWork ? (
        <ArtCard
          artwork={selectedArtWork}
          onClose={() => {
            setSelectedArtWork(null);
          }}
        />
      ) : (
        <>
          <Header />
          <ExhibitionContainer>
            <ExhibitionTitle>
              Your Personal Collection Of Unique Art
            </ExhibitionTitle>
            {exhibition.length === 0 ? (
              <NoExhibition>
                Currently Empty | Add Items To Create Your Own Exhibition
              </NoExhibition>
            ) : (
              <GridContainer>
                {exhibition.map((artwork) => (
                  <ArtworkCard
                    key={artwork.objectID}
                    onClick={() => handleArtWorkClick(artwork)}
                  >
                    <ArtworkImage
                      src={artwork.imageUrl || artwork.primaryImageSmall}
                      alt={artwork.title || "Untitled"}
                    />
                    <ArtworkTitle>{artwork.title}</ArtworkTitle>
                    <RemoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromExhibition(artwork.objectID);
                      }}
                    >
                      Remove
                    </RemoveButton>
                  </ArtworkCard>
                ))}
              </GridContainer>
            )}
          </ExhibitionContainer>
        </>
      )}
    </>
  );
}
