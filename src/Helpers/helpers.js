import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #ABC4A1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9DB4AB;
  }
`;

function ButtonLink({ to, children }) {
  return (
    <Link to={to}>
      <StyledButton>{children}</StyledButton>
    </Link>
  );
}

export default ButtonLink;
