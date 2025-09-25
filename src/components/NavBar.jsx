import { NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="nav">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Table</NavLink>
            <NavLink className="nav-link" to="/charts">Charts</NavLink>
            <NavLink className="nav-link" to="/map">Maps</NavLink>
        </nav>
    )
}

export default NavBar;