import {  NavLink} from "react-router-dom";

function Header() {
    return (
        <nav className="flex items-center justify-between bg-gray-800 p-6">
            <NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink>
            <NavLink to="/about" className="text-white hover:text-gray-300 ml-6">About</NavLink>
        </nav>
    );
}

export default Header;