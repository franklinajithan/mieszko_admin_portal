import React from "react";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark } from "react-icons/fi";
import { IconType } from 'react-icons';

type HeaderComponentsProps = {
    showList: {
        title: string;
        search: boolean;
        new: boolean;
        delete: boolean;
        download: boolean;
        bookmark: boolean;
        setting: boolean;
        filter: boolean;
    },
    icon: IconType;
};

export default function HeaderComponents({ showList, icon: Icon }: HeaderComponentsProps) {

    return (
        <header className="flex items-center justify-between bg-white p-2 shadow-md border-b-4 border-custom-red">
            <div className="flex items-center space-x-2">
                <div className="bg-custom-red p-3 rounded-full">
                    <Icon className="text-white text-xl" aria-label="Shield Icon" />
                </div>
                <h2 className="text-lg font-semibold">{showList.title}</h2>
            </div>
            <div className="flex items-center space-x-4">
                {showList.search && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FaSearch className="mr-1" />
                    <span>Search</span>
                </button>}
                {showList.new && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FaPlus className="mr-1" />
                    <span>New</span>
                </button>}
                {showList.delete && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FaTrash className="mr-1" />
                    <span>Delete</span>
                </button>}
                {showList.download && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FiDownload />
                    <span>Download</span>
                </button>}
                {showList.bookmark && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FiBookmark />
                    <span>Bookmark</span>
                </button>}
                {showList.setting && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FiSettings />
                    <span> Settings</span>
                </button>}
                {showList.filter && <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <FiFilter />
                    <span>Filter</span>
                </button>}
            </div>
        </header>
    );
}
