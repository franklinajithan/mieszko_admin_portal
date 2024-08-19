import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";

import Header from "../../layouts/Header";
import HeaderComponents from "../../elements/HeaderSection";
import CardTitle from "../../elements/CardTitle";
import InputField from "../../elements/InputField";
import SelectField from "../../elements/SelectField";

import { status, sample, groceryDepartments, Week } from "../../data/constants";

const OrderHistory = () => {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";

    const [skin, setSkin] = useState(currentSkin);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState('Select');
    const [orderHistory, setOrderHistory] = useState([...Array(10)].map((_, index) => ({
        orderNumber: `ORD-${index + 1}`,
        supplierCode: `SUP-${index + 1}`,
        itemCode: `ITEM-${index + 1}`,
        itemName: `Item ${index + 1}`,
        orderDate: `2024-08-${index + 1}`,
        quantity: Math.floor(Math.random() * 100),
        unitCost: (Math.random() * 50).toFixed(2),
        totalCost: (Math.random() * 500).toFixed(2)
    })));

    const handleSearchChange = (e:any) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectChange = (e:any) => {
        setSelectedOption(e.target.value);
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    <HeaderComponents showList={{ title: 'Order History', search: true, new: false, delete: false, download: false, bookmark: false, setting: false, filter: true }} icon={FiShoppingCart} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Order History" />
                        <Card.Body>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <InputField
                                    label="Search"
                                    type="text"
                                    placeholder="Search by Order Number, Supplier Code, or Item Code"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <SelectField label="Filter By Status" options={status} value={selectedOption} onChange={handleSelectChange} />
                            </div>
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
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default OrderHistory;
