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
import { ProductDetails } from "@/interface/productInterfaces";
import ProductForm from "./ProductForm";


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

    const [showPromotionButton, setShowPromotionButton] = useState(false);
    const [showActiveButton, setShowActiveButton] = useState(false);

    let encryptedValueFromURL: string = id?.toString() || '';
    const decryptedValue = decryptParam(encryptedValueFromURL);
    const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize with null
    // Function to handle menu item clicks
    const handleMenuItemClick = (item: any) => {

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


    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getItemDetail(Number(decryptedValue));

                setProductDetails(result.data.data)

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










    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />
                    <ProductForm />
                    <Card className="card-one mt-4 shadow-lg rounded-lg">
                        <CardContent className="p-1">
                            <Tabs defaultValue="barcode" className="w-full">
                            <TabsList className="space-x-2 border-b border-gray-300">
                                    <TabsTrigger value="barcode" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Barcode Details</TabsTrigger>
                                    <TabsTrigger value="supplier" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Supplier Details</TabsTrigger>
                                    <TabsTrigger value="promotion" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Promotion</TabsTrigger>
                                    <TabsTrigger value="priceHistory" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Price History</TabsTrigger>
                                    <TabsTrigger value="sales" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Sales</TabsTrigger>
                                    <TabsTrigger value="stock" className="py-2 px-4 rounded-t-lg hover:bg-gray-200">Stock</TabsTrigger>
                                </TabsList>

                                <TabsContent value="barcode" >
                                    <BarcodeGrid />
                                </TabsContent>
                                <TabsContent value="supplier">
                                    <SupplierGrid />
                                </TabsContent>
                                <TabsContent value="promotion">
                                    <PromotionGrid />
                                </TabsContent>
                                <TabsContent value="priceHistory">
                                    <SupplierGrid />
                                </TabsContent>
                                <TabsContent value="sales">
                                    <SupplierGrid />
                                </TabsContent>
                                <TabsContent value="stock">
                                    <SupplierGrid />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
