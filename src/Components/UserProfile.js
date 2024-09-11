import React from 'react';
import styled from "styled-components";
import ButtonLink from '../Helpers/helpers';

const ProfileContainer = styled.div`
  margin-top: 20px;
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
  border-radius: 5px;
`;

const Subtitle = styled.h2`
  color: #555;
  margin: 20px 0;
`;

export default function UserProfile() {
  return (
    <ProfileContainer>
      <Header>
        Welcome to your profile
      </Header>
      <Subtitle>Manage your collections and exhibitions</Subtitle>
      <ButtonLink to="/exhibition">View Your Exhibition</ButtonLink>
    </ProfileContainer>
  );
}
