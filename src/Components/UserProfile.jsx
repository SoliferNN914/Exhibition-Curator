import React from 'react';
import styled from "styled-components";
import ButtonLink from '../Helpers/helpers';
import Header from "./Header";

const ProfileContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Subtitle = styled.h2`
  color: #555;
  margin: 20px 0;
`;

export default function UserProfile() {
  return (
    <>
    <Header/>
    <ProfileContainer role="main" aria-labelledby="profile-subtitle">
      <Subtitle>Manage Your Exibition</Subtitle>
      <ButtonLink to="/exhibition">View Your Exhibition</ButtonLink>
    </ProfileContainer>
    </>
  );
}
