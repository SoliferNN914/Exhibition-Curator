


export default function Form(props){
    const { searchRequest, setSearchRequest, searchedItem, setSearchedItem} = props;

    const handleSumbit = (event) => {
        event.preventDefault();

        setSearchedItem(searchRequest);

        setSearchRequest('');
    };

return (
    <form onSubmit={handleSumbit}>
        <div id='form-container'>
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
        <div id="button-container">
        <button>
        Search
        </button>
        </div>
    </form>
)
};
