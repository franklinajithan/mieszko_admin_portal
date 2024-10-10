import React, { useState } from 'react';

type Category = {
  category_id: number;
  category_name: string;
  level: number;
  children: Category[] | null;
};

type TreeNodeProps = {
  node: Category;
  onSelect: (category: Category) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = () => {
    if (!node.children || node.children.length === 0) {
      onSelect(node);
    }
  };

  return (
    <div className="ml-4 transition-all duration-300 ease-in-out">
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-1 rounded-lg transition-all duration-300 ease-in-out"
        onClick={handleToggle}
      >
        {/* Arrow or placeholder for alignment */}
        {node.children && node.children.length > 0 ? (
          <button
            className={`mr-3 text-gray-500 hover:text-blue-500 transition-transform duration-300 ${
              isOpen ? 'rotate-90' : ''
            }`}
          >
            {isOpen ? (
              <span className="text-xl">▼</span>
            ) : (
              <span className="text-xl">►</span>
            )}
          </button>
        ) : (
          <span className="mr-6 w-4 h-4 inline-block"></span>
        )}

        <span
          onClick={handleSelect}
          className={`font-semibold text-lg transition-colors duration-300 ${
            !node.children || node.children.length === 0
              ? 'text-cyan-700 hover:underline'
              : 'text-gray-800 hover:text-cyan-700'
          }`}
        >
          {node.category_name}
        </span>
      </div>

      {isOpen && node.children && node.children.length > 0 && (
        <div className="pl-8 border-l-2 border-gray-200  space-y-2 transition-all duration-300 ease-in-out">
          {node.children.map((child) => (
            <TreeNode key={child.category_id} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
