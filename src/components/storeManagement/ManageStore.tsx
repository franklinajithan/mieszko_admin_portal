import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaStore } from "react-icons/fa";

import Header from "../../layouts/Header";
import HeaderComponents from "../../elements/HeaderSection";
import CardTitle from "../../elements/CardTitle";
import InputField from "../../elements/InputField";
import SelectField from "../../elements/SelectField";
import { sample, status } from "../../data/constants";



const ManageStore = () => {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [textValue, setTextValue] = useState<string>('');
    const [skin, setSkin] = useState(currentSkin);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('Select');
    const [storeInventory, setStoreInventory] = useState([...Array(10)].map((_, index) => ({
        productId: `PROD-${index + 1}`,
        productName: `Product ${index + 1}`,
        category: `Category ${index % 3 + 1}`,
        stockLevel: Math.floor(Math.random() * 100),
        unitCost: (Math.random() * 50).toFixed(2),
        totalValue: (Math.random() * 500).toFixed(2),
        lastRestocked: `2024-08-${index + 1}`
    })));

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const [selectedOption, setSelectedOption] = useState<string>('Select');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">
                    <HeaderComponents showList={{ title: 'Manage Store', search: true, new: true, delete: true, download: false, bookmark: false, setting: true, filter: true }} icon={FaStore} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Manage Store" />
                        <Card.Body>
                        <div className="flex justify-end space-x-4">
                                <button className="bg-custom-red text-white px-4 py-2 rounded-md">
                                    New Store
                                </button>
                                <button className="bg-custom-red text-white px-4 py-2 rounded-md">
                                    Edit Store 
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4 ">
                                <SelectField label="Store Name" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Store Code" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Status" options={status} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Ownership Type" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Postcode" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="City" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="license Type" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <InputField label="Expiry" type="date" defaultValue="2024-10-10" onChange={(e) => setTextValue(e.target.value)} />
                                <SelectField label="Company" options={sample} value={selectedOption} onChange={handleSelectChange} />
                                <SelectField label="Store Type" options={sample} value={selectedOption} onChange={handleSelectChange} />
                            </div>

                            <Card className="card-one mt-2">
                                <Card.Header>
                                    <Card.Title as="h6">Store List</Card.Title>

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

export default ManageStore;
