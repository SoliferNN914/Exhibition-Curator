import React, { useState } from "react";
import styled from "styled-components";
import ExhibitionGrid from "./ExhibitionsPage";
import Form from "./Form";
import logo from '../Assets/Logo.webp';
import Knight from '../Assets/Knight.png'
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #878E76;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 2.5rem;
  flex: 1;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const KnightButton = styled.button`
  width: 100px;
  height: 100px;
  background-image: url(${Knight});
  background-size: cover;
  background-position: center;
  background-color: #878E76;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const HomePage = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [searchedItem, setSearchedItem] = useState('');
  const [filters, setFilters] = useState({});

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <Title>Exhibition Curator</Title>
      <Link to='/profile'>
        <KnightButton />
      </Link>
      </Header>
      <Form
        searchRequest={searchRequest}
        setSearchRequest={setSearchRequest}
        searchedItem={searchedItem}
        setSearchedItem={setSearchedItem}
        setFilters={setFilters}
      />
      <ExhibitionGrid searchTerm={searchedItem} filters={filters}/>
    </Container>
  );
};

export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { fetchAvailableCultures, fetchAvailablePeriods, searchArtworksWithFilters } from '../Services/Api';
// import Form from './Form';
// import ExhibitionGrid from './ExhibitionsPage';

// const HomePage = () => {
//   const [searchRequest, setSearchRequest] = useState('');
//   const [searchedItem, setSearchedItem] = useState('');
//   const [filters, setFilters] = useState({});
//   const [cultures, setCultures] = useState([]);
//   const [periods, setPeriods] = useState([]);
//   const [artworks, setArtworks] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch available cultures and periods from the API
//   useEffect(() => {
//     const loadFilterData = async () => {
//       try {
//         const [culturesData, periodsData] = await Promise.all([
//           fetchAvailableCultures(),
//           fetchAvailablePeriods()
//         ]);
//         setCultures(culturesData);
//         setPeriods(periodsData);
//       } catch (error) {
//         console.error('Error fetching cultures and periods:', error);
//       }
//     };

//     loadFilterData();
//   }, []);

//   // Fetch artworks when search term or filters change
//   useEffect(() => {
//     const loadArtworks = async () => {
//       if (!searchedItem) return; // Prevent search on empty input
//       try {
//         setLoading(true);
//         setError(null);
//         const artworksData = await searchArtworksWithFilters(searchedItem, filters);
//         setArtworks(artworksData);
//       } catch (error) {
//         setError('Failed to fetch artworks');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadArtworks();
//   }, [searchedItem, filters]);

//   return (
//     <div>
//       <Form
//         searchRequest={searchRequest}
//         setSearchRequest={setSearchRequest}
//         searchedItem={searchedItem}
//         setSearchedItem={setSearchedItem}
//         setFilters={setFilters}
//         cultures={cultures}   // Pass cultures down to Form
//         periods={periods}     // Pass periods down to Form
//       />
//       <ExhibitionGrid searchTerm={searchedItem} artworks={artworks} />
//     </div>
//   );
// };

// export default HomePage;
