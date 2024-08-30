import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

type Category = {
    category_id: string;
    category_name: string;
    children?: Category[];
};

type TreeNodeProps = {
    node: Category;
    isOpen: boolean;
    onEdit: (node: any) => void;
    showEditButton: boolean; // New prop to control the visibility of the edit button
};

const TreeNode = ({ node, isOpen, onEdit, showEditButton }: TreeNodeProps) => {
    const [isNodeOpen, setIsNodeOpen] = useState(isOpen);

    React.useEffect(() => {
        setIsNodeOpen(isOpen);
    }, [isOpen]);

    const handleToggle = () => {
        setIsNodeOpen(!isNodeOpen);
    };

    const handleEditClick = () => {
        onEdit(node);
    };

    return (
        <div className="ml-4">
            <div className="flex items-center">
                <button
                    onClick={handleToggle}
                    className="flex items-center justify-between w-full p-2 mb-2 text-left border rounded bg-red-50 hover:bg-red-100"
                >
                    <span className="font-medium text-red-900 flex items-center">
                        {node.category_name}
                    </span>
                    {node.children && (
                        <span className="ml-2 text-gray-500">
                            {isNodeOpen ? '-' : '+'}
                        </span>
                    )}
                </button>
                 {/* Conditionally render the edit button based on showEditButton */}
                 {showEditButton && (
                    <div
                        onClick={handleEditClick}
                        className="ml-2 p-1 text-gray-500 hover:text-gray-800"
                        aria-label="Edit"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                )}
            </div>

            {isNodeOpen && node.children && (
                <div className="ml-4 pl-2 border-l-2 border-red-300">
                    {node.children.map((child) => (
                        <TreeNode
                        key={child.category_id}
                        node={child}
                        isOpen={isOpen}
                        onEdit={onEdit}
                        showEditButton={showEditButton} // Pass showEditButton to child nodes
                    />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
