import { Route, Routes } from "react-router-dom"
import ChartsPage from "../pages/ChartsPage"
import MapPage from "../pages/MapPage"
import TablePage from "../pages/TablePage"
import Search from "../components/Search"

const AppRoutes = ({ data, search, setSearch, gender, setGender, sortConfig, setSortConfig }) => {
    return (
        <div className="main-container">
            <Search search={search} setSearch={setSearch} gender={gender} setGender={setGender} />
            <Routes>
                <Route path='/' element={<TablePage data={data} sortConfig={sortConfig} setSortConfig={setSortConfig} />} />
                <Route path='/charts' element={<ChartsPage data={data} />} />
                <Route path='/map' element={<MapPage data={data} />} />
            </Routes>
        </div>
    )
}

export default AppRoutes;