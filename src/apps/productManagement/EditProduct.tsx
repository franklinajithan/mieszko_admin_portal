import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";

import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";

import { useParams } from 'react-router-dom';
import { decryptParam } from "@/lib/cryptoUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarcodeGrid from "./BarcodeGrid";
import SupplierGrid from "./SupplierGrid";
import PromotionGrid from "./PromotionGrid";

import ProductForm from "./ProductForm";


const EditProduct = ({ title, icon }: any) => {
    const { t } = useTranslation("global");
    const { id } = useParams();

    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');

    let encryptedValueFromURL: string = id?.toString() || '';
    const decryptedValue = decryptParam(encryptedValueFromURL);
  

    return (
        <>
        
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />
                    <ProductForm type='edit' id={Number(decryptedValue)}/>
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
