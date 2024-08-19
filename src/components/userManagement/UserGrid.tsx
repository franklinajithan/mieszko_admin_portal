import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark, FiUsers } from "react-icons/fi";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import HeaderComponents from "../../elements/HeaderSection";




export default function UserGrid() {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [skin, setSkin] = useState(currentSkin);
    const [showList, setShowList] = useState(
        { title: 'User Grid', search: true, new: true, delete:true, download: true, bookmark: true, setting: true, filter: true }
    );
    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    {/* Header */}
                    <HeaderComponents showList={showList} icon={FiUsers} />


                    <Card className="card-one mt-2">
                        <Card.Header>
                            <Card.Title as="h6">Search</Card.Title>
                            <Nav className="nav-icon nav-icon-sm ms-auto">
                                <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                            </Nav>
                        </Card.Header>
                        <Card.Body className="pb-4">
                            <div className="grid grid-cols-4 gap-4 pb-2">

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium">Role</label>
                                    <input
                                        type="text"
                                        placeholder="Select Role"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>


                                <div className="col-span-1">
                                    <label className="block text-sm font-medium">Type</label>
                                    <input
                                        type="text"
                                        placeholder="Select Type"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium">Reporting</label>
                                    <input
                                        type="text"
                                        placeholder="Select Reporting"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium">Status</label>
                                    <input
                                        type="text"
                                        placeholder="Select Status"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-4 gap-4 pb-2">
                                <div className="border p-2 rounded-md flex justify-center items-center">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="caseBased"
                                            name="quantityType"
                                            className="mr-2"
                                        />
                                        <label htmlFor="caseBased" className="mr-4">Users Access to POS</label>

                                        <input
                                            type="radio"
                                            id="qtyBased"
                                            name="quantityType"
                                            className="mr-2"
                                            defaultChecked
                                        />
                                        <label htmlFor="qtyBased">User Access to Mobile</label>
                                    </div>
                                </div></div>
                        </Card.Body>
                    </Card>

                    <Card className="card-one mt-2">
                        <Card.Header>
                            <Card.Title as="h6">Grid</Card.Title>
                            <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                            </Nav>
                        </Card.Header>
                        <Card.Body>



                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                                            <th className="p-2 border-b">#</th>
                                            <th className="p-2 border-b">Role Name</th>
                                            <th className="p-2 border-b">Role Type</th>
                                            <th className="p-2 border-b">Reporting to Hierarchy</th>
                                            <th className="p-2 border-b">Module</th>
                                            <th className="p-2 border-b">Created Date</th>
                                            <th className="p-2 border-b">Allowed User Creation for Roles</th>
                                            <th className="p-2 border-b">Description</th>
                                            <th className="p-2 border-b">Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(10)].map((_, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                <td className="p-2 border-b">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="p-2 border-b">Inventory Manager</td>
                                                <td className="p-2 border-b">Management</td>
                                                <td className="p-2 border-b">Operations Manager</td>
                                                <td className="p-2 border-b">Inventory Management</td>
                                                <td className="p-2 border-b">2024-01-03</td>
                                                <td className="p-2 border-b">Yes</td>
                                                <td className="p-2 border-b">
                                                    The Cashier role is responsible for processing transactions at the Point of Sale.
                                                </td>
                                                <td className="p-2 border-b">Yes</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
