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
  width: 100vw;
  overflow-x: hidden;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  // background-color: #878E76;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 2.5rem;
  flex: 1;
  color: #878E76;
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
  background-color: white;
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
