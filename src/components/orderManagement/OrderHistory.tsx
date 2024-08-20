import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { Controller, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../../layouts/Header";
import HeaderComponents from "../../elements/HeaderSection";
import CardTitle from "../../elements/CardTitle";
import InputField from "../../elements/InputField";
import SelectField from "../../elements/SelectField";
import { sample, status } from "../../data/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { orderHistoryFormSchema } from "@/lib/utils";

// Define the schema for form validation using Zod

const OrderHistory = () => {
    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof orderHistoryFormSchema>>({
        resolver: zodResolver(orderHistoryFormSchema),
        defaultValues: {}
    });

    const onSubmit = (values: z.infer<typeof orderHistoryFormSchema>) => {
        setIsLoading(true);
        console.log(values);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simulate a network request
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    <HeaderComponents
                        showList={{
                            title: 'Order History',
                            search: true,
                            new: false,
                            delete: false,
                            download: false,
                            bookmark: false,
                            setting: false,
                            filter: true,
                        }}
                        icon={FiShoppingCart}
                    />

                    <Card className="card-one mt-2">
                        <CardTitle title="Order History" />
                        <Card.Body>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 gap-4 mb-6">



                                    <InputField control={form.control} label="Search" type="text" name="search" />

                                </div>
                                <div className="grid grid-cols-1 gap-4 mb-6">



                                    <SelectField control={form.control} label="Filter By Status" name="filterByStatus" options={sample} />

                                </div>
                                <div className="flex justify-end space-x-4 mt-6 pb-4 pr-4">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="form-btn"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </div>
                            </form>
                            {/* Order History Table */}
                            <Card className="card-one mt-2">
                                <Card.Header>
                                    <Card.Title as="h6">Order History List</Card.Title>
                                    <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                        <Nav.Link href="#"><i className="ri-refresh-line"></i></Nav.Link>
                                        <Nav.Link href="#"><i className="ri-more-2-fill"></i></Nav.Link>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 text-left text-sm font-semibold">
                                                <th className="p-2 border-b">#</th>
                                                <th className="p-2 border-b">Order Number</th>
                                                <th className="p-2 border-b">Supplier Code</th>
                                                <th className="p-2 border-b">Item Code</th>
                                                <th className="p-2 border-b">Item Name</th>
                                                <th className="p-2 border-b">Order Date</th>
                                                <th className="p-2 border-b">Quantity</th>
                                                <th className="p-2 border-b">Unit Cost</th>
                                                <th className="p-2 border-b">Total Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(10)].map((_, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                    <td className="p-2 border-b">
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className="p-2 border-b text-red-500 font-medium">PP-2024-01</td>
                                                    <td className="p-2 border-b">April 01, 2024</td>
                                                    <td className="p-2 border-b">April 15, 2024</td>
                                                    <td className="p-2 border-b">April 16, 2024</td>
                                                    <td className="p-2 border-b">April 30, 2024</td>
                                                    <td className="p-2 border-b">ST-101</td>
                                                    <td className="p-2 border-b">Seasonal</td>
                                                    <td className="p-2 border-b">Cheapest</td>
                                                    <td className="p-2 border-b">£20,000.00</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <button className="p-2 bg-gray-200 rounded-md">Previous</button>
                                        <div className="text-sm">Page 1 of 10</div>
                                        <button className="p-2 bg-gray-200 rounded-md">Next</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default OrderHistory;
