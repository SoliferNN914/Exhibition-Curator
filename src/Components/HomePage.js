import React, { useState } from "react";
import styled from "styled-components";
import ExhibitionGrid from "./ExhibitionsPage";
import Form from "./Form";
import UserProfile from "./UserProfile";

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
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Container>
      <Header>
        <Title>Exhibition Curator</Title>
      </Header>
      <Form
        searchRequest={searchTerm}
        setSearchRequest={setSearchTerm}
        setSearchedItem={setSearchTerm}
      />
      <UserProfile/>
      <ExhibitionGrid searchTerm={searchTerm}/>
    </Container>
  );
};

export default HomePage;
