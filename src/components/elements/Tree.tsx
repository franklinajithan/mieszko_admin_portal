import React from 'react';
import TreeNode from './TreeNode';

type Category = {
  category_id: number;
  category_name: string;
  level: number;
  children: Category[] | null;
};

type TreeProps = {
  categories: Category[];
  onSelect: (category: Category) => void;
};

const Tree: React.FC<TreeProps> = ({ categories, onSelect }) => {
  return (
    <div>
      {categories.map((category) => (
        <TreeNode key={category.category_id} node={category} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Tree;
