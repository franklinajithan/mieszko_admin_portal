import React from 'react';

const MenuItem = ({ href, icon, text, isActive, onClick }: any) => {
    const baseClass = "inline-flex items-center px-4 py-3 rounded-lg w-full transition-all duration-300";
    const activeClass = isActive 
        ? "text-white bg-gradient-to-r from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 font-bold" 
        : "text-gray-500 bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white";

    return (
        <li>
            <a 
                href={href} 
                className={`${baseClass} ${activeClass} ${isActive ? 'active' : ''}`} 
                aria-current={isActive ? "page" : undefined} 
                onClick={onClick}
            >
               
                {text}
            </a>
        </li>
    );
};

export default MenuItem;
