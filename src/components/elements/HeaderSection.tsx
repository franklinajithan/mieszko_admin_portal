import React, { useState, useEffect, useCallback } from "react";
import {
    FaSearch,
    FaPlus,
    FaTrash,
    FaTimes,
    FaBookmark,
    FaCog,
    FaFilter,
    FaSignOutAlt,
    FaSync,
    FaExpand
} from "react-icons/fa";
import { FiDownload, FiBookmark, FiSettings, FiFilter } from "react-icons/fi";
import { IconType } from 'react-icons';

type HeaderComponentsProps = {
    title: string;
    searchIcon?: boolean;
    newIcon?: boolean;
    deleteIcon?: boolean;
    downloadIcon?: boolean;
    bookmarkIcon?: boolean;
    settingIcon?: boolean;
    filterIcon?: boolean;
    icon: IconType;
};

const buttonClasses = "flex items-center text-white hover:text-gray-200";

export default function HeaderComponents({
    title,
    searchIcon = true,
    newIcon = true,
    deleteIcon = true,
    downloadIcon = true,
    bookmarkIcon = true,
    settingIcon = true,
    filterIcon = true,
    icon: Icon
}: HeaderComponentsProps) {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [language, setLanguage] = useState("English");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isUserActive, setIsUserActive] = useState(true);

    const handleSearch = useCallback(() => {
      //  console.log("Searching for:", searchQuery);
    }, [searchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
    };

    const handleLogout = () => {
    //    console.log("User logged out");
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
   //     console.log("Language changed to:", newLanguage);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery && activePanel === "search") {
                handleSearch();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, handleSearch, activePanel]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && activePanel === "search") {
            handleSearch();
        }
    };

    return (
        <header className="flex items-center justify-between bg-gradient-to-br from-cyan-400 via-cyan-700 to-cyan-400 p-2 shadow-md border-b-4 border-custom-cyan">
            <div className="flex items-center">
                <div className="bg-gradient-to-r from-cyan-300 via-cyan-500 to-sky-500 p-2 rounded-full">
                    <Icon className="text-white text-base" aria-label="Main Icon" />
                </div>
                <h2 className="text-lg font-bold m-0 pl-2 text-white">{title}</h2>
            </div>
            <div className="flex items-center space-x-4">
                {/* Search Panel */}
                {searchIcon && activePanel !== "search" && (
                    <button className={buttonClasses} onClick={() => setActivePanel("search")}>
                        <FaSearch className="text-white mr-1" />
                        <span>Search</span>
                    </button>
                )}
                {activePanel === "search" && (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="p-1 text-black rounded focus:outline-none"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="btn-cyan flex items-center px-2 py-1 rounded hover:bg-blue-600" onClick={handleSearch}>
                            <FaSearch className="mr-1" />
                            <span>Go</span>
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => setActivePanel(null)}>
                            <FaTimes />
                        </button>
                    </div>
                )}

                {/* Language Selector */}
                <div className="flex items-center">
                    <label htmlFor="language-select" className="text-white mr-2">Language:</label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="text-black rounded focus:outline-none"
                    >
                        {["English", "Spanish", "French", "German"].map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>

                {/* New Button */}
                {newIcon && (
                    <button className={buttonClasses} onClick={() => console.log("New action triggered")
                        
                    }>
                        <FaPlus className="text-white mr-1" />
                        <span>New</span>
                    </button>
                )}

                {/* Other icons like delete, download, bookmark, etc. */}

                {/* Logout Button */}
                <button className={buttonClasses} onClick={handleLogout}>
                    <FaSignOutAlt className="text-white mr-1" />
                    <span>Logout</span>
                </button>

                {/* Refresh Button */}
                <button className={buttonClasses} onClick={handleRefresh}>
                    <FaSync className="text-white mr-1" />
                    <span>Refresh</span>
                </button>

                {/* Full-Screen Toggle */}
                <button className={buttonClasses} onClick={toggleFullScreen}>
                    <FaExpand className="text-white mr-1" />
                    <span>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</span>
                </button>
            </div>
        </header>
    );
}
