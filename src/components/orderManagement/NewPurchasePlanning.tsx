import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";

import Header from "../../layouts/Header";
import HeaderComponents from "../../elements/HeaderSection";
import CardTitle from "../../elements/CardTitle";
import InputField from "../../elements/InputField";
import SelectField from "../../elements/SelectField";
import MultiSelectDropdown from "../../elements/MultiSelectDropdown";

import { status, sample, groceryDepartments, Week } from "../../data/constants";
import CheckboxField from "../../elements/CheckboxField";
import RadioField from "../../elements/RadioField";

const NewPurchasePlanning = () => {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";

    const [skin, setSkin] = useState(currentSkin);


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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    <HeaderComponents showList={showList} icon={FiShoppingCart} />

                    <Card className="card-one mt-2">
                        <CardTitle title="General" />
                        <Card.Body>
                            <div className="grid grid-cols-4 gap-4">
                                <InputField label="Document No" type="text"  disabled />
                                <InputField label="Store No" type="text"  disabled />
                                <InputField label="Related WH Location" type="text"  disabled />

                                <SelectField label="Plan Type" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Supplier" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Plan Type" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Add Ons" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Add Ons" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Lead Times" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <InputField label="Expected Delivery Date" type="date" />
                                <SelectField label="Lead Times" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Brand" options={sample} value={selectedOption} onChange={handleSelectChange}/>
                                <SelectField label="Status" options={status} value={selectedOption} onChange={handleSelectChange}/>
                                <MultiSelectDropdown label="Department" options={groceryDepartments} />
                                <InputField label="Comments" type="text"  />
                            </div>
                        </Card.Body>

                        <hr className="border-t border-gray-300" />

                        <CardTitle title="Sales by Date Section" />
                        <Card.Body>
                            <div className="flex gap-4">
                                <div className="grid grid-cols-2 gap-4 w-1/3">
                                    <InputField label="Period 1 Start Date" type="date"  />
                                    <InputField label="Period 1 End Date" type="date"  />
                                    <InputField label="Period 2 Start Date" type="date" defaultValue="2024-10-10" />
                                    <InputField label="Period 2 End Date" type="date" defaultValue="2024-10-10" />
                                </div>

                                <div className="grid grid-cols-4 gap-4 w-2/3">
                                    <CheckboxField id="Is Scheduled" label="Current stock" className="mt-2" />
                                    <SelectField label="Schedule Day" options={Week} value={selectedOption} onChange={handleSelectChange}/>
                                    <InputField label="Time" type="time" />
                                    <InputField label="Email" type="email" />
                                    <CheckboxField id="currentStock" label="Current stock" />
                                    <CheckboxField id="rtcSales" label="RTC sales" />
                                    <CheckboxField id="wastage" label="Wastage" />
                                    <CheckboxField id="promoSales" label="Promo items sales" />
                                    <CheckboxField id="itemsBasket" label="Items from basket" />
                                    <CheckboxField id="hhuItems" label="HHU Items" />
                                    <CheckboxField id="considerOrder" label="Consider On Order" />
                                    <CheckboxField id="considerSales" label="Consider Sales" />

                                    <RadioField id="fastestDelivery" name="deliveryType" value="fastest" checked={deliveryType === "fastest"} onChange={() => setDeliveryType("fastest")} label="Fastest Delivery" />
                                    <RadioField id="cheapestDelivery" name="deliveryType" value="cheapest" checked={deliveryType === "cheapest"} onChange={() => setDeliveryType("cheapest")} label="Cheapest Delivery" />

                                    <RadioField id="caseBased" name="quantityType" label="Case based" />
                                    <RadioField id="qtyBased" name="quantityType" label="Qty Based" defaultChecked />
                                    <CheckboxField id="selfLife" label="Self Life" />

                                </div>

                            </div>
                          

                            <div className="flex justify-end space-x-4 mt-6">
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                                    Save
                                </button>
                                <button className="bg-custom-red text-white px-4 py-2 rounded-md">
                                    Submit
                                </button>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="card-one mt-2">
                        <Card.Header>
                            <Card.Title as="h6">Purchase Plan List</Card.Title>
                            <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <div className="space-y-6">
                                <div className="grid grid-cols-4 gap-4 pb-2">
                                    <InputField type="text" label="Supplier Code" placeholder="Supplier Code" />
                                    <InputField type="text" label="Item Code" placeholder="Item Code" />
                                    <InputField type="text" label="Item Name" placeholder="Item Name" />
                                    <InputField type="text" label="EAN / PLU" placeholder="EAN / PLU" />
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
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};




export default NewPurchasePlanning;
