import React from 'react';

interface MenuItemProps {
    href: string;
    icon?: React.ReactNode;  // If you're planning to use an icon
    text: string;
    isActive: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, text, isActive, onClick }) => {
    const baseClass = "inline-flex items-center px-4 py-3 rounded-lg w-full transition-all duration-300";
    const activeClass = isActive 
        ? "text-white bg-gradient-to-r from-cyan-500 to-cyan-700 dark:from-cyan-600 dark:to-cyan-800 font-bold" 
        : "text-zinc-500 bg-zinc-50 hover:text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white";

    return (
        <li>
            <a 
                href={href} 
                className={`${baseClass} ${activeClass} ${isActive ? 'active' : ''}`} 
                aria-current={isActive ? "page" : undefined} 
                onClick={onClick}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {text}
            </a>
        </li>
    );
};

export default MenuItem;
