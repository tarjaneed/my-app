import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar';
import { fetchUsers } from './api/userService';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search / filter / sort
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // you can change this

  useEffect(() => {
    const skip = (currentPage - 1) * rowsPerPage;

    setLoading(true);
    fetchUsers({
      limit: rowsPerPage,
      skip,
      search,
      gender,
      sortKey: sortConfig.key,
      sortDir: sortConfig.direction,
    })
      .then((response) => {
        setData(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [search, gender, sortConfig, currentPage]); // re-fetch on changes

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1); // reset to page 1 on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 className="error-msg">{error}</h1>;

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes
        data={data}
        gender={gender}
        setGender={setGender}
        search={searchInput}
        setSearch={setSearchInput}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </BrowserRouter>
  );
}

export default App;




const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>Page {currentPage}</span>

      <button onClick={() => setCurrentPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;



import Pagination from "../components/Pagination";

const TablePage = ({ data, currentPage, setCurrentPage }) => {
  return (
    <div>
      <h1>Table View</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.address.coordinates.lat}</td>
              <td>{item.address.coordinates.lng}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Pagination controls */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default TablePage;
