import React, { useState } from "react";
import styled from "styled-components";
import ExhibitionGrid from "./ExhibitionsPage";
import Form from "./Form";
import ButtonLink from '../Helpers/helpers'
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
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <Title>Exhibition Curator</Title>
      <ButtonLink to='profile'>Profile</ButtonLink>
        <KnightButton to='profile'></KnightButton>
      </Header>
      <Form
        searchRequest={searchTerm}
        setSearchRequest={setSearchTerm}
        setSearchedItem={setSearchTerm}
      />
      <ExhibitionGrid searchTerm={searchTerm} />
    </Container>
  );
};

export default HomePage;
