import React, { useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPackage } from "react-icons/fi";

import HeaderComponents from "@/elements/HeaderSection";
import MultiSelectDropdown from "@/elements/MultiSelectDropdown";
import SelectField from "@/elements/SelectField";
import InputField from "@/elements/InputField";
import MultiInputField from "@/elements/MultiInputField";
import MultiDateField from "@/elements/MultiDateField";
import { groceryDepartments, sample } from "../../data/constants";
import CardTitle from "@/elements/CardTitle";
import { Card, Nav } from "react-bootstrap";
import { CardContent, CardHeader } from "@/components/ui/card";
import { purchaseOrderFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form"
import { Loader2 } from 'lucide-react';



const PurchaseOrder = () => {

    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [isLoading, setIsLoading] = useState(false)

    const [numberValue, setNumberValue] = useState<number | string>('');
    const [selectedOption, setSelectedOption] = useState<string>('Select');

    const [values, setValues] = useState({
        startDate: '',
        endDate: '',
        instant: ''
    });


    const form = useForm<z.infer<typeof purchaseOrderFormSchema>>({
        resolver: zodResolver(purchaseOrderFormSchema),
        defaultValues: {
            supplier: '',  // Assuming it's a string field; adjust if it's different
            status: '',
            orderWay: '',
            store: '',
            orderNumber: '',
            supplierOrderNumber: '',
            grnNumber: '',
            itemCode: '',
            itemName: '',
            ean: '',
            orderType: '',
            comments: '1010',  // Example default value; adjust if necessary
            promotion: '',
            presell: '',
            totalLineItems: '1010',  // Example default value; adjust if necessary
            orderUomType: '',
            purchasePlanId: '',
            supplierInvoiceNumber: '',
            customerRequestedItem: '',
            orderFromMobile: '',
            orderMethod: '',
            invoiceNumber: 'T1010',  // Example default value; adjust if necessary
            paymentStatus: '',
            itemSize: '1010',  // Example default value; adjust if necessary
            supplierCode: '1010',  // Example default value; adjust if necessary
            ownLabel: '',
            priceMarked: '',
            supplierReferenceNumber: '1010',  // Example default value; adjust if necessary
            closingDate: '',  // Date fields can be an empty string or a default date
            purchasePlanStartDate: '',
            purchasePlanEndDate: '',
            orderPlacedStartDate: '',
            orderPlacedEndDate: '',
            orderDateStartDate: '',
            orderDateEndDate: '',
            deliveryDateStartDate: '',
            deliveryDateEndDate: '',
        },
    });


    const handleChange = (newValues: { startDate: string; endDate: string; instant: string }) => {
        setValues(newValues);
    };




    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleRetailValueChange = (values: { operation: string; from: string; to: string }) => {
        //   console.log(values);
    };

    function onSubmit(values: z.infer<typeof purchaseOrderFormSchema>) {
        setIsLoading(true);
       // console.log(values);
        setIsLoading(false);
    }

    const options = ['Select Unit Orders', 'Option 1', 'Option 2', 'Option 3'];

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">

                    <HeaderComponents title='Purchase Order' icon={FiPackage} />


                    <Card className="card-one mt-2">
                    <CardTitle title={'Search'} />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                        <SelectField control={form.control} label="Supplier" name="supplier" options={sample} />
                                        <SelectField control={form.control} label="Status" name="status" options={sample} />
                                        <SelectField control={form.control} label="Order Way" name="orderWay" options={sample} />
                                        <SelectField control={form.control} label="Store" name="store" options={sample} />
                                        <SelectField control={form.control} label="Order Number" name="orderNumber" options={sample} />
                                        <InputField control={form.control} label="Supplier Order Number" name="supplierOrderNumber" type="text" />
                                        <InputField control={form.control} label="GRN Number" name="grnNumber" type="text" />
                                        <InputField control={form.control} label="Item Code" name="itemCode" type="text" />
                                        <InputField control={form.control} label="Item Name" name="itemName" type="text" />
                                        <InputField control={form.control} label="EAN" name="ean" type="text" />
                                        <InputField control={form.control} label="Order Type" name="orderType" type="text" />
                                        <InputField control={form.control} label="Comments" name="comments" type="number" value={"1010"} />
                                        <SelectField control={form.control} label="Promotion" name="promotion" options={sample} />
                                        <SelectField control={form.control} label="Presell" name="presell" options={sample} />
                                        <InputField control={form.control} label="Total Line Items" name="totalLineItems" type="number" value={"1010"} />
                                        <SelectField control={form.control} label="Order UOM Type" name="orderUomType" options={sample} />
                                        <SelectField control={form.control} label="Purchase Plan Id" name="purchasePlanId" options={sample} />
                                        <SelectField control={form.control} label="Supplier Invoice Number" name="supplierInvoiceNumber" options={sample} />
                                        <SelectField control={form.control} label="Customer Requested Item" name="customerRequestedItem" options={sample} />
                                        <SelectField control={form.control} label="Order From Mobile" name="orderFromMobile" options={sample} />
                                        <SelectField control={form.control} label="Order Method" name="orderMethod" options={sample} />
                                        <InputField control={form.control} label="Invoice Number" name="invoiceNumber" type="text" value={"T1010"} />
                                        <SelectField control={form.control} label="Payment Status" name="paymentStatus" options={sample} />
                                        <InputField control={form.control} label="Item Size" name="itemSize" type="number" value={"1010"} />
                                        <InputField control={form.control} label="Supplier Code" name="supplierCode" type="number" value={"1010"} />
                                        <SelectField control={form.control} label="Own Label" name="ownLabel" options={sample} />
                                        <SelectField control={form.control} label="Price Marked" name="priceMarked" options={sample} />
                                        <InputField control={form.control} label="Supplier Reference Number" name="supplierReferenceNumber" type="number" value={"1010"} />
                                        <InputField control={form.control} label="Closing Date" name="closingDate" type="date" />
                                    </div>
                                </CardContent>
                                <hr className="border-t border-gray-300 " />
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <MultiInputField
                                            label="Retail Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="retailValue"
                                        />
                                        <MultiInputField
                                            label="Total Items"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="totalItems"
                                        />
                                        <MultiInputField
                                            label="Cost Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="costValue"
                                        />
                                        <MultiInputField
                                            label="Total Cases"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="totalCases"
                                        />
                                        <MultiInputField
                                            label="Margin Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="marginValue"
                                        />
                                        <MultiInputField
                                            label="Total Margin"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="totalMargin"
                                        />
                                        <MultiInputField
                                            label="Case Size"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="caseSize"
                                        />
                                        <MultiInputField
                                            label="Total Indicative Cost"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="totalIndicativeCost"
                                        />
                                        <MultiInputField
                                            label="Claim Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="claimValue"
                                        />
                                        <MultiInputField
                                            label="Total Claim Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                            name="totalClaimValue"
                                        />
                                    </div>
                                </CardContent>
                                <hr className="border-t border-gray-300 " />
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <MultiDateField label="Purchase Plan" firstName="purchasePlanStartDate" secondName="purchasePlanEndDate" control={form.control} />

                                        <MultiDateField label="Order Placed" firstName="orderPlacedStartDate" secondName="orderPlacedEndDate" control={form.control} />

                                        <MultiDateField label="Order" firstName="orderDateStartDate" secondName="orderDateEndDate" control={form.control} />

                                        <MultiDateField label="Delivery" firstName="deliveryDateStartDate" secondName="deliveryDateEndDate" control={form.control} />

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
                                </CardContent>
                                
                            </form>
                        </Form>
                        {/* </CardContent> */}
                    </Card>


                    {/* Purchase Plan List */}
                    <Card className="card-one mt-2">
                        <Card.Header>
                            <Card.Title as="h6">Purchase Plan List</Card.Title>
                            <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                <Nav.Link href="#"><i className="ri-refresh-line"></i></Nav.Link>
                                <Nav.Link href="#"><i className="ri-more-2-fill"></i></Nav.Link>
                            </Nav>
                        </Card.Header>
                        <CardContent>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-sm font-semibold">
                                        <th className="p-2 border-b">#</th>
                                        <th className="p-2 border-b">Purchase Plan No</th>
                                        <th className="p-2 border-b">P1 Start Date</th>
                                        <th className="p-2 border-b">P1 End Date</th>
                                        <th className="p-2 border-b">P2 Start Date</th>
                                        <th className="p-2 border-b">P2 End Date</th>
                                        <th className="p-2 border-b">Store ID</th>
                                        <th className="p-2 border-b">Purchase Plan Type</th>
                                        <th className="p-2 border-b">Plan Method</th>
                                        <th className="p-2 border-b">Total Amount</th>
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
                        </CardContent>
                    </Card>

                </div>
            </div>
        </React.Fragment>
    );
}

export default PurchaseOrder;
