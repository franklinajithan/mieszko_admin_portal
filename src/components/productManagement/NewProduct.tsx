import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../../layouts/Header";
import HeaderComponents from "@/elements/HeaderSection";
import CardTitle from "@/elements/CardTitle";
import InputField from "@/elements/InputField";
import SelectField from "@/elements/SelectField";
import CheckboxField from "@/elements/CheckboxField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { newProductFormSchema } from "@/lib/utils";
import { addProduct, getItemCode } from "@/service/product.service";
import { getBrand } from "@/service/brand.service";
import { useToast } from "@/hooks/use-toast";
import defaultProductImage from '../../assets/img/default-product-image.png';
import { FiShoppingCart } from "react-icons/fi";


interface ImagePopupProps {
    src: string;        
    onClose: () => void; 
}


const NewProduct = () => {
    const { t } = useTranslation("global");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
    const { toast } = useToast();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [brandList, setBrandList] = useState<any[]>([]);
    const [ItemCode, setItemCode] = useState<string | undefined>();

    const form = useForm<z.infer<typeof newProductFormSchema>>({
        resolver: zodResolver(newProductFormSchema),
        defaultValues: {
            itemName: '',
            englishName: '',
            itemCode: '',
            description: '',
            caseSize: '',
            casePrice: '',
            palletSize: '',
            palletPrice: '',
            isDiscounted: false,
            isStoreTransferable: false,
            canBePurchasedLocally: false,
            isOutOfStock: false,
            isWeighedItem: false,
            size: '',
            weight: '',
            vatId: '',
            brand: undefined,
            isSeasonedProduct: false,
            allergicDetails: undefined,
            ingredientsDetails: undefined,
            priceLookupCode: undefined,
            eanCode: undefined,
            departmentId: undefined,
            itemCategoryId: undefined,
            itemCategory2Id: undefined,
            unitOfMeasure: undefined,
            searchKeywordsTags: undefined,
            status: false,
        }
    });

    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;

    useEffect(() => {
        const fetchUser = async () => {
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

                const ItemId: any = await getItemCode();
                setItemCode(ItemId.data.data.item_code);
                setValue('itemCode', ItemId.data.data.item_code);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUser();
    }, []);

    const onSubmit = async (values: z.infer<typeof newProductFormSchema>) => {
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

    const handleImageClick = () => {
        setSelectedImage(imagePreview || defaultProductImage);
        setIsPopupOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            let file :any= e.target.files[0];
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const ImagePopup = ({ src, onClose }: ImagePopupProps) => (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-60 flex justify-center items-center z-50">
            <div className="relative p-4 rounded-lg shadow-lg max-w-screen-md max-h-screen" style={{ backgroundColor: 'transparent' }}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white text-black rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                    style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    &times;
                </button>
                <img src={src} alt="Product" className="w-auto h-auto max-w-full max-h-[80vh] rounded-lg" />
            </div>
        </div>
    );

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">
                    <HeaderComponents icon={FiShoppingCart} title={"New Product"} />

                    <Card className="card-one mt-2">
                        <CardTitle title="New Product" />
                        <Card.Body>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <h5>Basic Information</h5>
                                    <div className="grid w-full grid-cols-5 gap-4">
                                        {/* ---- */}
                                        <div className="col-span-1 flex flex-col justify-center items-center h-full bg-gradient-to-br from-white-600 via-white-600 to-white-600 p-6 rounded-lg">
                                            <div className="relative mb-4 bg-gradient-to-r from-white-600 via-white-600 to-white-600 p-2 rounded-lg shadow-2xl">
                                                <div className="w-48 h-48 relative overflow-hidden rounded-lg border-4 border-white shadow-lg transform scale-90 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
                                                    <img
                                                        src={imagePreview || defaultProductImage}
                                                        alt="Product"
                                                        onClick={handleImageClick}
                                                        className="absolute inset-0 w-full h-full object-contain"
                                                        style={{ zIndex: 10 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    id="file-input"
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="file-input"
                                                    className="btn-red"
                                                    style={{ position: 'relative', zIndex: 5 }}
                                                >
                                                    Upload Product Image
                                                </label>
                                            </div>
                                            {isPopupOpen && <ImagePopup src={selectedImage || ''} onClose={handleClosePopup} />}
                                        </div>

                                        {/* ---- */}
                                        <InputField control={form.control} label="Item Name" placeholder="Enter item name" type="text" name="itemName" />
                                        <InputField control={form.control} label="English name" placeholder="Enter item English name" type="text" name="englishName" />
                                        <InputField control={form.control} label="Item Code" placeholder="Enter item code" type="text" name="itemCode" readonly={true}/>
                                        <InputField control={form.control} label="Description" placeholder="Enter item description" type="text" name="description" />
                                    </div>

                                    <h5>Pricing and Packaging</h5>
                                    <div className="grid w-full grid-cols-4 gap-4">

                                        <InputField control={form.control} label="Case Size" placeholder="Enter case size" type="number" name="caseSize" />
                                        <InputField control={form.control} label="Case Price" placeholder="Enter case price" type="number" name="casePrice" />
                                        <InputField control={form.control} label="Pallet Size" placeholder="Enter pallet size" type="number" name="palletSize" />
                                        <InputField control={form.control} label="Pallet Price" placeholder="Enter pallet price" type="number" name="palletPrice" />

                                        <InputField control={form.control} label="Minimum order quantity" placeholder="Enter minimum order quantity" type="number" name="minOrderQty" />
                                        <InputField control={form.control} label="Maximum order quantity" placeholder="Enter maximum order quantity" type="number" name="maxOrderQty" />

                                        <CheckboxField control={form.control} id="isDiscounted" label="Is Discounted" name="isDiscounted" />
                                        <CheckboxField control={form.control} id="isStoreTransferable" label="Is Store Transferable" name="isStoreTransferable" />
                                        <CheckboxField control={form.control} id="canBePurchasedLocally" label="Can be Purchased Locally" name="canBePurchasedLocally" />
                                        <CheckboxField control={form.control} id="isOutOfStock" label="Is Out of Stock" name="isOutOfStock" />
                                        <CheckboxField control={form.control} id="isWeighedItem" label="Is Weighed Item" name="isWeighedItem" />

                                    </div>

                                    <h5>Product Specification</h5>
                                    <div className="grid w-full grid-cols-4 gap-4">

                                        <InputField control={form.control} label="Size" placeholder="Enter size" type="number" name="size" />
                                        <InputField control={form.control} label="Weight" placeholder="Enter weight" type="number" name="weight" />
                                        <InputField control={form.control} label="Vat ID" placeholder="Enter vat id" type="number" name="vatId" />
                                        <SelectField control={form.control} label="Brand" name="brand" options={brandList} />
                                        <CheckboxField control={form.control} id="is Seasoned Product " label="Is Out of Stock" name="isOutOfStock" />
                                        <CheckboxField control={form.control} id="isWeighedItem" label="Is Weighed Item" name="isWeighedItem" />

                                    </div>

                                    <h5>Composition and Health</h5>
                                    <div className="grid w-full grid-cols-4 gap-4">

                                        <InputField control={form.control} label="Allergic Details" placeholder="Enter allergic details" name="allergicDetails" type="text" />
                                        <InputField control={form.control} label="Ingredients Details" placeholder="Enter ingredients details" name="ingredientsDetails" type="text" />

                                    </div>

                                    <h5>Identification and Categorization</h5>
                                    <div className="grid w-full grid-cols-4 gap-4">

                                        <InputField control={form.control} label="Price look-up code" placeholder="Enter price look-up code" type="text" name="priceLookupCode" id="priceLookupCode" />
                                        <InputField control={form.control} label="EAN Code" placeholder="Enter EAN code" type="number" name="eanCode" id="eanCode" />
                                        <InputField control={form.control} label="Department ID" placeholder="Enter department ID" type="number" name="departmentId" id="departmentId" />
                                        <InputField control={form.control} label="Item Category ID" placeholder="Enter item category ID" type="text" name="itemCategoryId" id="itemCategoryId" />
                                        <InputField control={form.control} label="Item Category 2 ID" placeholder="Enter item category 2 ID" type="text" name="itemCategory2Id" id="itemCategory2Id" />
                                        <InputField control={form.control} label="Unit of Measure" placeholder="Enter unit of measure" type="number" name="unitOfMeasure" id="unitOfMeasure" />
                                        <InputField control={form.control} label="Search Keyword/Tags" placeholder="Enter search keywords/tags" type="text" name="searchKeywordsTags" id="searchKeywordsTags" />
                                    </div>

                                    <h5>Status</h5>
                                    <div className="grid w-full grid-cols-4 gap-4">
                                        <CheckboxField control={form.control} id="status" label="Status" name="status" />
                                    </div>

                                    <hr className="border-t border-gray-300 " />
                                    <div className="flex justify-end space-x-4  mt-2 pr-4">
                                        <button className="btn-gray">
                                            Save
                                        </button>
                                        <Button type="submit" disabled={isLoading} className='btn-red'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>)
                                                : "Submit"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
