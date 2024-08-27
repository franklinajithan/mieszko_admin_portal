import React from "react";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark } from "react-icons/fi";
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

const buttonClasses = "flex items-center text-gray-600 hover:text-gray-800";

export default function HeaderComponents({
    title,
    searchIcon,
    newIcon,
    deleteIcon,
    downloadIcon,
    bookmarkIcon,
    settingIcon,
    filterIcon,
    icon: Icon
}: HeaderComponentsProps) {
    return (
        <header className="flex items-center justify-between bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-2 shadow-md border-b-4 border-custom-red">
            <div className="flex items-center">
                <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-2 rounded-full">
                    <Icon className="text-white text-base" aria-label="Main Icon" />
                </div>
                <h2 className="text-lg font-bold m-0 pl-2 text-white">{title}</h2>
            </div>
            <div className="flex items-center space-x-4">
                {searchIcon && (
                    <button className={buttonClasses}>
                        <FaSearch className="mr-1" />
                        <span>Search</span>
                    </button>
                )}
                {newIcon && (
                    <button className={buttonClasses}>
                        <FaPlus className="mr-1" />
                        <span>New</span>
                    </button>
                )}
                {deleteIcon && (
                    <button className={buttonClasses}>
                        <FaTrash className="mr-1" />
                        <span>Delete</span>
                    </button>
                )}
                {downloadIcon && (
                    <button className={buttonClasses}>
                        <FiDownload className="mr-1" />
                        <span>Download</span>
                    </button>
                )}
                {bookmarkIcon && (
                    <button className={buttonClasses}>
                        <FiBookmark className="mr-1" />
                        <span>Bookmark</span>
                    </button>
                )}
                {settingIcon && (
                    <button className={buttonClasses}>
                        <FiSettings className="mr-1" />
                        <span>Settings</span>
                    </button>
                )}
                {filterIcon && (
                    <button className={buttonClasses}>
                        <FiFilter className="mr-1" />
                        <span>Filter</span>
                    </button>
                )}
            </div>
        </header>
    );
}
