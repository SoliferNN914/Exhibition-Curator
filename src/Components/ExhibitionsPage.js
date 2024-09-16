import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { searchArtworks, fetchArtworkDetails } from '../Services/Api';
import ArtCard from './ArtCard';
import chariotImage from "../Assets/Chariot.webp";

const moveChariot = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Chariot = styled.img`
  width: 100px;
  height: auto;
  animation: ${moveChariot} 2s linear infinite;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
`;

const GridItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #333;
`;

const ExhibitionGrid = ({ searchTerm }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArtWork, setSelectedArtWork] = useState(null);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        setError(null);
        const defaultSearch = searchTerm || "Sword";
        const objectIDs = await searchArtworks(defaultSearch);
        if (objectIDs.length === 0) {
          setArtworks([]);
          setError('No artworks found for the search term.');
          return;
        }
        const artworkDetailsPromises = objectIDs.slice(0, 12).map(id => fetchArtworkDetails(id));
        const artworksData = await Promise.all(artworkDetailsPromises);
        setArtworks(artworksData);
        console.log(artworksData);
        
      } catch (error) {
        setError('Failed to fetch artworks');
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, [searchTerm]);

  const saveToExhibition = (artwork, event) => {
    event.stopPropagation();
    let exhibition = JSON.parse(sessionStorage.getItem('userExhibition')) || [];
    exhibition.push(artwork);
    sessionStorage.setItem('userExhibition', JSON.stringify(exhibition));
    alert(`${artwork.title} added to your exhibition!`);
  };

  const handleArtWorkClick = (artwork) => {
    setSelectedArtWork(artwork);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Chariot src={chariotImage} alt="Loading Chariot" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {selectedArtWork ? (
        <ArtCard artwork={selectedArtWork} onClose={() => { setSelectedArtWork(null) }} />
      ) : (
        <GridContainer>
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <GridItem key={artwork.objectID} onClick={() => handleArtWorkClick(artwork)}>
                <Image src={artwork.primaryImageSmall} alt={artwork.title} />
                <Title>{artwork.title}</Title>
                <button onClick={(event) => saveToExhibition(artwork, event)}>Add to Exhibition</button>
              </GridItem>
            ))
          ) : (
            <p>No artworks to display</p>
          )}
        </GridContainer>
      )}
    </>
  );
};

export default ExhibitionGrid;
