import React, { useState } from "react";
import { useTheme } from "../../useContextHook/useTheme";
import { useAppContext } from "../../useContextHook/useContextApi";
import Loader from "../../utils/loader";
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Desktop_logo from "../../images/yt_dekstop.png"; // Corrected path
import Mobile_logo from "../../images/youtube_mobile.png";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState();
  const { loading, mobileMenu, setMobleMenu } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const mobileToogleMenu = () => {
    setMobleMenu(!mobileMenu);
  };

  const handleSearchQuery = () => {
    if (searchQuery?.length > 0) {
      navigate(`search/${searchQuery}`);
    }
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={`sticky top-0 z-10 flex flex-row items-center justify-between h-20 shadow-lg px-4 md:px-5 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } text-${isDarkMode ? "white" : "bg-gray-700"}`}
    >
      {loading && <Loader />}
      <div className="flex h-5 items-center">
        <div
          className={`flex md:hidden md:mr-6 cursor-pointer items-start justify-center h-9 w-9 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
          onClick={mobileToogleMenu}
        >
          {mobileMenu ? (
            <CgClose className="text-lg" />
          ) : (
            <SlMenu className="text-lg" />
          )}
        </div>

        <Link to="/" className="flex items-center h-20">
          <img
            src={Desktop_logo}
            alt="yt_desktop_logo"
            className={`hidden md:block h-full object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
          <img
            src={Mobile_logo}
            alt="yt_mobile_logo"
            className={`md:hidden  h-14 object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center group relative">
        <div
          className={`flex px-3 h-10 md:ml-10 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within-pl-0 ${  
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-xl" />
          </div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className={`pl-5 pr-5 text-sm bg-transparent outline-none md:pl-0 w-32 sm:w-44 md:w-64 lg:w-[500px] ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearchQuery();
            }}
            value={searchQuery}
          />
          {searchQuery && (
            <button
              className="absolute right-32 top-1/2 transform -translate-y-1/2"
              onClick={handleClearSearchQuery}
            >
              <CgClose className="text-xl" />
            </button>
          )}
        </div>
        <button
          className={`flex items-center justify-center w-[40px] md:w-[60px] h-10 rounded-r-3xl border border-l-0 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } bg-${isDarkMode ? "bg-gray-700" : " bg-gray-100"}`}
          onClick={handleSearchQuery}
        >
          <IoIosSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
