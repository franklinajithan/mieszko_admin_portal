import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Header from "../../layouts/Header";
import HeaderComponents from "@/elements/HeaderSection";
import ProductForm from "./ProductForm";




const NewProduct = ({ title,icon}:any) => {

    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');


    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                     
                        <Card.Body>
                            <ProductForm/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default NewProduct;