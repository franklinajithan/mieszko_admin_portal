import CheckboxField from '@/components/elements/CheckboxField'
import InputField from '@/components/elements/InputField'
import React, { useEffect, useState } from 'react'

import MenuItem from '@/components/elements/MenuItem'
import { Form } from "@/components/ui/form";
import { productFormSchema } from '@/lib/utils'

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarInput } from '@/components/elements/CalendarInput'
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { z } from 'zod'
import { addProduct, getItemDetail, uploadProductImage } from '@/service/product.service'
import IOSSwitch from '@/components/elements/toggleTheme'
import ImageUploader from '@/components/elements/ImageUploader'
import { Card } from '@mui/material';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductDetails } from '@/interface/productInterfaces';
import { countries, ModeType, reorderingPolicies, reorderLevelType, reschedulePeriods } from '@/data/enum';
import SelectField from '@/components/elements/SelectField';
import { getCategory } from '@/service/category.service';
import { uploadLabelImage } from '@/service/promotion.service';
import { imageUrl } from '@/_config';
import { getBrand } from '@/service/brand.service';

const ProductForm = ({ id, type }: any) => {
    const [activeItem, setActiveItem] = useState("Product");
    const [parentCategories, setParentCategories] = useState<any[]>([]);
    const [childCategories, setChildCategories] = useState<any[]>([]);
    const [grandchildCategories, setGrandChildCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedParent, setSelectedParent] = useState(null);
    const [brandList, setBrandList] = useState([]);
    const { toast } = useToast();
    const [showPromotionButton, setShowPromotionButton] = useState(false);
    const [showActiveButton, setShowActiveButton] = useState(false);
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState<any[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const imgUrl: any = imageUrl
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize with null



    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            id: 0,
            itemCode: "",
            itemName: "",
            translatedName: "",
            description: "",
            labelName: "",
            invoiceName: "",
            tillMessage: "",
            ingredients: "",
            translatedIngredients: "",
            allergicDetails: "",
            translatedAllergicDetails: "",
            item_image: "",
            uom: "",
            retailUom: "",
            wastagePercentage: "0.00000",
            itemType: "",
            minOrderQty: "0.00000",
            maxOrderQty: "0.00000",
            leadTime: "0",
            reorderLevel: "0.00000",
            reorderLevelType: "",
            safetyStock: "0.00000",
            shelfLife: 0,
            shelfLifeType: "",
            countryOfOrigin: "",
            vatId: null,
            brandId: null,
            parentCategory: "",
            childCategory: "",
            categoryId: "",
            item_details: {
                tags: null,
                isPluCoded: false,
                isSeasoned: false,
                isStoreUse: false,
                isWeighted: false,
                hasLeadTime: false,
                canBeInPromo: false,
                canSplitSell: false,
                canStockTake: false,
                isOutOfStock: false,
                needPreOrder: false,
                splitSellQty: null,
                hasBoxBarcode: false,
                hasLinkedItem: false,
                isPriceMarked: false,
                minSellingQty: null,
                isDiscontinued: false,
                isDiscountable: false,
                isStoreVisible: false,
                hasOuterBarcode: false,
                isAgeRestricted: false,
                canOrderInPallet: false,
                hasMinSellingQty: false,
                hasPalletBarcode: false,
                canPurchaseLocally: false,
                isStoreTransferable: false,
                isConsideredForPurchasePlan: false
            },
            // linked_items: [],
            // item_barcodes: []
        }
    });

    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;
    const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
        setIsLoading(true);
        try {

            let result: any
            if (type == ModeType.Add) {
                result = await addProduct(data);
            } else {
                // result = await updateProduct(data);
            }


            if (result.status === 201) {
              

                if (selectedImageFile !== null) {
                    uploadImage(result.data.data);
                }

                toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
            } else {
                toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
            }
        } catch (e: any) {
            toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };


    useEffect(() => {
        fetchCategory();
        fetchBrand();
        const fetch = async () => {
            try {


                const result = await getItemDetail(id);

                setProductDetails(result.data.data)

                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }

               



            } catch (e) {
                console.error(e);
            }
        };
        if (type == ModeType.Edit) {
            fetch();
        }

    }, [])


    function extractLevelCategories(categories: any[], level: number): any[] {
        const levelCategories: any[] = [];

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
        const fetchData = async () => {
            try {
                const result = await getCategory();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }
                setParentCategories(result.data.data.map((category: any) => ({
                    value: category.category_id.toString(),
                    label: category.category_name,
                    level: category.level,
                    children: category.children
                })));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }



    const fetchBrand = () => {
        const fetchData = async () => {
            try {
                const result = await getBrand();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                };
                setBrandList(result.data.data.map((brand: any) => ({
                    value: brand.id.toString(),
                    label: brand.brandName, 
                })));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }



    useEffect(() => {
        if (productDetails != null) {
            // const formValues = {
            //     itemName: productDetails.itemName || '',
            //     englishName: productDetails.englishName || '',
            //     itemCode: productDetails.itemCode || '',
            //     description: productDetails.description || '',
            //     labelName: productDetails.labelName || '',
            //     invoiceName: productDetails.invoiceName || '',
            //     tillMessage: productDetails.tillMessage || '',
            //     ingredients: productDetails.ingredients || '',
            //     translatedIngredients: productDetails.translatedIngredients || '',
            //     allergicDetails: productDetails.allergicDetails || '',
            //     translatedAllergicDetails: productDetails.translatedAllergicDetails || '',
            //     item_image: productDetails.item_image || '',
            //     uom: productDetails.uom || '',
            //     retailUom: productDetails.retailUom || '',
            //     wastagePercentage: productDetails.wastagePercentage || '',
            //     itemType: productDetails.itemType || '',
            //     minOrderQty: productDetails.minOrderQty || '',
            //     maxOrderQty: productDetails.maxOrderQty || '',
            //     leadTime: productDetails.leadTime || '',
            //     reorderLevel: productDetails.reorderLevel || '',
            //     reorderLevelType: productDetails.reorderLevelType || '',
            //     safetyStock: productDetails.safetyStock || '',
            //     shelfLife: productDetails.shelfLife || 0, // assuming shelfLife is a number
            //     shelfLifeType: productDetails.shelfLifeType || '',
            //     countryOfOrigin: productDetails.countryOfOrigin || '',
            //     vat: {
            //         vatCode: productDetails.vat?.vatCode || '',
            //         vatRate: productDetails.vat?.vatRate || 0, // assuming vatRate is a number
            //         countryCode: productDetails.vat?.countryCode || null,
            //         description: productDetails.vat?.description || null,
            //         effectiveTo: productDetails.vat?.effectiveTo || null,
            //         effectiveFrom: productDetails.vat?.effectiveFrom || '',
            //     },
            //     brand: {
            //         image: productDetails.brand?.image || '',
            //         website: productDetails.brand?.website || '',
            //         brandName: productDetails.brand?.brandName || '',
            //         description: productDetails.brand?.description || '',
            //     },
            //     category: {
            //         image: productDetails.category?.image || '',
            //         isPLU: productDetails.category?.isPLU || false, // assuming isPLU is a boolean
            //         pluCode: productDetails.category?.pluCode || '',
            //         parentId: productDetails.category?.parentId || 0, // assuming parentId is a number
            //         categoryName: productDetails.category?.categoryName || '',
            //         translatedName: productDetails.category?.translatedName || '',
            //     },
            //     item_details: {
            //         tags: productDetails.item_details?.tags || ['', ''],
            //         isPluCoded: productDetails.item_details?.isPluCoded || false,
            //         isSeasoned: productDetails.item_details?.isSeasoned || false,
            //         isStoreUse: productDetails.item_details?.isStoreUse || false,
            //         isWeighted: productDetails.item_details?.isWeighted || false,
            //         hasLeadTime: productDetails.item_details?.hasLeadTime || false,
            //         canBeInPromo: productDetails.item_details?.canBeInPromo || false,
            //         canSplitSell: productDetails.item_details?.canSplitSell || false,
            //         canStockTake: productDetails.item_details?.canStockTake || false,
            //         isOutOfStock: productDetails.item_details?.isOutOfStock || false,
            //         needPreOrder: productDetails.item_details?.needPreOrder || false,
            //         splitSellQty: productDetails.item_details?.splitSellQty || 0, // assuming it's a number
            //         hasBoxBarcode: productDetails.item_details?.hasBoxBarcode || false,
            //         hasLinkedItem: productDetails.item_details?.hasLinkedItem || false,
            //         isPriceMarked: productDetails.item_details?.isPriceMarked || false,
            //         minSellingQty: productDetails.item_details?.minSellingQty || 0, // assuming it's a number
            //         isDiscontinued: productDetails.item_details?.isDiscontinued || false,
            //         isDiscountable: productDetails.item_details?.isDiscountable || false,
            //         isStoreVisible: productDetails.item_details?.isStoreVisible || false,
            //         hasOuterBarcode: productDetails.item_details?.hasOuterBarcode || false,
            //         isAgeRestricted: productDetails.item_details?.isAgeRestricted || false,
            //         canOrderInPallet: productDetails.item_details?.canOrderInPallet || false,
            //         hasMinSellingQty: productDetails.item_details?.hasMinSellingQty || false,
            //         hasPalletBarcode: productDetails.item_details?.hasPalletBarcode || false,
            //         canPurchaseLocally: productDetails.item_details?.canPurchaseLocally || false,
            //         isStoreTransferable: productDetails.item_details?.isStoreTransferable || false,
            //         isConsideredForPurchasePlan: productDetails.item_details?.isConsideredForPurchasePlan || false,
            //     },
            // };

            
            setImagePreview(`${imageUrl + 'items/'}${productDetails.item_image}`)
            reset(productDetails); // Assuming reset is your form reset function
        }
    }, [productDetails]);

    const handleMenuItemClick = (item: any) => {
        setActiveItem(item);
    };
    const toggleSwitchPromotion = () => {
        setShowPromotionButton(!showPromotionButton);

    };
    const toggleSwitchStatus = () => {
        setShowActiveButton(!showActiveButton);

    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0];
        setSelectedImageFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {

                if (typeof reader.result === 'string' || reader.result === null) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const uploadImage = async (id: any) => {
        try {

            const itemCode = form.getValues("itemCode");
            const formData = new FormData();
            // formData.append('imageName', id || '');

            formData.append('imageFor', 'items');
            formData.append('id', id || '');
            formData.append('image', selectedImageFile || '');
            const result = await uploadProductImage(formData);
            if (result.status === 200) {




            } else {
                console.error(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            //   setIsLoading(false);
        }
    };

    // uploadImage();


    const handleImageClick = () => {
        setSelectedImage(imagePreview);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedImage(null);
    };

    const handleParentCategoryChange = (e: any) => {
        setSelectedParent(e)
        let children = parentCategories.find((x: any) => x.value == e).children
        setChildCategories(children.map((category: any) => ({
            value: category.category_id.toString(),
            label: category.category_name,
            level: category.level,
            children: category.children
        })));
    }
    const handleChildCategoryChange = (e: any) => {
        let parent = parentCategories.find((x: any) => x.value == selectedParent).children
        let grandChildren = parent.find((x: any) => x.category_id == e).children
        setGrandChildCategories(grandChildren.map((category: any) => ({
            value: category.category_id.toString(),
            label: category.category_name,
            level: category.level,
            children: category.children
        })));
    }
    return (
        <div>
            <Card className="card-one mt-2">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">


                            <div className=" mt-2">
                                <div className="md:flex">
                                    <ul className="flex-column space-y space-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:me-4 mb-4 md:mb-0">
                                        <MenuItem href="#" text="Product" isActive={activeItem === "Product"} onClick={() => handleMenuItemClick("Product")} />
                                        <MenuItem href="#" text="Specification" isActive={activeItem === "Specification"} onClick={() => handleMenuItemClick("Specification")} />
                                        {/* <MenuItem href="#" text="Inventory" isActive={activeItem === "Inventory"} onClick={() => handleMenuItemClick("Inventory")} /> */}
                                        <MenuItem href="#" text="Cost " isActive={activeItem === "Cost"} onClick={() => handleMenuItemClick("Cost")} />
                                        <MenuItem href="#" text="Price & Sales" isActive={activeItem === "PriceAndSales"} onClick={() => handleMenuItemClick("PriceAndSales")} />
                                        {/* <MenuItem href="#" text="Replenishment" isActive={activeItem === "Replenishment"} onClick={() => handleMenuItemClick("Replenishment")} /> */}
                                        {/* <MenuItem href="#" text="Planning" isActive={activeItem === "Planning"} onClick={() => handleMenuItemClick("Planning")} /> */}


                                        {/* <MenuItem href="#" text="Disabled" isActive={activeItem === "disabled"} onClick={() => handleMenuItemClick("disabled")} /> */}
                                    </ul>
                                    <div className="p-3 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">

                                        {activeItem === "Product" && (
                                            <>
                                                <div className="flex w-full gap-4">

                                                    <div className="grid w-5/6 grid-cols-1 gap-6">
                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                            <div className="col-span-1">
                                                                <InputField control={form.control} label="Item Code" placeholder="Enter item code" name="itemCode" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="Product Name" placeholder="Enter product name" name="itemName" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="English Name" placeholder="Enter product English name" name="translatedName" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="Description" placeholder="Enter description" name="description" type="text" clipboard={true} />
                                                            </div>
                                                            {/* <div>
                                                                <InputField control={form.control} label="Item Category Code" placeholder="Enter category code" name="itemCategoryCode" type="text" />
                                                            </div> */}
                                                        </div>

                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full ">
                                                            {/* <div className="flex items-end h-full">
                                                               <InputField control={form.control} label="Retail Price" placeholder="Enter retail price" name="retailPrice" type="number" clipboard={true} /> 
                                                            </div> */}
                                                            {/* <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Promotional Retail" placeholder="Enter promotional price" name="promotionalRetail" type="text" />
                                                            </div>
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Margin" placeholder="Enter margin" name="margin" type="number" />
                                                            </div> */}
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Retail UOM" placeholder="Enter retail UOM" name="retailUom" type="text" required={true} />
                                                            </div>
                                                            <div className="flex mt-4 h-full">
                                                                <div className="w-full">
                                                                    <div className="btn-toggle-zinc flex items-center">
                                                                        <div className="mr-2">
                                                                            <span>Promotion</span>
                                                                        </div>
                                                                        <div className="ml-auto">
                                                                            <IOSSwitch checked={showPromotionButton} onChange={toggleSwitchPromotion} className="ml-2" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="w-1/6">
                                                        <ImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} onImageClick={handleImageClick} isPopupOpen={isPopupOpen} onClosePopup={handleClosePopup} selectedImage={selectedImage} />
                                                    </div>
                                                </div>


                                                {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mt-4">
                                                    <InputField control={form.control} label="Base Unit of Measure" placeholder="Enter base unit of measure" name="baseUnitOfMeasure" type="text" />
                                                    <InputField control={form.control} label="Case Size" placeholder="Enter case size" name="caseSize" type="text" />
                                                    <InputField control={form.control} label="Pcs per Pallet" placeholder="Enter pcs per pallet" name="pcsPerPallet" type="text" />
                                                    <InputField control={form.control} label="Pcs per Layers" placeholder="Enter pcs per layers" name="pcsPerLayers" type="text" />

                                                </div> */}


                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mt-4">
                                                    <InputField control={form.control} label="Allergic Details" placeholder="Enter allergic details" name="allergicDetails" type="text" />
                                                    <InputField control={form.control} label="Ingredients" placeholder="Enter ingredients" name="ingredients" type="text" />
                                                    <InputField control={form.control} label="Translated Ingredients" placeholder="Enter translated ingredients" name="translatedIngredients" type="text" />
                                                    <InputField control={form.control} label="Translated Allergic Details" placeholder="Enter translated allergic details" name="translatedAllergicDetails" type="text" />
                                                    <SelectField control={form.control} label="UOM" placeholder="Enter UOM" name="uom" options={reorderLevelType} required={true} />
                                                    <SelectField control={form.control} label="Reorder Level Type" placeholder="Enter reorder level type" name="reorderLevelType" options={reorderLevelType} required={true} />
                                                    <SelectField control={form.control} label="Item Type" placeholder="Enter item type" name="itemType" options={[{ value: 'case', label: 'Case' }, { value: 'unit', label: 'Unit' }]} required={true} />
                                                    <SelectField control={form.control} label="Parent Category" name="parentCategory" options={parentCategories} onChange={handleParentCategoryChange} required={true} />
                                                    <SelectField control={form.control} label="Child Category" name="childCategory" options={childCategories} onChange={handleChildCategoryChange} required={true} />
                                                    <SelectField control={form.control} label="Grand Child Category" name="categoryId" options={grandchildCategories} required={true} />
                                                    <SelectField control={form.control} label="Brand" name="brandId" options={brandList} required={true} />
                                                </div>


                                            </>
                                        )}


                                        {activeItem === "Specification" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">



                                                {/* Item Details */}

                                                <CheckboxField control={form.control} label="PLU Coded" name="item_details.isPluCoded" />
                                                <CheckboxField control={form.control} label="Is Seasoned" name="item_details.isSeasoned" />
                                                <CheckboxField control={form.control} label="Is Store Use" name="item_details.isStoreUse" />
                                                <CheckboxField control={form.control} label="Is Weighted" name="item_details.isWeighted" />
                                                <CheckboxField control={form.control} label="Has Lead Time" name="item_details.hasLeadTime" />
                                                <CheckboxField control={form.control} label="Can Be in Promo" name="item_details.canBeInPromo" />
                                                <CheckboxField control={form.control} label="Can Split Sell" name="item_details.canSplitSell" />
                                                <CheckboxField control={form.control} label="Can Stock Take" name="item_details.canStockTake" />
                                                <CheckboxField control={form.control} label="Is Out of Stock" name="item_details.isOutOfStock" />
                                                <CheckboxField control={form.control} label="Need Pre-order" name="item_details.needPreOrder" />
                                                <CheckboxField control={form.control} label="Has Box Barcode" name="item_details.hasBoxBarcode" />
                                                <CheckboxField control={form.control} label="Has Min Selling Qty" name="item_details.hasMinSellingQty" />
                                                <CheckboxField control={form.control} label="Is Price Marked" name="item_details.isPriceMarked" />
                                                <InputField control={form.control} label="Min Selling Qty" placeholder="Enter min selling qty" name="item_details.minSellingQty" type="number" />
                                                <CheckboxField control={form.control} label="Is Discontinued" name="item_details.isDiscontinued" />
                                                <CheckboxField control={form.control} label="Is Discountable" name="item_details.isDiscountable" />
                                                <CheckboxField control={form.control} label="Is Store Visible" name="item_details.isStoreVisible" />
                                                <CheckboxField control={form.control} label="Has Outer Barcode" name="item_details.hasOuterBarcode" />
                                                <CheckboxField control={form.control} label="Is Age Restricted" name="item_details.isAgeRestricted" />
                                                <CheckboxField control={form.control} label="Can Order in Pallet" name="item_details.canOrderInPallet" />
                                                <CheckboxField control={form.control} label="Has Min Selling Qty" name="item_details.hasMinSellingQty" />
                                                <CheckboxField control={form.control} label="Has Pallet Barcode" name="item_details.hasPalletBarcode" />
                                                <CheckboxField control={form.control} label="Can Purchase Locally" name="item_details.canPurchaseLocally" />
                                                <CheckboxField control={form.control} label="Is Store Transferable" name="item_details.isStoreTransferable" />
                                                <CheckboxField control={form.control} label="Is Considered for Purchase Plan" name="item_details.isConsideredForPurchasePlan" />

                                            </div>
                                        )}

                                        {/* {activeItem === "Inventory" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                <InputField control={form.control} label="Self No" placeholder="Enter self no" name="selfNo" type="text" />
                                                <InputField control={form.control} label="Inventory" placeholder="Enter inventory" name="inventory" type="text" />
                                                <InputField control={form.control} label="Qty on Purchase Order" placeholder="Enter qty on purchase order" name="qtyOnPurchaseOrder" type="text" />
                                                <InputField control={form.control} label="Stock out Warning" placeholder="Enter stock out warning" name="stockOutWarning" type="text" />
                                                <InputField control={form.control} label="Wastage Percentage" placeholder="Enter wastage percentage" name="wastagePercentage" type="text" />
                                            </div>
                                        )} */}

                                        {activeItem === "Cost" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                {/* <InputField control={form.control} label="Standard Cost" placeholder="Enter standard cost" name="standardCost" type="number" />
                                                <InputField control={form.control} label="Unit Cost" placeholder="Enter unit cost" name="unitCost" type="number" /> */}
                                                <InputField control={form.control} label="Safety Stock" placeholder="Enter safety stock" name="safetyStock" type="number" />
                                                <InputField control={form.control} label="Min Order Qty" placeholder="Enter min order qty" name="minOrderQty" type="number" />
                                                <InputField control={form.control} label="Max Order Qty" placeholder="Enter max order qty" name="maxOrderQty" type="number" />
                                                <InputField control={form.control} label="Lead Time" placeholder="Enter lead time" name="leadTime" type="text" />
                                                <InputField control={form.control} label="Reorder Level" placeholder="Enter reorder level" name="reorderLevel" type="text" />


                                                <InputField control={form.control} label="Safety Stock" placeholder="Enter safety stock" name="safetyStock" type="number" />
                                                <InputField control={form.control} label="Shelf Life" placeholder="Enter shelf life" name="shelfLife" type="number" />
                                                <InputField control={form.control} label="Shelf Life Type" placeholder="Enter shelf life type" name="shelfLifeType" type="text" />
                                                <SelectField control={form.control} label="Country of Origin" name="countryOfOrigin" options={countries} />
                                            </div>
                                        )}


                                        {activeItem === "Replenishment" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">

                                            </div>
                                        )}

                                        {/* {activeItem === "Planning" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                <SelectField control={form.control} label="Reordering Policy" name="reorderingPolicy" options={reorderingPolicies} />
                                                <InputField control={form.control} label="Safety Lead time" placeholder="Enter safety lead time" name="safetyLeadTime" type="text" />
                                                <InputField control={form.control} label="Safety Stock Quantity" placeholder="Enter safety stock quantity" name="safetyStockQuantity" type="text" />
                                                <CheckboxField control={form.control} label="Include Inventory" name="includeInventory" />

                                                <SelectField control={form.control} label="Reschedule Period" name="reschedulePeriod" options={reschedulePeriods} />
                                                <InputField control={form.control} label="Reorder Quantity" placeholder="Enter reorder quantity" name="reorderQuantity" type="text" />
                                                <InputField control={form.control} label="Maximum Inventory" placeholder="Enter maximum inventory" name="maximumInventory" type="text" />
                                                <InputField control={form.control} label="Minimum Order Quantity" placeholder="Enter minimum order quantity" name="minimumOrderQuantity" type="text" />
                                                <InputField control={form.control} label="Maximum Order Quantity" placeholder="Enter maximum order quantity" name="maximumOrderQuantity" type="text" />
                                                <InputField control={form.control} label="Order Multiple" placeholder="Enter order multiple" name="orderMultiple" type="text" />
                                            </div>
                                        )} */}

                                        {activeItem === "Till" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                <InputField control={form.control} label="Label Name" placeholder="Enter label name" name="labelName" type="text" />
                                                <InputField control={form.control} label="Invoice Name" placeholder="Enter invoice name" name="invoiceName" type="text" />
                                                <InputField control={form.control} label="Till Message" placeholder="Enter till message" name="tillMessage" type="text" />

                                            </div>
                                        )}


                                    </div>
                                </div>
                            </div>


                            <hr className="border-t border-zinc-300" />
                            <div className="flex justify-end space-x-4 mt-2 pr-4">
                                <button className="btn-zinc">Cancel</button>
                                <Button type="submit" disabled={isLoading} className="btn-cyan">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                        </>
                                    ) : (type == ModeType.Edit) ? "Update" : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductForm