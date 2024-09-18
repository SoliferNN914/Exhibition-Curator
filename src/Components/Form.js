import styled from "styled-components";


const FormContainer = styled.div`
  margin: 20px;
`;


const StyledForm = styled.form`
  background-color: #8D9D90;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const StyledLabel = styled.label`
  font-size: 1.2rem;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;


const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
`;


const StyledButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export default function Form(props) {
  const { searchRequest, setSearchRequest, searchedItem, setSearchedItem } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedItem(searchRequest);
    setSearchRequest('');
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <StyledLabel htmlFor="artSearch">Search for Art:</StyledLabel>
          <StyledInput
            id="artSearch"
            value={searchRequest}
            onChange={(event) => {
              setSearchRequest(event.target.value);
            }}
          />
        </div>
        <div>
          <StyledButton type="submit">Search</StyledButton>
        </div>
      </StyledForm>
    </FormContainer>
  );
}

// import styled from "styled-components";
// import { useState } from 'react';

// const FormContainer = styled.div`
//   margin: 20px;
// `;

// const StyledForm = styled.form`
//   background-color: #8D9D90;
//   padding: 20px;
//   border-radius: 5px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const StyledLabel = styled.label`
//   font-size: 1.2rem;
//   color: #333;
//   display: block;
//   margin-bottom: 10px;
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 1rem;
//   box-sizing: border-box;
// `;

// const StyledSelect = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 1rem;
//   box-sizing: border-box;
// `;

// const StyledButton = styled.button`
//   background-color: #333;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #555;
//   }
// `;

// export default function Form(props) {
//   const { searchRequest, setSearchRequest, searchedItem, setSearchedItem, setFilters, cultures, periods } = props;

//   // Local state for selected culture and period
//   const [culture, setCulture] = useState('');
//   const [period, setPeriod] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setSearchedItem(searchRequest);
//     setFilters({ culture, period });  // Send filters to the parent component
//     setSearchRequest('');
//   };

//   return (
//     <FormContainer>
//       <StyledForm onSubmit={handleSubmit}>
//         <div>
//           <StyledLabel htmlFor="artSearch">Search for Art:</StyledLabel>
//           <StyledInput
//             id="artSearch"
//             value={searchRequest}
//             onChange={(event) => setSearchRequest(event.target.value)}
//           />
//         </div>

//         {/* Dynamic Culture Dropdown */}
//         <div>
//           <StyledLabel htmlFor="cultureSelect">Culture:</StyledLabel>
//           <StyledSelect
//             id="cultureSelect"
//             value={culture}
//             onChange={(event) => setCulture(event.target.value)}
//           >
//             <option value="">Any Culture</option>
//             {cultures.map((cultureItem) => (
//               <option key={cultureItem} value={cultureItem}>
//                 {cultureItem}
//               </option>
//             ))}
//           </StyledSelect>
//         </div>

//         {/* Dynamic Period Dropdown */}
//         <div>
//           <StyledLabel htmlFor="periodSelect">Period:</StyledLabel>
//           <StyledSelect
//             id="periodSelect"
//             value={period}
//             onChange={(event) => setPeriod(event.target.value)}
//           >
//             <option value="">Any Period</option>
//             {periods.map((periodItem) => (
//               <option key={periodItem} value={periodItem}>
//                 {periodItem}
//               </option>
//             ))}
//           </StyledSelect>
//         </div>

//         <div>
//           <StyledButton type="submit">Search</StyledButton>
//         </div>
//       </StyledForm>
//     </FormContainer>
//   );
// }

