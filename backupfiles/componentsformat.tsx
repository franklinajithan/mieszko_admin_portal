import React, { useEffect, useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../../layouts/Header";
import HeaderComponents from "@/elements/HeaderSection";
import CardTitle from "@/elements/CardTitle";
import InputField from "@/elements/InputField";
import SelectField from "@/elements/SelectField";
import { sample } from "../../data/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "../ui/form";
import { newProductFormSchema } from "@/lib/utils";
import CheckboxField from "@/elements/CheckboxField";
import { getBrand } from "@/service/brand.service";
import defaultProductImage from '../../assets/img/default-product-image.png';
import { addProduct, getItemCode } from "@/service/product.service";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/"
import { debug } from "console";





const Product = ({ title,icon}:any) => {
    const { t } = useTranslation("global");
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
    const { toast } = useToast()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image URL
    const [isLoading, setIsLoading] = useState(false);
    const [brandList, setBrandList] = useState<any[]>([]);
    const [ItemCode, setItemCode] = useState();
    
    const form = useForm<z.infer<typeof newProductFormSchema>>({
        resolver: zodResolver(newProductFormSchema),
        defaultValues: {
            itemName: '',
            englishName: '',
            itemCode: '',
       
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
                };
                setBrandList(result.data.data.map((item: any) => ({
                    value: item.brand_id.toString(),
                    label: item.brand_name,
                })));

                const ItemId:any = await getItemCode();
                setItemCode(ItemId.data.data.item_code)
                setValue('itemCode', ItemId.data.data.item_code);



            } catch (e) {
                console.error(e);
            } finally {

            }
        };

        fetchUser();
    }, [])


    const onSubmit = (values: z.infer<typeof newProductFormSchema>) => {


        const fetchUser = async () => {
            let result: any
            setIsLoading(true);

            try {
                let data = {
                    itemName: values.itemName,
                    englishName: values.englishName,
                    itemCode: values.itemCode,
                   
                }

                result = await addProduct(data);
                if (result.status == 201) {
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800, })
                } else {
                    toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800, })
                }
            } catch (e: any) {
                toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800, })
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        fetchUser();
    };




    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="New Product" />
                        <Card.Body>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <h5>Basic Information</h5>
                                    <div className="grid w-full grid-cols-5 gap-4">
                                   
                                        <InputField control={form.control} label="Item Name" placeholder="Enter item name" type="text" name="itemName" />
                                        <InputField control={form.control} label="English name" placeholder="Enter item English name" type="text" name="englishName" />
                                        <InputField control={form.control} label="Item Code" placeholder="Enter item code" type="text" name="itemCode" readonly={true}/>
                                        <InputField control={form.control} label="Description" placeholder="Enter item description" type="text" name="description" />
                                    </div>



                                    <hr className="border-t border-zinc-300 " />
                                    <div className="flex justify-end space-x-4  mt-2 pr-4">
                                        <button className="btn-zinc">
                                            Save
                                        </button>
                                        <Button type="submit" disabled={isLoading} className='btn-cyan'>
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

export default Product;
