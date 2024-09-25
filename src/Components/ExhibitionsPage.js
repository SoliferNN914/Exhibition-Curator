import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { searchArtworks, fetchArtworkDetails, searchChicagoArtworks, fetchChicagoArtworkDetails } from '../Services/Api';
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
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-bottom: 40px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 60%;
  display: block;
  object-fit: cover;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #333;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const LoadMoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #555;
  }
`;

const SearchMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
`;

const ExhibitionGrid = ({ searchTerm }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArtWork, setSelectedArtWork] = useState(null);
  const [page, setPage] = useState(1); 
  const [visibleMetArtworks, setVisibleMetArtworks] = useState(10); 
  const [initialMetLoaded, setInitialMetLoaded] = useState(false); 

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        setError(null);

        const defaultSearch = searchTerm || "flower";

        const chicagoObjectIDs = await searchChicagoArtworks(defaultSearch, page);
        const chicagoArtworkDetailsPromises = chicagoObjectIDs
          .slice(0, 10)
          .map((artwork) => fetchChicagoArtworkDetails(artwork.id, artwork.image_id));
        const chicagoArtworksData = await Promise.all(chicagoArtworkDetailsPromises);

        if (page === 1 && !initialMetLoaded) {
          const metObjectIDs = await searchArtworks(defaultSearch);
          const metArtworkDetailsPromises = metObjectIDs
            .slice(0, visibleMetArtworks)
            .map((objectID) => fetchArtworkDetails(objectID));
          const metArtworksData = await Promise.all(metArtworkDetailsPromises);

          setArtworks([...chicagoArtworksData, ...metArtworksData]);
          setInitialMetLoaded(true); 
        } else {

          setArtworks((prevArtworks) => [...prevArtworks, ...chicagoArtworksData]);
        }
      } catch (error) {
        setError('Failed to fetch artworks');
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [searchTerm, page]);


  useEffect(() => {
    if (searchTerm) {
      setArtworks([]);
      setPage(1);
      setVisibleMetArtworks(10); 
      setInitialMetLoaded(false); 
    }
  }, [searchTerm]);

 
  const loadMoreMetArtworks = async () => {
    const nextChunkSize = 10; 
    const metObjectIDs = await searchArtworks(searchTerm || "flower");
    const nextBatch = metObjectIDs.slice(visibleMetArtworks, visibleMetArtworks + nextChunkSize);

    const metArtworkDetailsPromises = nextBatch.map((objectID) => fetchArtworkDetails(objectID));
    const nextMetArtworksData = await Promise.all(metArtworkDetailsPromises);

    setArtworks((prevArtworks) => [...prevArtworks, ...nextMetArtworksData]); 
    setVisibleMetArtworks(visibleMetArtworks + nextChunkSize);
  };

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

  const loadMoreArtworks = () => {
    setPage((prevPage) => prevPage + 1); 
    loadMoreMetArtworks(); 
  };

  if (loading && page === 1) {
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
        <ArtCard artwork={selectedArtWork} onClose={() => { setSelectedArtWork(null); }} />
      ) : (
        <>
          <SearchMessage>
            Currently, you are looking for "{searchTerm || 'flower'}" items
          </SearchMessage>

          <GridContainer>
            {artworks.length > 0 ? (
              artworks.map((artwork, index) => (
                <GridItem key={index} onClick={() => handleArtWorkClick(artwork)}>
                  {artwork.imageUrl || artwork.primaryImageSmall ? (
                    <Image src={artwork.imageUrl || artwork.primaryImageSmall} alt={artwork.title || 'Untitled'} />
                  ) : (
                    <p>No image available</p>
                  )}
                  <Title>{artwork.title || 'Untitled'}</Title>
                  <Button onClick={(event) => saveToExhibition(artwork, event)}>Add</Button>
                </GridItem>
              ))
            ) : (
              <p>No artworks to display</p>
            )}
          </GridContainer>
          <LoadMoreButton onClick={loadMoreArtworks}>Load More</LoadMoreButton>
        </>
      )}
    </>
  );
};

export default ExhibitionGrid;
