import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import MenuItem from '@/elements/MenuItem';
import Header from "../../layouts/Header";
import HeaderComponents from "@/elements/HeaderSection";
import InputField from "@/elements/InputField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { editProductFormSchema } from "@/lib/utils";
import { getBrand } from "@/service/brand.service";
import { addProduct, getItemCode, getItemDetail } from "@/service/product.service";
import { useToast } from "@/hooks/use-toast";
import { useParams } from 'react-router-dom';
import { decryptParam } from "@/lib/cryptoUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarcodeGrid from "./BarcodeGrid";
import SupplierGrid from "./SupplierGrid";
import PromotionGrid from "./PromotionGrid";
import IOSSwitch from "@/elements/toggleTheme";
import ImageUploader from "@/elements/ImageUploader";
import CheckboxField from "@/elements/CheckboxField";
import { CalendarInput } from "@/elements/CalendarInput";


const EditProduct = ({ title, icon }: any) => {
    const { t } = useTranslation("global");
    const { id } = useParams();

    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [brandList, setBrandList] = useState<any[]>([]);
    const [ItemCode, setItemCode] = useState<string | undefined>();
    const [activeItem, setActiveItem] = useState("profile");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Function to handle menu item clicks
    const handleMenuItemClick = (item: any) => {
        debugger
        setActiveItem(item);
    };
    const form = useForm<z.infer<typeof editProductFormSchema>>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: {
            itemName: '',
            englishName: '',
            itemCode: '',
            description: '',
            labelName: '',
            invoiceName: '',
            tillMessage: '',
            ingredients: '',
            translatedIngredients: '',
            allergicDetails: '',
            translatedAllergicDetails: '',
            item_image: '',
            uom: '',
            retailUom: '',
            wastagePercentage: '',
            itemType: '',
            minOrderQty: '',
            maxOrderQty: '',
            leadTime: '',
            reorderLevel: '',
            reorderLevelType: '',
            safetyStock: '',
            shelfLife: 0,
            shelfLifeType: '',
            countryOfOrigin: '',
            vat: {
                vatCode: '',
                vatRate: 10,
                countryCode: null,
                description: null,
                effectiveTo: null,
                effectiveFrom: '',
            },
            brand: {
                image: '',
                website: '',
                brandName: '',
                description: '',
            },
            category: {
                image: '',
                isPLU: false,
                pluCode: '',
                parentId: 1,
                categoryName: '',
                translatedName: '',
            },
            item_details: {
                tags: ['', ''],
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
                splitSellQty: 10,
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
            },
        },
    });


    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;
    const [showPromotionButton, setShowPromotionButton] = useState(false);
    const [showActiveButton, setShowActiveButton] = useState(false);
  
    let encryptedValueFromURL: string = id?.toString() || '';
    const decryptedValue = decryptParam(encryptedValueFromURL);
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getItemDetail(Number(decryptedValue));
                debugger;
                setProductDetails(result.data.data)
                debugger;
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }


            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }, [])



    useEffect(() => {
        const fetchBrandsAndItemCode = async () => {
            try {
                const result = await getBrand();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }

                setBrandList(result.data.data.map((item: any) => ({
                    value: item.brand_id.toString(),
                    label: item.brand_name,
                })));

                const itemCodeResult = await getItemCode();
                setItemCode(itemCodeResult.data.data.item_code);
                setValue('itemCode', itemCodeResult.data.data.item_code);
            } catch (e) {
                console.error(e);
            }
        };

        fetchBrandsAndItemCode();
    }, [setValue]);

    const toggleSwitchPromotion = () => {
        setShowPromotionButton(!showPromotionButton);

    };
    const toggleSwitchStatus = () => {
        setShowActiveButton(!showActiveButton);

    };

    const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
        setIsLoading(true);

        try {
            const data = {
                itemName: values.itemName,
                englishName: values.englishName,
                itemCode: values.itemCode,
            };

            const result = await addProduct(data);

            if (result.status === 201) {
                toast({
                    variant: "success", title: result.data.status, description: result.data.message, duration: 800,
                });
            } else {
                toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800, });
            }
        } catch (e: any) {
            toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800, });
        } finally {
            setIsLoading(false);
        }
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
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                   

                                    <div className=" mt-2">
                                        <div className="md:flex">
                                            <ul className="flex-column space-y space-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:me-4 mb-4 md:mb-0">
                                                <MenuItem href="#" text="Profile" isActive={activeItem === "profile"} onClick={() => handleMenuItemClick("profile")} />
                                                <MenuItem href="#" text="Information" isActive={activeItem === "information"} onClick={() => handleMenuItemClick("information")} />
                                                <MenuItem href="#" text="Stock" isActive={activeItem === "stock"} onClick={() => handleMenuItemClick("stock")} />
                                                <MenuItem href="#" text="Brand" isActive={activeItem === "brand"} onClick={() => handleMenuItemClick("brand")} />
                                                <MenuItem href="#" text="Sales" isActive={activeItem === "sales"} onClick={() => handleMenuItemClick("sales")} />

                                                {/* <MenuItem href="#" text="Disabled" isActive={activeItem === "disabled"} onClick={() => handleMenuItemClick("disabled")} /> */}
                                            </ul>
                                            <div className="p-3 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">

                                                {activeItem === "profile" && (
                                                    <div className="flex w-full gap-2">
                                                        <ImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} onImageClick={handleImageClick} isPopupOpen={isPopupOpen} onClosePopup={handleClosePopup} selectedImage={selectedImage} />
                                                        <div className="grid w-4/5 grid-cols-1 gap-4">
                                                            <div className="grid lg:grid-cols-5 border-1 md:grid-cols-3 sm:grid-cols-1 gap-4 border-zinc-100 w-full">
                                                                <div className="bg-zinc-100 flex items-end h-full">
                                                                    <InputField control={form.control} label="Retail Price" placeholder="Enter item name" name="retailUom" type="text" clipboard={true} />
                                                                </div>
                                                                <div className="bg-zinc-100 flex items-end h-full">
                                                                    <InputField control={form.control} label="Promotional Retail" placeholder="Enter item name" name="promtionPrice" type="text" />
                                                                </div>
                                                                <div className="bg-zinc-100 flex items-end h-full">
                                                                    <InputField control={form.control} label="Margin" placeholder="Enter item name" name="margin" type="text" />
                                                                </div>
                                                                <div className="bg-zinc-100 flex items-end h-full">


                                                                    <div className="w-full">
                                                                        <div className="btn-toggle-zinc flex items-center">
                                                                            <div className="mr-2 ml-2">
                                                                                <span>Promotion</span>
                                                                            </div>
                                                                            <div className="ml-auto">
                                                                                <IOSSwitch checked={showPromotionButton} onChange={toggleSwitchPromotion} className="ml-2" />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                <div className="bg-zinc-100 flex items-end h-full">
                                                                    <div className="w-full">
                                                                        <div className="btn-toggle-zinc flex items-center">
                                                                            <div className="mr-2 ml-2">
                                                                                <span>Status</span>
                                                                            </div>
                                                                            <div className="ml-auto">
                                                                                <IOSSwitch checked={showActiveButton} onChange={toggleSwitchStatus} className="ml-2" />
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>

                                                            </div>

                                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4  border-zinc-600">
                                                                <div className="col-span-2">
                                                                    <InputField control={form.control} label="Product Name" placeholder="Enter product name" name="itemName" type="text"  clipboard={true} />
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <InputField control={form.control} label="English Name" placeholder="Enter product English name" name="englishName" type="text" clipboard={true} />
                                                                </div>
                                                                <InputField control={form.control} label="Item Code" placeholder="Enter item code" name="itemCode" type="text" readonly clipboard={true} />
                                                                <div className="col-span-2">
                                                                    <InputField control={form.control} label="Description" placeholder="Enter description" name="description" type="text" clipboard={true} />
                                                                </div>


                                                            </div>
                                                        </div>


                                                    </div>
                                                )}

                                                {activeItem === "information" && (
                                                    <>
                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4  border-zinc-600">


                                                            <InputField control={form.control} label="Label Name" placeholder="Enter label name" name="labelName" type="text" />
                                                            <InputField control={form.control} label="Invoice Name" placeholder="Enter invoice name" name="invoiceName" type="text" />
                                                            <InputField control={form.control} label="Till Message" placeholder="Enter till message" name="tillMessage" type="text" />
                                                            <InputField control={form.control} label="Ingredients" placeholder="Enter ingredients" name="ingredients" type="text" />
                                                            <InputField control={form.control} label="Translated Ingredients" placeholder="Enter translated ingredients" name="translatedIngredients" type="text" />
                                                            <InputField control={form.control} label="Allergic Details" placeholder="Enter allergic details" name="allergicDetails" type="text" />
                                                            <InputField control={form.control} label="Translated Allergic Details" placeholder="Enter translated allergic details" name="translatedAllergicDetails" type="text" />
                                                            <InputField control={form.control} label="Item Image" placeholder="Enter item image URL" name="item_image" type="text" />
                                                            <InputField control={form.control} label="UOM" placeholder="Enter UOM" name="uom" type="text" />
                                                            <InputField control={form.control} label="Retail UOM" placeholder="Enter retail UOM" name="retailUom" type="text" />
                                                            <InputField control={form.control} label="Wastage Percentage" placeholder="Enter wastage percentage" name="wastagePercentage" type="text" />
                                                            <InputField control={form.control} label="Item Type" placeholder="Enter item type" name="itemType" type="text" />


                                                            {/* VAT fields */}


                                                            {/* Category fields */}
                                                            <InputField control={form.control} label="Category Image" placeholder="Enter category image URL" name="category.image" type="text" />
                                                            <CheckboxField control={form.control} label="PLU" name="category.isPLU" />
                                                            <InputField control={form.control} label="PLU Code" placeholder="Enter PLU code" name="category.pluCode" type="text" />
                                                            <InputField control={form.control} label="Parent ID" placeholder="Enter parent ID" name="category.parentId" type="number" />
                                                            <InputField control={form.control} label="Category Name" placeholder="Enter category name" name="category.categoryName" type="text" />
                                                            <InputField control={form.control} label="Translated Name" placeholder="Enter translated name" name="category.translatedName" type="text" />

                                                            {/* Item Details */}
                                                            {/* <InputField control={form.control} label="Tags (First)" placeholder="Enter first tag" name="item_details.tags[0]" type="text"/>
                                                                 <InputField control={form.control} label="Tags (Second)" placeholder="Enter second tag" name="item_details.tags[1]" type="text"/> */}
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
                                                            <InputField control={form.control} label="Split Sell Qty" name="item_details.splitSellQty" type="number" />
                                                            <CheckboxField control={form.control} label="Has Box Barcode" name="item_details.hasBoxBarcode" />
                                                            <CheckboxField control={form.control} label="Has Linked Item" name="item_details.hasLinkedItem" />
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
                                                    </>
                                                )}
                                                {activeItem === "stock" && (
                                                    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4  border-zinc-600">
                                                        <InputField control={form.control} label="Min Order Qty" placeholder="Enter min order qty" name="minOrderQty" type="number" />
                                                        <InputField control={form.control} label="Max Order Qty" placeholder="Enter max order qty" name="maxOrderQty" type="number" />
                                                        <InputField control={form.control} label="Lead Time" placeholder="Enter lead time" name="leadTime" type="text" />
                                                        <InputField control={form.control} label="Reorder Level" placeholder="Enter reorder level" name="reorderLevel" type="text" />
                                                        <InputField control={form.control} label="Reorder Level Type" placeholder="Enter reorder level type" name="reorderLevelType" type="text" />
                                                        <InputField control={form.control} label="Safety Stock" placeholder="Enter safety stock" name="safetyStock" type="number" />
                                                        <InputField control={form.control} label="Shelf Life" placeholder="Enter shelf life" name="shelfLife" type="number" />
                                                        <InputField control={form.control} label="Shelf Life Type" placeholder="Enter shelf life type" name="shelfLifeType" type="text" />
                                                        <InputField control={form.control} label="Country of Origin" placeholder="Enter country of origin" name="countryOfOrigin" type="text" />
                                                    </div>
                                                )}
                                                {activeItem === "brand" && (
                                                    <>
                                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4  border-zinc-600">
                                                            <InputField control={form.control} label="VAT Code" placeholder="Enter VAT code" name="vat.vatCode" type="text" />
                                                            <InputField control={form.control} label="VAT Rate" placeholder="Enter VAT rate" name="vat.vatRate" type="number" />
                                                            <InputField control={form.control} label="VAT Country Code" placeholder="Enter VAT country code" name="vat.countryCode" type="text" />
                                                            <InputField control={form.control} label="VAT Description" placeholder="Enter VAT description" name="vat.description" type="text" />

                                                            <CalendarInput control={form.control} label="Effective From" name="vat.effectiveFrom" value={undefined} />
                                                            <CalendarInput control={form.control} label="Effective To" name="vat.effectiveTo" value={undefined} />

                                                            {/* Brand fields */}
                                                            <InputField control={form.control} label="Brand Image" placeholder="Enter brand image URL" name="brand.image" type="text" />
                                                            <InputField control={form.control} label="Brand Website" placeholder="Enter brand website" name="brand.website" type="url" />
                                                            <InputField control={form.control} label="Brand Name" placeholder="Enter brand name" name="brand.brandName" type="text" />
                                                            <InputField control={form.control} label="Brand Description" placeholder="Enter brand description" name="brand.description" type="text" />
                                                        </div>
                                                    </>
                                                )}
                                                {activeItem === "sales" && (
                                                    <>
                                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Disabled</h3>
                                                        <p className="mb-2">This menu item is disabled and does not have any content associated with it.</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs defaultValue="account" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="account">Barcode Details</TabsTrigger>
                                            <TabsTrigger value="supplier">Supplier Details</TabsTrigger>
                                            <TabsTrigger value="promotion">Promotion</TabsTrigger>
                                            <TabsTrigger value="sales">Price History</TabsTrigger>
                                            <TabsTrigger value="brand">Brand</TabsTrigger>

                                            <TabsTrigger value="sales">Stock</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="account">

                                            <BarcodeGrid />

                                        </TabsContent>

                                        <TabsContent value="supplier">
                                            <SupplierGrid />
                                        </TabsContent>

                                        <TabsContent value="promotion">
                                            <PromotionGrid />
                                        </TabsContent>
                                    </Tabs>

                                    <hr className="border-t border-zinc-300" />
                                    <div className="flex justify-end space-x-4 mt-2 pr-4">
                                        <button className="btn-zinc">Save</button>
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
            </div>
        </>
    );
};

export default EditProduct;
