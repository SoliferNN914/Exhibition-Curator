import styled from "styled-components";

const form = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
`;



export default function Form(props){
    const { searchRequest, setSearchRequest, searchedItem, setSearchedItem} = props;

    const handleSumbit = (event) => {
        event.preventDefault();

        setSearchedItem(searchRequest);

        setSearchRequest('');
    };

return (
    <div>
    <form onSubmit={handleSumbit}>
        <div>
            <label htmlFor="showSearch">Search for Art:</label>
            <input
            id="artSearch"
            label="Search"
            variant="outlined"
            value={searchRequest}
            onChange={(event)=> {
                setSearchRequest(event.target.value);
            }}
            />
        </div>
        <div>
        <button>
        Search
        </button>
        </div>
    </form>
    </div>
)
};
