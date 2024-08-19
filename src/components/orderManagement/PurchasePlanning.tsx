import React, { useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { Card, Nav } from "react-bootstrap";
import HeaderComponents from "../../elements/HeaderSection";
import SelectField from "../../elements/SelectField";
import InputField from "../../elements/InputField";
import MultiInputField from "../../elements/MultiInputField";

import MultiSelectDropdown from "../../elements/MultiSelectDropdown";
import { groceryDepartments, OrderQty, sample, YesOrNO } from "../../data/constants";
import CardTitle from "../../elements/CardTitle";

export default function PurchasePlanning() {
    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [textValue, setTextValue] = useState<string>('');
    const [showList, setShowList] = useState({
        title: 'Purchase Planning',
        search: true,
        new: true,
        delete: true,
        download: true,
        bookmark: true,
        setting: true,
        filter: true
    });
    const [selectedOption, setSelectedOption] = useState<string>('Select');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };


    const handleRetailValueChange = (values: { operation: string; from: string; to: string }) => {
        console.log(values);
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    {/* Header */}
                    <HeaderComponents showList={showList} icon={FiShoppingCart} />

                    {/* Search Filters */}
                    <Card className="card-one mt-2">
                        <CardTitle title={'Search'} />
                        <Card.Body>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">




                                <SelectField label="Supplier" options={sample} value={selectedOption} onChange={handleSelectChange} />

                                <InputField label="Order Date" type="date" defaultValue="2024-10-10" onChange={(e) => setTextValue(e.target.value)} />


                                <SelectField label="Plan Type" options={sample} value={selectedOption} onChange={handleSelectChange} />

                                <SelectField label="Status" options={sample} value={selectedOption} onChange={handleSelectChange} />


                                <SelectField label="Store" options={sample} value={selectedOption} onChange={handleSelectChange} />

                                <InputField label="Total Line Items" type="number" value={"1010"} onChange={(e) => setTextValue(e.target.value)} />

                                <InputField label="Expected Delivery Date" type="date" defaultValue="2024-10-10" onChange={(e) => setTextValue(e.target.value)} />


                                <MultiSelectDropdown label="Department" options={groceryDepartments} />

                                <SelectField label="Store" options={OrderQty} value={selectedOption} onChange={handleSelectChange} />


                                <SelectField label="Promo Items" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="HHU & Basket Item" options={YesOrNO} value={selectedOption} onChange={handleSelectChange} />

                                <SelectField label="Customer Special Request Item" options={YesOrNO} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Price Marked Item Included" options={YesOrNO} value={selectedOption} onChange={handleSelectChange} />

                                <SelectField label="Cheapest Plan" options={YesOrNO} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Fastest Delivery" options={YesOrNO} value={selectedOption} onChange={handleSelectChange} />




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
                            <div className="flex justify-end space-x-4 mt-6">

                                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center">
                                    <i className="ri-close-circle-line mr-2"></i> Cancel
                                </button>

                                <button className="bg-custom-red text-white px-4 py-2 rounded-md flex items-center">
                                    <i className="ri-search-line mr-2"></i> Search
                                </button>
                            </div>
                        </Card.Body>
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
