import { FaReddit, FaUser, FaPlus } from "react-icons/fa";
import {
  SignInButton,
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import CreateDropdown from "./CreateDropdown";
import SearchBar from "./SearchBar";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close the dropdown when the route changes
  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <FaReddit className="reddit-icon" />
            <span className="site-name">Reddit</span>
          </div>
        </Link>

        < SearchBar />

        <div className="nav-actions">
          <SignedOut>
            <SignInButton mode="redirect">
              <button className="sign-in-button">Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="dropdown-container">
              <button
                ref={buttonRef}
                className="icon-button"
                onClick={() => setShowDropdown((v) => !v)}
                aria-expanded={showDropdown}
                aria-haspopup="menu"
                title="Create"
              >
                <FaPlus />
              </button>

              {showDropdown && (
                <CreateDropdown
                  isOpen={showDropdown}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>

            <button
              className="icon-button"
              onClick={() => user?.username && navigate(`/u/${user.username}`)}
              title="View Profile"
            >
              <FaUser />
            </button>

            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;