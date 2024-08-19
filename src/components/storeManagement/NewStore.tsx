import React, { useState } from 'react';
import Header from '../../layouts/Header';

const ManageStoreDetails: React.FC = () => {
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [skin, setSkin] = useState(currentSkin);
    const [formData, setFormData] = useState({
        ownerName: '',
        registeredNo: '',
        storeName: '',
        storeCode: '',
        address: '',
        state: '',
        country: '',
        city: '',
        gstNo: '',
        email: '',
        mobile: '',
        area: '',
        company: '',
        licenseKey: '',
        agent: '',
        licenseType: '',
        salesEmail: '',
        thankYouMessage: '',
        footerText: '',
        vatUpdate: '',
        isAutoInvoice: false,
        isIncludeVat: false,
        isAutoList: false,
        isEnableStockVisibility: false,
        isOnStoreTransfer: false,
        invoiceSize: '',
        paymentDetails: [{ po: '', supplier: '', invoiceNo: '', amount: '', vat: '', total: '' }],
        storeItemMapping: { scanCode: '', itemCode: '', rfid: '', itemName: '', nickName: '' },
        assignedItems: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file upload logic
    };

    const addPaymentDetailRow = () => {
        setFormData({
            ...formData,
            paymentDetails: [
                ...formData.paymentDetails,
                { po: '', supplier: '', invoiceNo: '', amount: '', vat: '', total: '' },
            ],
        });
    };

    const handlePaymentDetailChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedDetails = formData.paymentDetails.map((detail, i) =>
            i === index ? { ...detail, [e.target.name]: e.target.value } : detail
        );
        setFormData({ ...formData, paymentDetails: updatedDetails });
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="min-h-screen bg-gray-50 p-6">



                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Manage Store Details</h2>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Owner Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Registered No */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Registered No</label>
                                    <input
                                        type="text"
                                        name="registeredNo"
                                        value={formData.registeredNo}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Store Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Store Name</label>
                                    <input
                                        type="text"
                                        name="storeName"
                                        value={formData.storeName}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Store Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Store Code</label>
                                    <input
                                        type="text"
                                        name="storeCode"
                                        value={formData.storeCode}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* GST No */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">GST No</label>
                                    <input
                                        type="text"
                                        name="gstNo"
                                        value={formData.gstNo}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Area</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* License Key */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">License Key</label>
                                    <input
                                        type="text"
                                        name="licenseKey"
                                        value={formData.licenseKey}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Agent */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Agent</label>
                                    <input
                                        type="text"
                                        name="agent"
                                        value={formData.agent}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* License Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">License Type</label>
                                    <input
                                        type="text"
                                        name="licenseType"
                                        value={formData.licenseType}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Sales Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sales Email</label>
                                    <input
                                        type="email"
                                        name="salesEmail"
                                        value={formData.salesEmail}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Thank You Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Thank You Message</label>
                                    <input
                                        type="text"
                                        name="thankYouMessage"
                                        value={formData.thankYouMessage}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Footer Text */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Footer Text</label>
                                    <input
                                        type="text"
                                        name="footerText"
                                        value={formData.footerText}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* VAT Update */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VAT Update</label>
                                    <input
                                        type="text"
                                        name="vatUpdate"
                                        value={formData.vatUpdate}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Logo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                                    <input
                                        type="file"
                                        name="logo"
                                        onChange={handleFileUpload}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Configuration */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Configuration</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isAutoList"
                                            name="isAutoList"
                                            checked={formData.isAutoList}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isAutoList" className="text-sm font-medium text-gray-700">
                                            Auto List
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isAutoInvoice"
                                            name="isAutoInvoice"
                                            checked={formData.isAutoInvoice}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isAutoInvoice" className="text-sm font-medium text-gray-700">
                                            Auto Invoice
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isEnableStockVisibility"
                                            name="isEnableStockVisibility"
                                            checked={formData.isEnableStockVisibility}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isEnableStockVisibility" className="text-sm font-medium text-gray-700">
                                            Enable Stock Visibility
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isOnStoreTransfer"
                                            name="isOnStoreTransfer"
                                            checked={formData.isOnStoreTransfer}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isOnStoreTransfer" className="text-sm font-medium text-gray-700">
                                            On Store Transfer
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isIncludeVat"
                                            name="isIncludeVat"
                                            checked={formData.isIncludeVat}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isIncludeVat" className="text-sm font-medium text-gray-700">
                                            Include VAT Invoice
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Size */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Invoice Size</h3>
                                <div className="flex items-center gap-4">
                                    <label className="block text-sm font-medium text-gray-700">Size:</label>
                                    <input
                                        type="text"
                                        name="invoiceSize"
                                        value={formData.invoiceSize}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Payment Details</h3>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">PO#</th>
                                            <th className="border p-2">Supplier</th>
                                            <th className="border p-2">Invoice No</th>
                                            <th className="border p-2">Amount</th>
                                            <th className="border p-2">VAT%</th>
                                            <th className="border p-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.paymentDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="po"
                                                        value={detail.po}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="supplier"
                                                        value={detail.supplier}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="invoiceNo"
                                                        value={detail.invoiceNo}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        value={detail.amount}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="vat"
                                                        value={detail.vat}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="text"
                                                        name="total"
                                                        value={detail.total}
                                                        onChange={(e) => handlePaymentDetailChange(index, e)}
                                                        className="w-full p-1"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    type="button"
                                    onClick={addPaymentDetailRow}
                                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                                >
                                    Add Row
                                </button>
                            </div>

                            {/* Store Item Mapping */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Store Item Mapping</h3>
                                <div className="grid grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Scan Code</label>
                                        <input
                                            type="text"
                                            name="scanCode"
                                            value={formData.storeItemMapping.scanCode}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Item Code</label>
                                        <input
                                            type="text"
                                            name="itemCode"
                                            value={formData.storeItemMapping.itemCode}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">RFID</label>
                                        <input
                                            type="text"
                                            name="rfid"
                                            value={formData.storeItemMapping.rfid}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                        <input
                                            type="text"
                                            name="itemName"
                                            value={formData.storeItemMapping.itemName}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nick Name</label>
                                        <input
                                            type="text"
                                            name="nickName"
                                            value={formData.storeItemMapping.nickName}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button className="p-2 bg-blue-500 text-white rounded">Close From Other Store</button>
                                    <button className="p-2 bg-blue-500 text-white rounded">Upload</button>
                                    <button className="p-2 bg-blue-500 text-white rounded">Download</button>
                                    <button className="p-2 bg-blue-500 text-white rounded">Assign</button>
                                    <button className="p-2 bg-blue-500 text-white rounded">Configure as Main Item</button>
                                </div>
                            </div>

                            {/* Assigned Items */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Assigned Items</h3>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">PO#</th>
                                            <th className="border p-2">Supplier</th>
                                            <th className="border p-2">Invoice No</th>
                                            <th className="border p-2">Amount</th>
                                            <th className="border p-2">VAT%</th>
                                            <th className="border p-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.paymentDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">{detail.po}</td>
                                                <td className="border p-2">{detail.supplier}</td>
                                                <td className="border p-2">{detail.invoiceNo}</td>
                                                <td className="border p-2">{detail.amount}</td>
                                                <td className="border p-2">{detail.vat}</td>
                                                <td className="border p-2">{detail.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
};

export default ManageStoreDetails;
