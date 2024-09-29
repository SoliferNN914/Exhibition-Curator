import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const StyledForm = styled.form`
  background-color: #8D9D90;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;



const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const StyledSearch = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const StyledButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;

  &:hover {
    background-color: #555;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

export default function Form({ searchRequest, setSearchRequest, searchedItem, setSearchedItem, sortOrder, setSortOrder, filters, setFilters }) {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedItem(searchRequest);
    setFilters(prevFilters => ({ ...prevFilters, startYear, endYear }));
    //setSearchRequest('');
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <StyledSearch
            id="artSearch"
            placeholder="Search For Art"
            value={searchRequest}
            onChange={(event) => setSearchRequest(event.target.value)}
          />
          <StyledSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">No sorting</option>
            <option value="asc">Title A-Z</option>
            <option value="desc">Title Z-A</option>
          </StyledSelect>
          <StyledInput
            type="number"
            placeholder="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          />
          <StyledInput
            type="number"
            placeholder="End Year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          />
          <StyledButton type="submit">Search</StyledButton>
        </InputContainer>
      </StyledForm>
    </FormContainer>
  );
}