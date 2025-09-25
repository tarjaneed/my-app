import "./Search.css";

const Search = ({ search, setSearch, gender, setGender }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email..."
                className="filter-input"
            />

            <select
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="filter-select"
            >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <button className="filter-button" onClick={() => {
                setSearch('');
                setGender('all');
            }}>
                Clear
            </button>
        </div>
    );
};

export default Search;
