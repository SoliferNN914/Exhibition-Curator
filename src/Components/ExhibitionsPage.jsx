import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { searchArtworks, fetchArtworkDetails, searchChicagoArtworks, fetchChicagoArtworkDetails } from '../Services/Api';
import ArtCard from './ArtCard';
import chariotImage from "../Assets/Chariot.webp";
import ProgressiveImage from "react-progressive-graceful-image";

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

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  color: #aaa;
  font-size: 1rem;
`;

const ExhibitionGrid = ({ searchTerm, filters, sortOrder }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArtWork, setSelectedArtWork] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { startYear, endYear } = filters;

  const loadArtworks = async (currentPage, isLoadingMore = false) => {
    try {
      setLoading(true);
      setError(null);

      const defaultSearch = searchTerm || "flower";

      const chicagoObjectIDs = await searchChicagoArtworks(defaultSearch, currentPage, startYear, endYear);
      const chicagoArtworkDetailsPromises = chicagoObjectIDs
        .slice(0, 10)
        .map((artwork) => fetchChicagoArtworkDetails(artwork.id, artwork.image_id));
      const chicagoArtworksData = await Promise.all(chicagoArtworkDetailsPromises);

      const metObjectIDs = await searchArtworks(defaultSearch, startYear, endYear);
      const metStartIndex = (currentPage - 1) * 10;
      const metArtworkDetailsPromises = metObjectIDs
        .slice(metStartIndex, metStartIndex + 10)
        .map((objectID) => fetchArtworkDetails(objectID));
      const metArtworksData = await Promise.all(metArtworkDetailsPromises);

      const validMetArtworks = metArtworksData.filter((artwork) => artwork !== null);
      let newArtworks = [...chicagoArtworksData, ...validMetArtworks];

      if (sortOrder === 'asc') {
        newArtworks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === 'desc') {
        newArtworks.sort((a, b) => b.title.localeCompare(a.title));
      }

      if (isLoadingMore) {
        setArtworks(prevArtworks => [...prevArtworks, ...newArtworks]);
      } else {
        setArtworks(newArtworks);
      }

      setHasMore(newArtworks.length > 0);
    } catch (error) {
      setError('Failed To Find Art, Try Again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setArtworks([]);
    setPage(1);
    setHasMore(true);
    loadArtworks(1);
  }, [searchTerm, filters, sortOrder]);

  const loadMoreArtworks = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadArtworks(nextPage, true);
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
          <GridContainer>
            {artworks.length > 0 ? (
              artworks.map((artwork, index) => (
                <GridItem key={index} onClick={() => handleArtWorkClick(artwork)}>
                  <ProgressiveImage
                    src={artwork.imageUrl || artwork.primaryImageSmall}
                    placeholder="https://via.placeholder.com/200"
                  >
                    {(src, loading) => (
                      loading ? (
                        <ImagePlaceholder>Loading Image...</ImagePlaceholder>
                      ) : (
                        <img src={src} alt={artwork.title || 'Untitled'} style={{ width: '100%', height: '60%' }} />
                      )
                    )}
                  </ProgressiveImage>
                  <Title>{artwork.title || 'Untitled'}</Title>
                  <Button onClick={(event) => saveToExhibition(artwork, event)}>Add</Button>
                </GridItem>
              ))
            ) : (
              <p>No artworks to display</p>
            )}
          </GridContainer>
          {hasMore && <LoadMoreButton onClick={loadMoreArtworks}>Load More</LoadMoreButton>}
        </>
      )}
    </>
  );
};

export default ExhibitionGrid;
