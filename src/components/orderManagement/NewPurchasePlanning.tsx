import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import Header from "../../layouts/Header";
import HeaderComponents from "../../elements/HeaderSection";
import CardTitle from "../../elements/CardTitle";
import InputField from "../../elements/InputField";
import SelectField from "../../elements/SelectField";
import MultiSelectDropdown from "../../elements/MultiSelectDropdown";
import { Form } from "@/components/ui/form";
import { status, sample, groceryDepartments, Week } from "../../data/constants";
import CheckboxField from "../../elements/CheckboxField";
import RadioField from "../../elements/RadioField";
import { Card, Nav } from "react-bootstrap";
import {  CardContent, CardHeader } from "../ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newPurchasePlanningFormSchema } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { FiPackage } from "react-icons/fi";

const NewPurchasePlanning = () => {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";

    const [skin, setSkin] = useState(currentSkin);
    const [isLoading, setIsLoading] = useState(false);

    const [deliveryType, setDeliveryType] = useState("fastest");
    const [selectedOption, setSelectedOption] = useState('Select');
    const [showList, setShowList] = useState({
        title: 'New Purchase Planning',
        search: true,
        new: true,
        delete: true,
        download: true,
        bookmark: true,
        setting: true,
        filter: true
    });

    const form = useForm<z.infer<typeof newPurchasePlanningFormSchema>>({
        resolver: zodResolver(newPurchasePlanningFormSchema),
        defaultValues: {
            documentNo: "",
            storeNo: "",
            WHLocation: "",
            planType: "",
            supplier: "",
            addOns: "",
            leadTimes: "",
            expectedDeliveryDate: "",
            brand: "",
            status: "",
            Comments: "",
            period1StartDate: "",
            period1EndDate: "",
            period2StartDate: "",
            period2EndDate: "",
            currentStock: "",
            scheduleDay: "",
            time: "",
            email: "",
            currentStock1: false,
            rtcSales: false,
            wastage: false,
            promoSales: false,
            itemsBasket: false,
            hhuItems: false,
            considerOrder: false,
            considerSales: false,
            selfLife: false,
            passToAnotherStore: "",
            filterType: "",
            specificDivisionPlanning: "",
            considerAgentPrice: ""
        },
    });

    function onSubmit(values: z.infer<typeof newPurchasePlanningFormSchema>) {
        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">

                    <HeaderComponents showList={showList} icon={FiPackage} />

                    <Card className="card-one mt-2">
                    <CardTitle title={'Search'} />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                        <InputField control={form.control} label="Document No" name="documentNo" type="text" placeholder='Enter your document no' disabled={true} />
                                        <InputField control={form.control} label="Store No" name="storeNo" type="text" placeholder='Enter your Store' disabled={true} />
                                        <InputField control={form.control} label="Related WH Location" name="WHLocation" type="text" placeholder='Enter related warehouse location' disabled={true} />
                                        <SelectField control={form.control} label="Supplier" name="supplier" options={sample} />
                                        <SelectField control={form.control} label="Plan Type" name="planType" options={sample} />
                                        <SelectField control={form.control} label="Add Ons" name="addOns" options={sample} />
                                        <SelectField control={form.control} label="Lead Times" name="leadTimes" options={sample} />
                                        <SelectField control={form.control} label="Pass to Another Store" name="passToAnotherStore" options={sample} />
                                        <SelectField control={form.control} label="Filter Type" name="filterType" options={sample} />
                                        <SelectField control={form.control} label="Specific Division Planning" name="specificDivisionPlanning" options={sample} />
                                        <SelectField control={form.control} label="Consider Agent Price" name="considerAgentPrice" options={sample} />
                                        <InputField control={form.control} label="Expected Delivery Date" name="expectedDeliveryDate" type="text" placeholder='Enter your expected delivery date' />
                                        <SelectField control={form.control} label="Brand" name="brand" options={sample} />
                                        <SelectField control={form.control} label="Status" name="status" options={sample} />
                                        <InputField control={form.control} label="Comments" name="Comments" type="text" placeholder='Enter your comments' />
                                        {/* <MultiSelectDropdown label="Department" options={groceryDepartments} /> */}
                                    </div>

                                    <hr className="border-t border-gray-300 " />

                                    <div className="flex gap-4">
                                        <div className="grid grid-cols-2 gap-4 w-1/3">
                                            <InputField control={form.control} label="Period 1 Start Date" name="period1StartDate" type="text" placeholder='Enter period 1 start date' />
                                            <InputField control={form.control} label="Period 1 End Date" name="period1EndDate" type="text" placeholder='Enter period 1 end date' />
                                            <InputField control={form.control} label="Period 2 Start Date" name="period2StartDate" type="text" placeholder='Enter period 2 start date' />
                                            <InputField control={form.control} label="Period 2 End Date" name="period2EndDate" type="text" placeholder='Enter period 2 end date' />
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 w-2/3">
                                        <span className="mt-14"><CheckboxField control={form.control} id="currentStock" label="Current Stock" name="currentStock1" /></span>
                                            
                                            <SelectField control={form.control} label="Schedule Day" name="scheduleDay" options={Week} />
                                            <InputField control={form.control} label="Time" name="time" type="text" placeholder='Enter the time' />
                                            <InputField control={form.control} label="Email" name="email" type="text" placeholder='Enter the email' />
                                            <CheckboxField control={form.control} id="rtcSales" label="RTC Sales" name="rtcSales" />
                                            <CheckboxField control={form.control} id="wastage" label="Wastage" name="wastage" />
                                            <CheckboxField control={form.control} id="promoSales" label="Promo Items Sales" name="promoSales" />
                                            <CheckboxField control={form.control} id="itemsBasket" label="Items from Basket" name="itemsBasket" />
                                            <CheckboxField control={form.control} id="hhuItems" label="HHU Items" name="hhuItems" />
                                            <CheckboxField control={form.control} id="considerOrder" label="Consider On Order" name="considerOrder" />
                                            <CheckboxField control={form.control} id="considerSales" label="Consider Sales" name="considerSales" />
                                            <CheckboxField control={form.control} id="selfLife" label="Self Life" name="selfLife" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-4  mt-2 pb-4 pr-4">
                                        <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                                            Save
                                        </button>
                                        <Button type="submit" disabled={isLoading} className='form-btn'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>)
                                                : "Submit"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </form>
                        </Form>
                    </Card>

                    <Card className="card-one mt-2">
                        <CardHeader>
                            <h1>Purchase Plan List</h1>
                            <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                            </Nav>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid grid-cols-4 gap-4 pb-2">
                                    {/* <InputField type="text" label="Supplier Code" placeholder="Supplier Code" />
                                    <InputField type="text" label="Item Code" placeholder="Item Code" />
                                    <InputField type="text" label="Item Name" placeholder="Item Name" />
                                    <InputField type="text" label="EAN / PLU" placeholder="EAN / PLU" /> */}
                                </div>
                            </div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-sm font-semibold">
                                        <th className="py-2 px-4 bg-gray-200">Check box</th>
                                        <th className="py-2 px-4 bg-gray-200">Supplier Code</th>
                                        <th className="py-2 px-4 bg-gray-200">Item Code</th>
                                        <th className="py-2 px-4 bg-gray-200">Item Name</th>
                                        <th className="py-2 px-4 bg-gray-200">UOM</th>
                                        <th className="py-2 px-4 bg-gray-200">Recommended Qty</th>
                                        <th className="py-2 px-4 bg-gray-200">Unit Cost</th>
                                        <th className="py-2 px-4 bg-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(10)].map((_, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="p-2 border-b">
                                                <input type="checkbox" /> <span className="pl-3">{index + 1}</span>
                                            </td>
                                            <td className="border px-4 py-2">1234567890123</td>
                                            <td className="border px-4 py-2">1234567890123</td>
                                            <td className="border px-4 py-2">WB-001</td>
                                            <td className="border px-4 py-2">Whole Wheat Bread</td>
                                            <td className="border px-4 py-2">Loaf</td>
                                            <td className="border px-4 py-2">200</td>
                                            <td className="border px-4 py-2">$5.50</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-4 flex justify-between items-center">
                                <button className="p-2 bg-gray-200 rounded-md">Previous</button>
                                <div className="text-sm">Page 1 of 10</div>
                                <button className="p-2 bg-gray-200 rounded-md">Next</button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NewPurchasePlanning;
