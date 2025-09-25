import { useEffect, useMemo, useState } from 'react';
import {
    BrowserRouter,
} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar';
import { fetchUsers } from './api/userService';
import './App.css'
import logo from './assets/react.svg';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search by keyword
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    // Search by gender
    const [gender, setGender] = useState('all');

    // Sort
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Fetch data from API
    useEffect(() => {
        fetchUsers()
            .then((response) => {
                setData(response.data.users);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })
    }, [])

    // Debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(searchInput);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchInput])

    // Apply filters
    const sortedData = useMemo(() => {
        const query = search.toLowerCase();
        const filteredResult = data.filter(item => {
            const matchesSearch = `${item.firstName} ${item.lastName}`.toLowerCase().includes(query) || item.email.toLowerCase().includes(query);
            const matchesGender = gender === 'all' || item.gender === gender;
            return matchesSearch && matchesGender;
        });

        let sortedResult = [...filteredResult];
        if (sortConfig.key !== null) {
            sortedResult.sort((a, b) => {
                let A = a[sortConfig.key];
                let B = b[sortConfig.key];

                if (sortConfig.key === 'name') {
                    A = `${a.firstName} ${a.lastName}`.toLowerCase()
                    B = `${b.firstName} ${b.lastName}`.toLowerCase()
                }

                if (A < B) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (A > B) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return sortedResult;
    }, [data, search, gender, sortConfig]);

    if (loading) {
        return (
            <img src={logo} height={150} width={150} />
        )
    }

    if (error) {
        return (
            <h1 className="error-msg">{error}</h1>
        )
    }

    return (
        <BrowserRouter>
            <NavBar />

            {/* I separated routes into their own file because in production apps, routing often grows complex — 
            with private routes, role-based routes, or nested routes. 
            Centralizing them keeps App.jsx clean and improves maintainability */}
            <AppRoutes
                data={sortedData}
                gender={gender}
                setGender={setGender}
                search={searchInput}
                setSearch={setSearchInput}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
            />
        </BrowserRouter>
    )
}

export default App;
