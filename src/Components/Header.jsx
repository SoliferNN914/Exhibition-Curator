import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo.webp';
import Knight from '../Assets/Knight.png';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
`;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const Title = styled.h1`
  padding: 0 20px;
  font-size: 2.5rem;
  flex: 1;
  color: #878E76;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 10px 0;
    order: 1;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 60px;
    order: 0;
  }
`;

const ProfileContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  @media (max-width: 768px) {
    flex-direction: row;
    order: 2;
    margin-top: 10px;
  }
`;

const KnightButton = styled.button`
  width: 80px;
  height: 80px;
  background-image: url(${Knight});
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ProfileText = styled.span`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #878E76;
  font-weight: 500;
  transition: color 0.3s ease;

  ${ProfileContainer}:hover & {
    color: #5a5f4d;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    margin-left: 10px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to='/'>
          <Logo src={logo} alt="Logo" />
        </Link>
        <Title>Exhibition Curator</Title>
        <ProfileContainer to='/profile'>
          <KnightButton />
          <ProfileText>Profile</ProfileText>
        </ProfileContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;