import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FiList } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Header from '../../layouts/Header';
import HeaderComponents from '@/elements/HeaderSection';
import CardTitle from '@/elements/CardTitle';
import InputField from '@/elements/InputField';
import SelectField from '@/elements/SelectField';
import { category } from '../../data/constants';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import { categoryFormSchema } from '@/lib/utils';
import CheckboxField from '@/elements/CheckboxField';
import LabelField from '@/elements/LabelField';
import TreeView from '../ui/treeView';
import { addCategory, addCategoryById, getCategory, updateCategoryById } from '@/service/category.service';
import { debug } from 'console';

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

const Category = () => {

    const { t } = useTranslation('global');
    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
    const [isLoading, setIsLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('Category Name');
    const [categoryLevel, setCategoryLevel] = useState<CategoryLevel>('parent');
    const [isPLUProduct, setIsPLUProduct] = useState(false);
    const [input, setInput] = useState<string>('');
    const [categories, setCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState<any[]>([]);
    const [childCategories, setChildCategories] = useState<any[]>([]);
    const [list, setList] = useState<any[]>([]);
    const [clearForm, setClearForm] = useState(false);
    const [editCategory, setEditCategory] = useState<any | null>(null);
    const [editMode, setEditMode] = useState(false);
    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            categoryName: '',
            categoryLevel: undefined,
            childCategory: undefined,
            parentCategory: undefined,
            isPlu: undefined,
            isAssignItem: undefined,
            clearForm: false,
            translation: "",

        },
    });



    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;





    function extractLevelCategories(categories: Category[], level: number): Category[] {
        const levelCategories: Category[] = [];

        for (const category of categories) {
            if (category.level === level) {
                levelCategories.push(category);
            } else if (category.children.length > 0) {
                levelCategories.push(...extractLevelCategories(category.children, level));
            }
        }

        return levelCategories;
    }


    const fetchCategory = () => {
        const fetchUser = async () => {
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

        fetchUser();
    }

    useEffect(() => {


        fetchCategory()
    }, []);




    const onSubmit = async (values: any) => {

        const fetchUser = async () => {

            setIsLoading(true);
            if (values.parentCategory === undefined) {
                values.parentCategory = 0;
            }
            let level = 0;
            let parentId: any = 0;
            if (categoryLevel == 'parent') { level = 1, parentId = 0 }
            if (categoryLevel == 'child') { level = 2, parentId = values.parentCategory }
            if (categoryLevel == 'grandchild') { level = 3, parentId = values.childCategory }


            let isPLU;
            const formData = new FormData();
            formData.append('categoryName', values.categoryName || '');
            formData.append('parentId', parentId || 0);
            formData.append('canAssignItem', 'false');
            formData.append('translatedName', "test");
            formData.append('level', level.toString());
            try {
                let result :any;
                if(editMode==true){
                    result = await addCategory(formData);
                }else{
                   // result = await updateCategoryById(formData);
                }
               
                fetchCategory()
                if (values.clearForm) {
                    reset();
                    setParentCategories([]);
                    setChildCategories([]);
                }

                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }



            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    };


    const handleSelectChange = (value: string) => {
        const level = value as CategoryLevel;

        const categoryNames: Record<CategoryLevel, string> = {
            parent: 'Parent Category Name',
            child: 'Child Category Name',
            grandchild: 'Grand Child Category Name'
        };

        setCategoryLevel(level);
        setCategoryName(categoryNames[level]);

        if (level === 'child' || level === 'grandchild') {
            setParentCategories(extractLevelCategories(list, 1));
        }
    };

    const onChangeParent = (e: string) => {
        const selectedParent = parentCategories.find((element) => element.value === e);

        if (selectedParent) {
            setChildCategories(selectedParent.children.map((category: any) => ({
                value: category.category_id.toString(),
                label: category.category_name,
                level: category.level,
                children: category.children
            })));
        } else {
            setChildCategories([]);
        }
    };

    const handlePluCheckbox = (e: boolean) => setIsPLUProduct(e);

    const handleAssignCheckbox = (e: boolean) => {
        // Implement as needed
    };
    const handleFormClearCheckbox = (e: boolean) => {
        setClearForm(e);
    };
    // const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value.replace(/\D/g, '').slice(0, 2);
    //     setInput(value);
    // };

    const onEditTree = (node: any) => {
        const fetchUser = async () => {
            try {
                const result = await addCategoryById(node.category_id);

                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }

                let editCategory = result.data.data;
                setEditCategory(editCategory)

                setCategoryLevel(getCategoryLevel(editCategory.category_level));


                if (editCategory.category_level === 2) {
                    setParentCategories(extractLevelCategories(list, 1));
                }
                else if (editCategory.category_level === 3) {
                    setParentCategories(extractLevelCategories(list, 1));
                    //  setChildCategories(extractLevelCategories(list, 2));
                }





            } catch (e) {
                console.error(e);
            }
        };

        fetchUser();
    };




    useEffect(() => {

        if (editCategory) {

            let parentId: any
            let childId: any
            if (editCategory.category_level == 1) {
                parentId = undefined
            } else if (editCategory.category_level == 2) {
                parentId = editCategory.parent_id.toString()
            } else if (editCategory.category_level == 3) {
                let childList: any = categories.find((element: any) => element.category_id == editCategory.grandparent_id);

                setChildCategories(childList.children.map((category: any) => ({
                    value: category.category_id.toString(),
                    label: category.category_name,
                    level: category.level,
                    children: category.children
                })));
                parentId = editCategory.grandparent_id.toString();
                childId = editCategory.parent_id.toString();
            }

            const formValues = {
                categoryName: editCategory.category_name,
                categoryLevel: getCategoryLevel(editCategory.category_level),
                parentCategory: parentId || undefined,
                childCategory: childId || undefined,
                isPlu: editCategory.is_plu || false,
                isAssignItem: editCategory.can_assign_item || false,
                translation: editCategory.translated_name || '',
                clearForm: false,
            };
            setTimeout(() => {

            }, 3000);


            reset(formValues);
        }
    }, [parentCategories && editCategory])


    useEffect(() => {
        if (editCategory) {
            setValue('childCategory', editCategory.parent_id.toString());

        }
    }, [childCategories])



    const getCategoryLevel = (level: number): CategoryLevel => {
        switch (level) {
            case 1:
                return 'parent';
            case 2:
                return 'child';
            case 3:
                return 'grandchild';
            default:
                return 'parent';
        }
    };
    const topEditButton = (e: any) => {


        setEditMode(e)
    }



    const checkInvalidFields = () => {

        const { errors } = formState;

        if (Object.keys(errors).length > 0) {
            console.log('Invalid fields:', errors);

            // Iterate over errors object to get detailed information
            Object.keys(errors).forEach((fieldName) => {
                const error = errors[fieldName as keyof typeof errors];
                if (error) {
                    console.log(`Field: ${fieldName}, Error: ${error.message}`);
                }
            });
        } else {
            console.log('All fields are valid!');
        }
    };


    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">
                <HeaderComponents icon={icon} title={title} />
                    <Card className="card-one mt-2">
                        <CardTitle title="Add Category" />
                        <Card.Body>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <div className="grid grid-cols-2 gap-4">

                                                <div>
                                                    <SelectField
                                                        control={form.control}
                                                        label="Category Level"
                                                        name="categoryLevel"
                                                        options={category}
                                                        onChange={handleSelectChange}
                                                    />
                                                    <div className="mt-2">
                                                        {categoryLevel === 'child' && (
                                                            <CheckboxField
                                                                control={form.control}
                                                                id="isAssignItem"
                                                                label="Can assign item"
                                                                name="isAssignItem"
                                                                onChange={handleAssignCheckbox}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <InputField
                                                        control={form.control}
                                                        label={categoryName}
                                                        type="text"
                                                        name="categoryName"
                                                    />
                                                    <div className="mt-2">
                                                        <CheckboxField
                                                            control={form.control}
                                                            id="isPlu"
                                                            label="Is this a PLU product?"
                                                            name="isPlu"
                                                            onChange={handlePluCheckbox}
                                                        />
                                                    </div>
                                                </div>
                                                {categoryLevel === 'child' && (
                                                    <SelectField
                                                        control={form.control}
                                                        label="Parent Category"
                                                        name="parentCategory"
                                                        options={parentCategories}
                                                        onChange={onChangeParent}
                                                    />
                                                )}
                                                {categoryLevel === 'grandchild' && (
                                                    <>
                                                        <SelectField
                                                            control={form.control}
                                                            label="Parent Category"
                                                            name="parentCategory"
                                                            options={parentCategories}
                                                            onChange={onChangeParent}
                                                        />
                                                        <SelectField
                                                            control={form.control}
                                                            label="Child Category"
                                                            name="childCategory"
                                                            options={childCategories}
                                                        />
                                                    </>
                                                )}
                                                {isPLUProduct && (



                                                    <InputField
                                                        control={form.control}
                                                        label="Enter first 2 digits of PLU"
                                                        type="text"
                                                        name="pluCode"
                                                    />

                                                )}

                                                <InputField
                                                    control={form.control}
                                                    label="Translation"
                                                    type="text"
                                                    name="translation"
                                                />
                                            </div>
                                            <hr className="border-t border-gray-300" />
                                            <div className="flex justify-between mt-2 pr-4">

                                                <div className="flex items-center space-x-4">
                                                    <CheckboxField
                                                        control={form.control}
                                                        id="clearForm"
                                                        label="Reset form after submission"
                                                        name="clearForm"
                                                        onChange={handleFormClearCheckbox}
                                                    />
                                                </div>


                                                <div className="flex items-center space-x-4">
                                                    <Button type="submit" disabled={isLoading} className="btn-red">
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                            </>
                                                        ) : (
                                                            editMode ? 'Update' : 'Submit'
                                                        )}
                                                    </Button>

                                                    {/* Button to trigger form validity check and log invalid fields */}
                                                    <button type="button" onClick={checkInvalidFields}>
                                                        Check Invalid Fields
                                                    </button>

                                                    
                                                    {/* {Object.keys(formState.errors).map((fieldName) => (
                                                        <p key={fieldName}>{fieldName} -{formState?.errors[fieldName]?.message}</p>
                                                    ))} */}
                                                </div>
                                            </div>


                                        </form>
                                    </Form>
                                </div>
                                <div>
                                    {!isLoading && <TreeView category={categories} onEditTree={onEditTree} topEditButton={topEditButton} />}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Category;
