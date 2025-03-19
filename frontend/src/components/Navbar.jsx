import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/Theme";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlices";

function Navbar() {
  const { theme, themeToggle } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const { login, userData } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 px-3 sm:px-10 py-3 w-screen flex justify-between items-center">
      <p
        className={`font-play font-bold ${
          theme === "light" ? "text-purple" : "text-blue"
        } text-sm sm:text-xl`}
      >
        Remember
      </p>
      <div className="flex items-center gap-1 sm:gap-3">
        <div className="check">
          <input onChange={themeToggle} id="check" type="checkbox" />
          <label htmlFor="check"></label>
        </div>

        {login ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-white/60 hover:scale-105 transition-all text-sm sm:text-[1rem] cursor-pointer px-2 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-2xl"
            >
              {userData?.name}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white/50 overflow-hidden shadow-lg rounded-lg">
                <p
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    dispatch(logoutUser());
                    setIsDropdownOpen(false);
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-white/60 hover:scale-105 transition-all text-sm sm:text-[1rem] cursor-pointer px-2 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-2xl">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white/60 hover:scale-105 transition-all text-sm sm:text-[1rem] cursor-pointer px-2 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-2xl">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
