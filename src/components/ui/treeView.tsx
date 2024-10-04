// TreeView.tsx
import React, { useState } from 'react';
import TreeNode from './treeNode'; // Adjust import as necessary
import { Switch } from '@mui/material';
import { FormLabel } from 'react-bootstrap';
import LabelField from '@/components/elements/LabelField';
import IOSSwitch from '@/components/elements/toggleTheme';


type Category = {
    category_id: string;
    category_name: string;
    children?: Category[];
};

type TreeViewProps = {
    category: Category[];
    onEditTree: (node: any) => void; // Define the type for onEditTree prop
    topEditButton: (showEditButton: boolean) => void;
};

const TreeView = ({ category, onEditTree, topEditButton }: TreeViewProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [show, setShow] = useState(true);
    const [showEditButton, setShowEditButton] = useState(false); // State to manage the visibility of the edit button

    const handleEdit = (node: any) => {
        onEditTree(node);
    };

    const toggleAll = (expand: boolean) => {
        setIsExpanded(expand);
    };

    const toggleAllShow = () => {
        toggleAll(false);
        setShow(false);
        setTimeout(() => {
            setShow(true);
        }, 1);
    };

    // Toggle function for the switch to show/hide the edit button
    const toggleSwitch = () => {
        setShowEditButton(!showEditButton);
        topEditButton(!showEditButton)
    };

    return (
        <div className="bg-white">
            <div className="flex justify-start items-center mb-3 ml-4">
                <div className="btn-toggle-cyan ml-1">
                    <div className="mr-2 ml-2">
                        <span>Edit Tree</span>
                    </div>
                    <IOSSwitch
                        checked={showEditButton}
                        onChange={toggleSwitch}
                        className="ml-2"
                    />
                </div>
                <button onClick={() => toggleAll(true)} className="ml-1 btn-cyan">
                    Expand All
                </button>
                <button onClick={() => toggleAllShow()} className="ml-1 btn-cyan">
                    Collapse All
                </button>



            </div>

            {show && (
                <>
                    {category.map((category: Category) => (
                        <TreeNode
                            key={category.category_id}
                            node={category}
                            isOpen={isExpanded}
                            onEdit={handleEdit}
                            showEditButton={showEditButton} // Pass showEditButton state to TreeNode
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default TreeView;
