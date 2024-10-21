import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";
import ProductForm from "./ProductForm";
import TreeNode from "@/components/ui/treeNode";
import Tree from "@/components/elements/Tree";
import { getCategory, getParentByCategory } from "@/service/category.service";
import ProductCard from "./ProductCard";


type CategoryLevel = 'parent' | 'child' | 'grandchild';

interface Category {
    category_id: number;
    category_name: string;
    level: number;
    parent_details: any
    children: Category[];
    child_id: any
}

interface ParentCategory {
    value: string;
    children: Category[];
}
const ProductByCategory = ({ title, icon }: any) => {
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState<any[]>([]);


    useEffect(() => {
        fetchCategory();
    }, [])


    const fetchCategory = () => {
        const fetch = async () => {
            try {
                const result = await getCategory();

                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }

                setCategories(result.data.data);
                setList(result.data.data.map((category: Category) => ({
                    value: category.category_id.toString(),
                    label: category.category_name,
                    level: category.level,
                    children: category.children
                })));
            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }
    const fetchProducts = async (categoryId: number) => {
        try {
            const response: any = await getParentByCategory(categoryId);

            const products = response.data.data;

            setProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleCategorySelect = (category: any) => {
        setSelectedCategory(category);

        if (!category.children || category.children.length === 0) {

            fetchProducts(category.category_id); // Fetch products only if it's the last-level category
        }
    };
    return (
        <>

            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">

                        <Card.Body>
                            <div className="flex">
                                <div className="w-1/5 border-r">
                                    <h3 className="text-lg font-bold">Categories</h3>
                                    <Tree categories={categories} onSelect={handleCategorySelect} />
                                </div>

                                <div className="w-4/5 ml-4">
                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg font-bold">Products</h3>


                                        <button className="btn-cyan">
                                            New Product
                                        </button>


                                    </div>
                                    {selectedCategory && (
                                        <div>
                                            <h3 className="text-lg font-bold">{selectedCategory.category_name}</h3>
                                            {products.length > 0 ? (
                                                <ul className="space-y-2">
                                                    <div className="grid grid-cols-5 gap-3">
                                                        {products.map((product) => (
                                                            <div>
                                                                <ProductCard product={product} /></div>
                                                        ))}
                                                    </div>

                                                </ul>
                                            ) : (
                                                <p>No products available.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ProductByCategory