import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";
import CardTitle from "@/components/elements/CardTitle";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { sample } from "../../data/constants";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { orderHistoryFormSchema } from "@/lib/utils";

const OrderHistory = ({ title,icon}:any) => {
    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof orderHistoryFormSchema>>({
        resolver: zodResolver(orderHistoryFormSchema),
        defaultValues: {}
    });

    const onSubmit = (values: z.infer<typeof orderHistoryFormSchema>) => {
        setIsLoading(true);
     //   console.log(values);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simulate a network request
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Search" />
                        <Card.Body>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="flex grid grid-cols-2 gap-4 mb-6">
                                        <InputField control={form.control} label="Search" type="text" name="search" />

                                        <SelectField control={form.control} label="Filter By Status" name="filterByStatus" options={sample} />
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
                                            <tr className="bg-zinc-100 text-left text-sm font-semibold">
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
                                                <tr key={index} className={index % 2 === 0 ? "bg-zinc-50" : "bg-white"}>
                                                    <td className="p-2 border-b">
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className="p-2 border-b text-cyan-500 font-medium">PP-2024-01</td>
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
                                        <button className="p-2 bg-zinc-200 rounded-md">Previous</button>
                                        <div className="text-sm">Page 1 of 10</div>
                                        <button className="p-2 bg-zinc-200 rounded-md">Next</button>
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
