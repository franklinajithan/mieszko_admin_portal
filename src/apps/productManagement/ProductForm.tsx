import CheckboxField from '@/components/elements/CheckboxField'
import InputField from '@/components/elements/InputField'
import React, { useEffect, useState } from 'react'

import MenuItem from '@/components/elements/MenuItem'
import { Form } from "@/components/ui/form";
import { editProductFormSchema } from '@/lib/utils'

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarInput } from '@/components/elements/CalendarInput'
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { z } from 'zod'
import { addProduct, getItemDetail } from '@/service/product.service'
import IOSSwitch from '@/components/elements/toggleTheme'
import ImageUploader from '@/components/elements/ImageUploader'
import { Card } from '@mui/material';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductDetails } from '@/interface/productInterfaces';
import { countries, reorderingPolicies, reschedulePeriods } from '@/data/enum';
import SelectField from '@/components/elements/SelectField';
const ProductForm = ({ id, type }: any) => {

    const [activeItem, setActiveItem] = useState("Product");

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [showPromotionButton, setShowPromotionButton] = useState(false);
    const [showActiveButton, setShowActiveButton] = useState(false);


    const form = useForm<z.infer<typeof editProductFormSchema>>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: {
            itemName: "",
            englishName: "",
            itemCode: "",
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
            wastagePercentage: "0",
            itemType: "",
            minOrderQty: "0",
            maxOrderQty: "0",
            leadTime: "0",
            reorderLevel: "0",
            reorderLevelType: "",
            safetyStock: "0",
            shelfLife: 0,
            shelfLifeType: "",
            countryOfOrigin: "",
            selfNo: "",
            inventory: "0",
            qtyOnPurchaseOrder: "0",
            stockOutWarning: "",
            standardCost: 0,
            unitCost: 0,
            reorderingPolicy: "",
            safetyLeadTime: "",
            safetyStockQuantity: "0",
            includeInventory: "",
            reschedulePeriod: "",
            reorderQuantity: "0",
            maximumInventory: "0",
            minimumOrderQuantity: "0",
            maximumOrderQuantity: "0",
            orderMultiple: "1",
            baseUnitOfMeasure: "",
            caseSize: "0",
            pcsPerPallet: "0",
            pcsPerLayers: "0",
            itemCategoryCode: "",
            retailPrice: "0",
            promotionalRetail: "0",
            margin: "0",
            vat: {
                vatId: "",
                vatCode: "",
                vatRate: 0,
                countryCode: null,
                description: null,
                effectiveTo: null,
                effectiveFrom: "",
            },
            brand: {
                image: "",
                website: "",
                brandName: "",
                description: "",
            },
            category: {
                image: "",
                isPLU: false,
                pluCode: "",
                parentId: 0,
                categoryName: "",
                translatedName: "",
            },
            item_details: {
                tags: [],
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
                splitSellQty: 0,
                hasBoxBarcode: false,
                hasLinkedItem: false,
                isPriceMarked: false,
                minSellingQty: 0,
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
                isConsideredForPurchasePlan: false,
            }
        }
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize with null
    const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
        setIsLoading(true);
        try {
            const data = {
                ...values,
                categoryId: "1",
                retailUom: "unit",
                itemType: "perishable",
                reorderLevel: "20",
                reorderLevelType: "absolute",
                shelfLife: 30,
                shelfLifeType: "d",
                brandId: 1,
                vatId: 1
            };

            const result = await addProduct(data);

            if (result.status === 201) {
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
        if (type == 'edit') {
            fetch();
        }

    }, [])

    useEffect(() => {
        if (productDetails != null) {
            const formValues = {
                itemName: productDetails.itemName || '',
                englishName: productDetails.englishName || '',
                itemCode: productDetails.itemCode || '',
                description: productDetails.description || '',
                labelName: productDetails.labelName || '',
                invoiceName: productDetails.invoiceName || '',
                tillMessage: productDetails.tillMessage || '',
                ingredients: productDetails.ingredients || '',
                translatedIngredients: productDetails.translatedIngredients || '',
                allergicDetails: productDetails.allergicDetails || '',
                translatedAllergicDetails: productDetails.translatedAllergicDetails || '',
                item_image: productDetails.item_image || '',
                uom: productDetails.uom || '',
                retailUom: productDetails.retailUom || '',
                wastagePercentage: productDetails.wastagePercentage || '',
                itemType: productDetails.itemType || '',
                minOrderQty: productDetails.minOrderQty || '',
                maxOrderQty: productDetails.maxOrderQty || '',
                leadTime: productDetails.leadTime || '',
                reorderLevel: productDetails.reorderLevel || '',
                reorderLevelType: productDetails.reorderLevelType || '',
                safetyStock: productDetails.safetyStock || '',
                shelfLife: productDetails.shelfLife || 0, // assuming shelfLife is a number
                shelfLifeType: productDetails.shelfLifeType || '',
                countryOfOrigin: productDetails.countryOfOrigin || '',
                vat: {
                    vatCode: productDetails.vat?.vatCode || '',
                    vatRate: productDetails.vat?.vatRate || 0, // assuming vatRate is a number
                    countryCode: productDetails.vat?.countryCode || null,
                    description: productDetails.vat?.description || null,
                    effectiveTo: productDetails.vat?.effectiveTo || null,
                    effectiveFrom: productDetails.vat?.effectiveFrom || '',
                },
                brand: {
                    image: productDetails.brand?.image || '',
                    website: productDetails.brand?.website || '',
                    brandName: productDetails.brand?.brandName || '',
                    description: productDetails.brand?.description || '',
                },
                category: {
                    image: productDetails.category?.image || '',
                    isPLU: productDetails.category?.isPLU || false, // assuming isPLU is a boolean
                    pluCode: productDetails.category?.pluCode || '',
                    parentId: productDetails.category?.parentId || 0, // assuming parentId is a number
                    categoryName: productDetails.category?.categoryName || '',
                    translatedName: productDetails.category?.translatedName || '',
                },
                item_details: {
                    tags: productDetails.item_details?.tags || ['', ''],
                    isPluCoded: productDetails.item_details?.isPluCoded || false,
                    isSeasoned: productDetails.item_details?.isSeasoned || false,
                    isStoreUse: productDetails.item_details?.isStoreUse || false,
                    isWeighted: productDetails.item_details?.isWeighted || false,
                    hasLeadTime: productDetails.item_details?.hasLeadTime || false,
                    canBeInPromo: productDetails.item_details?.canBeInPromo || false,
                    canSplitSell: productDetails.item_details?.canSplitSell || false,
                    canStockTake: productDetails.item_details?.canStockTake || false,
                    isOutOfStock: productDetails.item_details?.isOutOfStock || false,
                    needPreOrder: productDetails.item_details?.needPreOrder || false,
                    splitSellQty: productDetails.item_details?.splitSellQty || 0, // assuming it's a number
                    hasBoxBarcode: productDetails.item_details?.hasBoxBarcode || false,
                    hasLinkedItem: productDetails.item_details?.hasLinkedItem || false,
                    isPriceMarked: productDetails.item_details?.isPriceMarked || false,
                    minSellingQty: productDetails.item_details?.minSellingQty || 0, // assuming it's a number
                    isDiscontinued: productDetails.item_details?.isDiscontinued || false,
                    isDiscountable: productDetails.item_details?.isDiscountable || false,
                    isStoreVisible: productDetails.item_details?.isStoreVisible || false,
                    hasOuterBarcode: productDetails.item_details?.hasOuterBarcode || false,
                    isAgeRestricted: productDetails.item_details?.isAgeRestricted || false,
                    canOrderInPallet: productDetails.item_details?.canOrderInPallet || false,
                    hasMinSellingQty: productDetails.item_details?.hasMinSellingQty || false,
                    hasPalletBarcode: productDetails.item_details?.hasPalletBarcode || false,
                    canPurchaseLocally: productDetails.item_details?.canPurchaseLocally || false,
                    isStoreTransferable: productDetails.item_details?.isStoreTransferable || false,
                    isConsideredForPurchasePlan: productDetails.item_details?.isConsideredForPurchasePlan || false,
                },
            };

            reset(formValues); // Assuming reset is your form reset function
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
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Ensure the result is a string or null
                if (typeof reader.result === 'string' || reader.result === null) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        setSelectedImage(imagePreview);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedImage(null);
    };

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
                                        <MenuItem href="#" text="Inventory" isActive={activeItem === "Inventory"} onClick={() => handleMenuItemClick("Inventory")} />
                                        <MenuItem href="#" text="Cost " isActive={activeItem === "Cost"} onClick={() => handleMenuItemClick("Cost")} />
                                        <MenuItem href="#" text="Price & Sales" isActive={activeItem === "PriceAndSales"} onClick={() => handleMenuItemClick("PriceAndSales")} />
                                        <MenuItem href="#" text="Replenishment" isActive={activeItem === "Replenishment"} onClick={() => handleMenuItemClick("Replenishment")} />
                                        <MenuItem href="#" text="Planning" isActive={activeItem === "Planning"} onClick={() => handleMenuItemClick("Planning")} />


                                        {/* <MenuItem href="#" text="Disabled" isActive={activeItem === "disabled"} onClick={() => handleMenuItemClick("disabled")} /> */}
                                    </ul>
                                    <div className="p-3 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">

                                        {activeItem === "Product" && (
                                            <>
                                                <div className="flex w-full gap-4">
                                                    {/* Form Fields */}
                                                    <div className="grid w-5/6 grid-cols-1 gap-6">
                                                        {/* General Information */}
                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Item Code" placeholder="Enter item code" name="itemCode" type="text" readonly clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="Product Name" placeholder="Enter product name" name="itemName" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="English Name" placeholder="Enter product English name" name="englishName" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputField control={form.control} label="Description" placeholder="Enter description" name="description" type="text" clipboard={true} />
                                                            </div>
                                                            <div>
                                                                <InputField control={form.control} label="Item Category Code" placeholder="Enter category code" name="itemCategoryCode" type="text" />
                                                            </div>
                                                        </div>

                                                        {/* Pricing Information */}
                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full ">
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Retail Price" placeholder="Enter retail price" name="retailPrice" type="text" clipboard={true} />
                                                            </div>
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Promotional Retail" placeholder="Enter promotional price" name="promotionalRetail" type="text" />
                                                            </div>
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Margin" placeholder="Enter margin" name="margin" type="text" />
                                                            </div>
                                                            <div className="flex items-end h-full">
                                                                <InputField control={form.control} label="Retail UOM" placeholder="Enter retail UOM" name="retailUom" type="text" />
                                                            </div>
                                                            <div className="flex items-end h-full">
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

                                                    {/* Image Uploader */}
                                                    <div className="w-1/6">
                                                        <ImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} onImageClick={handleImageClick} isPopupOpen={isPopupOpen} onClosePopup={handleClosePopup} selectedImage={selectedImage} />
                                                    </div>
                                                </div>

                                                {/* Packaging Details */}
                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mt-4">

                                                    <InputField control={form.control} label="Base Unit of Measure" placeholder="Enter base unit of measure" name="baseUnitOfMeasure" type="text" />

                                                    <InputField control={form.control} label="Case Size" placeholder="Enter case size" name="caseSize" type="text" />

                                                    <InputField control={form.control} label="Pcs per Pallet" placeholder="Enter pcs per pallet" name="pcsPerPallet" type="text" />

                                                    <InputField control={form.control} label="Pcs per Layers" placeholder="Enter pcs per layers" name="pcsPerLayers" type="text" />

                                                </div>

                                                {/* Additional Details */}
                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mt-4">

                                                    <InputField control={form.control} label="Allergic Details" placeholder="Enter allergic details" name="allergicDetails" type="text" />

                                                    <InputField control={form.control} label="Ingredients" placeholder="Enter ingredients" name="ingredients" type="text" />

                                                    <InputField control={form.control} label="Translated Ingredients" placeholder="Enter translated ingredients" name="translatedIngredients" type="text" />

                                                    <InputField control={form.control} label="Translated Allergic Details" placeholder="Enter translated allergic details" name="translatedAllergicDetails" type="text" />

                                                    <InputField control={form.control} label="UOM" placeholder="Enter UOM" name="uom" type="text" />


                                                    <InputField control={form.control} label="Item Type" placeholder="Enter item type" name="itemType" type="text" />

                                                </div>


                                            </>
                                        )}


                                        {activeItem === "Specification" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                {/* Category Information */}

                                                <CheckboxField control={form.control} label="PLU" name="category.isPLU" />
                                                <InputField control={form.control} label="PLU Code" placeholder="Enter PLU code" name="category.pluCode" type="text" />
                                                <InputField control={form.control} label="Parent ID" placeholder="Enter parent ID" name="category.parentId" type="number" />
                                                <InputField control={form.control} label="Category Name" placeholder="Enter category name" name="category.categoryName" type="text" />

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

                                        {activeItem === "Inventory" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                <InputField control={form.control} label="Self No" placeholder="Enter self no" name="selfNo" type="text" />
                                                <InputField control={form.control} label="Inventory" placeholder="Enter inventory" name="inventory" type="text" />
                                                <InputField control={form.control} label="Qty on Purchase Order" placeholder="Enter qty on purchase order" name="qtyOnPurchaseOrder" type="text" />
                                                <InputField control={form.control} label="Stock out Warning" placeholder="Enter stock out warning" name="stockOutWarning" type="text" />
                                                <InputField control={form.control} label="Wastage Percentage" placeholder="Enter wastage percentage" name="wastagePercentage" type="text" />
                                            </div>
                                        )}

                                        {activeItem === "Cost" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                                                <InputField control={form.control} label="Standard Cost" placeholder="Enter standard cost" name="standardCost" type="number" />
                                                <InputField control={form.control} label="Unit Cost" placeholder="Enter unit cost" name="unitCost" type="number" />
                                                <InputField control={form.control} label="Safety Stock" placeholder="Enter safety stock" name="safetyStock" type="number" />
                                                <InputField control={form.control} label="Min Order Qty" placeholder="Enter min order qty" name="minOrderQty" type="number" />
                                                <InputField control={form.control} label="Max Order Qty" placeholder="Enter max order qty" name="maxOrderQty" type="number" />
                                                <InputField control={form.control} label="Lead Time" placeholder="Enter lead time" name="leadTime" type="text" />
                                                <InputField control={form.control} label="Reorder Level" placeholder="Enter reorder level" name="reorderLevel" type="text" />
                                                <InputField control={form.control} label="Reorder Level Type" placeholder="Enter reorder level type" name="reorderLevelType" type="text" />
                                                <InputField control={form.control} label="Safety Stock" placeholder="Enter safety stock" name="safetyStock" type="number" />
                                                <InputField control={form.control} label="Shelf Life" placeholder="Enter shelf life" name="shelfLife" type="number" />
                                                <InputField control={form.control} label="Shelf Life Type" placeholder="Enter shelf life type" name="shelfLifeType" type="text" />
                                                <SelectField control={form.control} label="Country of Origin" name="countryOfOrigin" options={countries} />
                                            </div>
                                        )}
                                        {activeItem === "PriceAndSales" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">

                                                <InputField control={form.control} label="VAT id" placeholder="Enter VAT ID" name="vat.vatId" type="text" />
                                                <InputField control={form.control} label="VAT Code" placeholder="Enter VAT code" name="vat.vatCode" type="text" />
                                                <InputField control={form.control} label="VAT Rate" placeholder="Enter VAT rate" name="vat.vatRate" type="number" />
                                                <SelectField control={form.control} label="VAT Country Code" name="vat.countryCode" options={countries} />
                                                <InputField control={form.control} label="VAT Description" placeholder="Enter VAT description" name="vat.description" type="text" />
                                                <CalendarInput control={form.control} label="Effective From" name="vat.effectiveFrom" value={null} />
                                                <CalendarInput control={form.control} label="Effective To" name="vat.effectiveTo" value={null} />
                                                <InputField control={form.control} label="Brand Image" placeholder="Enter brand image URL" name="brand.image" type="text" />
                                                <InputField control={form.control} label="Brand Website" placeholder="Enter brand website" name="brand.website" type="url" />
                                                <InputField control={form.control} label="Brand Name" placeholder="Enter brand name" name="brand.brandName" type="text" />
                                                <InputField control={form.control} label="Brand Description" placeholder="Enter brand description" name="brand.description" type="text" />


                                            </div>
                                        )}

                                        {activeItem === "Replenishment" && (
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">

                                            </div>
                                        )}

                                        {activeItem === "Planning" && (
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
                                        )}

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
                                    ) : "Submit"}
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