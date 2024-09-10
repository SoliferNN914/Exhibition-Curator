import React, { useState } from "react";
import styled from "styled-components";
import ExhibitionGrid from "./ExhibitionsPage";
import Form from "./Form";
import ButtonLink from '../Helpers/helpers'
import logo from '../Assets/Logo.webp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #333;
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

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <Title>Exhibition Curator</Title>
      </Header>
      <ButtonLink to='profile'>Profile</ButtonLink>
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
