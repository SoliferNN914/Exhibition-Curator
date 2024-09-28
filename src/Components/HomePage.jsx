import React, { useState } from "react";
import styled from "styled-components";
import ExhibitionGrid from "./ExhibitionsPage";
import Form from "./Form";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  overflow-x: hidden;
`;

const HomePage = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [searchedItem, setSearchedItem] = useState('');
  const [filters, setFilters] = useState({});
  const [sortOrder, setSortOrder] = useState('none');

  return (
    <Container>
      <Header />
      <Form
        searchRequest={searchRequest}
        setSearchRequest={setSearchRequest}
        searchedItem={searchedItem}
        setSearchedItem={setSearchedItem}
        filters={filters}
        setFilters={setFilters}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <ExhibitionGrid searchTerm={searchedItem} filters={filters} sortOrder={sortOrder} />
    </Container>
  );
};
export default HomePage;