import React, { useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPackage, FiShoppingCart } from "react-icons/fi";
import { Card, Nav } from "react-bootstrap";
import HeaderComponents from "../../elements/HeaderSection";
import SelectField from "../../elements/SelectField";
import InputField from "../../elements/InputField";
import MultiInputField from "../../elements/MultiInputField";
import MultiSelectDropdown from "../../elements/MultiSelectDropdown";
import { groceryDepartments, OrderQty, sample, YesOrNO } from "../../data/constants";
import CardTitle from "../../elements/CardTitle";
import { Form } from "../ui/form";
import { CardContent } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { purchasePlanningFormSchema } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function PurchasePlanning() {
    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [textValue, setTextValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)
  
    const [selectedOption, setSelectedOption] = useState<string>('Select');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };


    const handleRetailValueChange = (values: { operation: string; from: string; to: string }) => {
        // console.log(values);
    };



    const form = useForm<z.infer<typeof purchasePlanningFormSchema>>({
        resolver: zodResolver(purchasePlanningFormSchema),
        defaultValues: {
          
        },
    });

    function onSubmit(values: z.infer<typeof purchasePlanningFormSchema>) {
        setIsLoading(true);
      //  console.log(values);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">

                    <HeaderComponents title='Purchase Planning' icon={FiPackage} />


                    <Card className="card-one mt-2">
                        <CardTitle title={'Search'} />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                        <SelectField control={form.control} label="Supplier" name="supplier" options={sample} />
                                        <InputField control={form.control} label="Order Date" type="date" name="orderDate" />
                                        <SelectField control={form.control} label="Plan Type" name="planType" options={sample} />
                                        <SelectField control={form.control} label="Status" name="status" options={sample} />
                                        <SelectField control={form.control} label="Store" name="store" options={sample} />
                                        <InputField control={form.control} label="Total Line Items" type="number" name="totalLineItems" />
                                        <InputField control={form.control} label="Expected Delivery Date" type="date" name="expectedDeliveryDate" />
                                        {/* <MultiSelectDropdown control={form.control} label="Department" name="department" options={groceryDepartments} /> */}
                                        <SelectField control={form.control} label="Order Quantity" name="orderQuantity" options={OrderQty} />
                                        <SelectField control={form.control} label="Promo Items" name="promoItems" options={sample} />
                                        <SelectField control={form.control} label="HHU & Basket Item" name="hhuBasketItem" options={YesOrNO} />
                                        <SelectField control={form.control} label="Customer Special Request Item" name="customerSpecialRequestItem" options={YesOrNO}/>
                                        <SelectField control={form.control} label="Price Marked Item Included" name="priceMarkedItemIncluded" options={YesOrNO}/>
                                        <SelectField control={form.control} label="Cheapest Plan" name="cheapestPlan" options={YesOrNO}/>
                                        <SelectField control={form.control} label="Fastest Delivery" name="fastestDelivery" options={YesOrNO} />
                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                                        <MultiInputField
                                            label="Total Margin"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                        />

                                        <MultiInputField
                                            label="Retail Value"
                                            operationOptions={["Between", "Greater than", "Less than"]}
                                            fromPlaceholder="£500"
                                            toPlaceholder="£15000"
                                            onChange={handleRetailValueChange}
                                        />
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
                        <Card.Body>
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
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
}
