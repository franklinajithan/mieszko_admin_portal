import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark, FiShoppingCart } from "react-icons/fi";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";




export default function ProductGrid() {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [skin, setSkin] = useState(currentSkin);

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">


                <div className="min-h-screen bg-gray-50 p-6">
                    {/* Header */}
                    <header className="flex items-center justify-between bg-white p-2 shadow-md border-b-4 border-red-600">
                        <div className="flex items-center space-x-2">
                            <div className="bg-red-600 p-2 rounded">
                                <span className="text-white font-bold text-xl"><FiShoppingCart /></span>
                            </div>
                            <h2 className="text-lg font-semibold">Purchase Planning</h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-600 hover:text-gray-800">
                                <FaSearch className="mr-1" />
                                <span>Search</span>
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-gray-800">
                                <FaPlus className="mr-1" />
                                <span>New</span>
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-gray-800">
                                <FaTrash className="mr-1" />
                                <span>Delete</span>
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <FiDownload />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <FiBookmark />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <FiSettings />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <FiFilter />
                            </button>
                        </div>
                    </header>

                    {/* Search Filters */}
                    <div className="bg-white p-6 rounded-md shadow-md">


                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Search</Card.Title>
                                <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                    <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                                    {/* Supplier */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Supplier</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Supplier</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Order Date */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Order Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            defaultValue="2023-12-12"
                                        />
                                    </div>

                                    {/* Plan Type */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Plan Type</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Plan Type</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Status</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Status</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Net cost */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Net cost</label>
                                        <div className="flex space-x-2">
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>Greater Than</option>
                                                <option>Less Than</option>
                                                {/* Add options here */}
                                            </select>
                                            <input type="number" placeholder="From" className="w-full p-2 border border-gray-300 rounded-md" />
                                            <input type="number" placeholder="To" className="w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                    </div>

                                    {/* Store */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Store</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Store</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Total Line Items */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Total Line Items</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Total Line Items</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Expected Delivery Date */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Expected Delivery Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            defaultValue="2024-10-10"
                                        />
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Department</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select Department</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Case Or Unit Order */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Case Or Unit Order</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Case</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Promo Items */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Promo Items</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Promo Items</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* HHU & Basket Item */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">HHU & Basket Item</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Yes / No</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Customer Special Request Item */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Customer Special Request Item</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Yes / No</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Price Marked Item Included */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Price Marked Item Included</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Yes / No</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Cheapest Plan */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Cheapest Plan</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Yes / No</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>

                                    {/* Fastest Delivery */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Fastest Delivery</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Yes / No</option>
                                            {/* Add options here */}
                                        </select>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>




                    </div>

                    {/* Table */}
                    <div className="bg-white p-4 rounded-md shadow-md">


                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Purchase Paln List</Card.Title>
                                <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                    <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
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
            </div>
        </React.Fragment>
    );
}
