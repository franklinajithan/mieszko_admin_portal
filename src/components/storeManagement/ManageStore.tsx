import React, { useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPackage } from "react-icons/fi";
import HeaderComponents from "../../elements/HeaderSection";
import SelectField from "../../elements/SelectField";
import InputField from "../../elements/InputField";
import MultiDateField from "../../elements/MultiDateField";
import { sample, status } from "../../data/constants";
import CardTitle from "../../elements/CardTitle";
import { Card, Nav } from "react-bootstrap";
import { CardContent, CardHeader } from "../ui/card";
import { manageStoreFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../elements/GridTheme';

const ManageStore = () => {


    const { t } = useTranslation("global");
    const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenGrid, setIsOpenGrid] = useState(true);

    const toggleCardBody = () => {
        setIsOpenGrid(!isOpenGrid);
    };

    const rows: GridRowsProp = [
        { id: 1, storeName: 'SuperMart', address: '123 Main St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62701', contactNumber: '555-1234', managerName: 'John Doe', status: 'Open' },
        { id: 2, storeName: 'CityGrocer', address: '456 Elm St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62702', contactNumber: '555-5678', managerName: 'Jane Smith', status: 'Open' },
        { id: 3, storeName: 'MarketPlace', address: '789 Oak St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62703', contactNumber: '555-8765', managerName: 'Emily Johnson', status: 'Closed' },
        { id: 4, storeName: 'FreshFoods', address: '101 Pine St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62704', contactNumber: '555-4321', managerName: 'Michael Brown', status: 'Open' },
        { id: 5, storeName: 'DailyGoods', address: '202 Maple St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62705', contactNumber: '555-6789', managerName: 'Sarah Davis', status: 'Open' },
        { id: 6, storeName: 'ValueMart', address: '303 Birch St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62706', contactNumber: '555-3456', managerName: 'Chris Wilson', status: 'Open' },
        { id: 7, storeName: 'QuickShop', address: '404 Cedar St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62707', contactNumber: '555-2345', managerName: 'Jessica Moore', status: 'Closed' },
        { id: 8, storeName: 'UrbanMart', address: '505 Walnut St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62708', contactNumber: '555-9876', managerName: 'David Taylor', status: 'Open' },
        { id: 9, storeName: 'NeighborhoodMart', address: '606 Pine St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62709', contactNumber: '555-6543', managerName: 'Laura Anderson', status: 'Open' },
        { id: 10, storeName: 'ValueStore', address: '707 Fir St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62710', contactNumber: '555-5432', managerName: 'Tom Harris', status: 'Open' },
        { id: 11, storeName: 'BigMart', address: '808 Spruce St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62711', contactNumber: '555-8764', managerName: 'Nancy Clark', status: 'Open' },
        { id: 12, storeName: 'SmartShop', address: '909 Maple St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62712', contactNumber: '555-4320', managerName: 'Steven Lewis', status: 'Closed' },
        { id: 13, storeName: 'DailyMart', address: '1010 Oak St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62713', contactNumber: '555-3210', managerName: 'Amanda Walker', status: 'Open' },
        { id: 14, storeName: 'GroceryHub', address: '1111 Elm St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62714', contactNumber: '555-2109', managerName: 'James Scott', status: 'Open' },
        { id: 15, storeName: 'StoreZone', address: '1212 Birch St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62715', contactNumber: '555-1098', managerName: 'Elizabeth King', status: 'Open' },
        { id: 16, storeName: 'ShopMart', address: '1313 Cedar St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62716', contactNumber: '555-0987', managerName: 'Robert Young', status: 'Closed' },
        { id: 17, storeName: 'MetroMarket', address: '1414 Fir St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62717', contactNumber: '555-9875', managerName: 'Alice Adams', status: 'Open' },
        { id: 18, storeName: 'SuperStore', address: '1515 Spruce St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62718', contactNumber: '555-8763', managerName: 'Michael Carter', status: 'Open' },
        { id: 19, storeName: 'StorePlace', address: '1616 Walnut St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62719', contactNumber: '555-7654', managerName: 'Jennifer Evans', status: 'Open' },
        { id: 20, storeName: 'MarketCity', address: '1717 Maple St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62720', contactNumber: '555-6542', managerName: 'George Murphy', status: 'Closed' },
        { id: 21, storeName: 'GrandMart', address: '1818 Oak St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62721', contactNumber: '555-5431', managerName: 'Samantha Mitchell', status: 'Open' },
        { id: 22, storeName: 'ShopCentral', address: '1919 Elm St, Springfield', city: 'Springfield', state: 'IL', zipCode: '62722', contactNumber: '555-4329', managerName: 'William Rogers', status: 'Open' },
    ];

    // Column definitions for store management grid
    const columns: GridColDef[] = [
        { field: 'storeName', headerName: 'Store Name', width: 200 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 100 },
        { field: 'zipCode', headerName: 'ZIP Code', width: 120 },
        { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
        { field: 'managerName', headerName: 'Manager Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 100 },
    ];

    const form = useForm<z.infer<typeof manageStoreFormSchema>>({
        resolver: zodResolver(manageStoreFormSchema),
        defaultValues: {
            storeName: '',         // Default value for store name
            storeCode: '',         // Default value for store code
            status: '',            // Default value for status
            ownershipType: '',     // Default value for ownership type
            postcode: '',          // Default value for postcode
            city: '',              // Default value for city
            licenseType: '',       // Default value for license type
            expiry: '',            // Default value for expiry (date format)
            company: '',           // Default value for company
            storeType: '',         // Default value for store type
        }
    });

    const onSubmit = (data: any) => {
        // Handle form submission
        //console.log(data);
    };

    const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

    const handlePageSizeChange = (event: any) => {
        setPageSize(Number(event.target.value));
    };

    const customPagination = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Rows per ffpage:</span>
            <select className="mb-6" value={pageSize} onChange={handlePageSizeChange}>
                {[5, 10, 20, 50].map(size => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>
        </div>
    );

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">
                    <HeaderComponents title= 'Purchase Order' icon={FiPackage} />

                    <Card className="card-one mt-2">
                        {/* <CardTitle title={'Search'} /> */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                        <SelectField control={form.control} label="Store Name" name="storeName" options={sample} />
                                        <SelectField control={form.control} label="Store Code" name="storeCode" options={sample} />
                                        <SelectField control={form.control} label="Status" name="status" options={status} />
                                        <SelectField control={form.control} label="Ownership Type" name="ownershipType" options={sample} />
                                        <SelectField control={form.control} label="Postcode" name="postcode" options={sample} />
                                        <SelectField control={form.control} label="City" name="city" options={sample} />
                                        <SelectField control={form.control} label="License Type" name="licenseType" options={sample} />
                                        <InputField control={form.control} label="Expiry" name="expiry" type="text" />
                                        <SelectField control={form.control} label="Company" name="company" options={sample} />
                                        <SelectField control={form.control} label="Store Type" name="storeType" options={sample} />
                                    </div>


                                    <hr className="border-t border-gray-300" />



                                    <div className="flex justify-end space-x-4 mt-2 pr-4">
                                    <button className="btn-gray">
                                            Save
                                        </button>
                                        <Button type="submit" disabled={isLoading} className='btn-red'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>
                                            ) : "Submit"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </form>
                        </Form>
                    </Card>
                    <Card className="card-one mt-2">
                      
                        <CardTitle title="Store List" onToggle={toggleCardBody} isOpen={isOpenGrid} />
                     
                        
                        {isOpenGrid && (   <CardContent>


                            <div>
                                <div className="w-full mt-3"> {/* TailwindCSS classes for height and width */}
                                    <div className="h-full w-full"> {/* Container for DataGrid */}
                                        <div>
                                            <ThemeProvider theme={theme}>
                                                <DataGrid style={{ height: 650, width: '100%' }}
                                                //  disableColumnFilter
                                                //  disableColumnSelector
                                                //  disableDensitySelector
                                                    rowHeight={35}
                                                    rows={rows}
                                                    columns={columns}
                                                    initialState={{
                                                        pagination: {
                                                          paginationModel: { pageSize: 15, page: 0 },
                                                        },
                                                      }}
                                                    
                                                      slots={{ toolbar: GridToolbar }}
                                                      slotProps={{
                                                        toolbar: {
                                                          showQuickFilter: true,
                                                        },
                                                      }}
                                                />
                                            </ThemeProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>)}
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ManageStore;
