import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchArtworks, fetchArtworkDetails } from '../Services/Api';
import Form from "./Form";
import ArtCard from './ArtCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const GridItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
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
  const [selectedArtwork, setSelectedArtwork] = useState(null); // Track selected artwork

  useEffect(() => {
    if (searchTerm) {
      const loadArtworks = async () => {
        try {
          setLoading(true);
          setError(null);

          // Step 1: Search for artworks based on the search term from the form
          const objectIDs = await searchArtworks(searchTerm); 

          if (objectIDs.length === 0) {
            setArtworks([]);
            setError('No artworks found for the search term.');
            return;
          }

          // Step 2: Fetch details for each artwork ID
          const artworkDetailsPromises = objectIDs.slice(0, 12).map(id => fetchArtworkDetails(id));
          const artworksData = await Promise.all(artworkDetailsPromises);

          setArtworks(artworksData);
          
        } catch (error) {
          setError('Failed to fetch artworks');
        } finally {
          setLoading(false);
        }
      };

      loadArtworks();
    }
  }, [searchTerm]);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {selectedArtwork ? (
        // Show ArtCard when an artwork is clicked
        <ArtCard artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      ) : (
        <GridContainer>
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <GridItem key={artwork.objectID} onClick={() => handleArtworkClick(artwork)}>
                <Image src={artwork.primaryImageSmall} alt={artwork.title} />
                <Title>{artwork.title}</Title>
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
