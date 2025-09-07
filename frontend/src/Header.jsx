import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '/assets/logo-icon.png';
import logoText from '/assets/logo-text.png';
import globeImg from '/assets/globe.png';
import dropdownIcon from '/assets/dropdown-icon.png';
import logoWhite from '/assets/logo-white.png';

import './Header.css';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const langRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event) {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo-frame">
                    <img src={logoWhite} alt="Logo White" className="logo-white" style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }} />
                </div>
                <ul className="navbar-links">
                    <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Əsas Səhifə</Link></li>
                    <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>Haqqımızda</Link></li>
                    <li><Link to="/products" className={location.pathname === "/products" || location.pathname.startsWith("/product/") ? "active" : ""}>Məhsullar</Link></li>
                    <li><Link to="/services" className={location.pathname === "/services" || location.pathname.startsWith("/services/") ? "active" : ""}>Xidmətlər</Link></li>
                    <li><Link to="/equipment" className={location.pathname === "/equipment" || location.pathname.startsWith("/equipment/") ? "active" : ""}>Avadanlıqlar</Link></li>
                    <li><a href="#">Bloq</a></li>
                    <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Əlaqə</Link></li>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-lang" ref={langRef} tabIndex={0} onClick={() => setDropdownOpen((open) => !open)}>
                        <img src={globeImg} alt="Language Globe" className="lang-globe" width="19.25" height="19.25" />
                        <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" width="21" height="21" />
                        {dropdownOpen && (
                            <div className="lang-dropdown">
                                <div className="lang-option">az</div>
                                <div className="lang-option">eng</div>
                                <div className="lang-option">rus</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
