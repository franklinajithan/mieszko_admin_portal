import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";

import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { vatFormSchema } from "@/lib/utils"; // Assuming this is your new VAT schema
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from 'lucide-react';
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { useNavigate } from "react-router-dom";
import CardTitle from "@/components/elements/CardTitle";
import { Form } from "@/components/ui/form";
import { getVat } from "@/service/configuration.service";
import { status } from "@/data/constants";
import { countries } from "@/data/enum";

const VatOverview = ({ title, icon }: any) => {
    const { t } = useTranslation("global");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState([]);

    const form = useForm<z.infer<typeof vatFormSchema>>({
        resolver: zodResolver(vatFormSchema),
        defaultValues: {
            vatId: '',
            vatCode: '23423',
            vatRate: 10,
            description: null,
            effectiveFrom: new Date('2024-05-20'),
            effectiveTo: null,
            countryCode: null,
            status: true,
        },
    });

    const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
        vatId: true,
        vatRate: true,
        vatType: true,
        effectiveDate: true,
        expirationDate: true,
        description: true,
    });


    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getVat();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }
                setRows(result.data.data);

            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }, []);

    const onSubmit = (data: any) => {
        // Handle form submission
    };

    // Column definitions for VAT management grid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'VAT ID', flex: 1 },
        { field: 'vatCode', headerName: 'VAT Code', flex: 1 }, // Changed to 'VAT Code'
        { field: 'vatRate', headerName: 'VAT Rate', flex: 1 }, // Changed to 'VAT Rate'
        { field: 'description', headerName: 'Description', flex: 1 }, // Changed to 'Description'
        { field: 'effectiveFrom', headerName: 'Effective From', flex: 1 }, // Changed to 'Effective From'
        { field: 'effectiveTo', headerName: 'Effective To', flex: 1 }, // Changed to 'Effective To'
        { field: 'countryCode', headerName: 'Country Code', flex: 1 }, // Changed to 'Country Code'
        { field: 'status', headerName: 'Status', flex: 1 } // Changed to 'Status'
    ];

    return (
        <React.Fragment>
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Search VAT" />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                                        {/* <InputField control={form.control} label="VAT ID" name="vatId" type="text" /> */}
                                        <InputField control={form.control} label="VAT Code" name="vatCode" type="text" />
                                        <InputField control={form.control} label="VAT Rate (%)" name="vatRate" type="number" />
                                        {/* <InputField control={form.control} label="Description" name="description" type="text" />
                                        <InputField control={form.control} label="Effective From" name="effectiveFrom" type="date" />
                                        <InputField control={form.control} label="Effective To" name="effectiveTo" type="date" /> */}
                                          <SelectField control={form.control} label="Country" name="country" options={countries} />
                                        <SelectField control={form.control} label="Status" name="status" options={status} />
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-4  ">
                                        <Button type="submit" disabled={isLoading} className='btn-cyan'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>
                                            ) : "Search"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </form>

                        </Form>
                    </Card>

                    <Card className="card-one mt-2">
                        <CardTitle title="VAT List" />

                        <CardContent>
                            <Button type="submit" className='btn-cyan mt-2' onClick={() => navigate('/vat/new-vat')}>
                                New Vat Entry
                            </Button>
                            <div className="w-full mt-3">

                                <ThemeProvider theme={theme}>
                                    <DataGrid
                                        style={{ height: 650, width: '100%' }}
                                        rowHeight={35}
                                        rows={rows}
                                        columns={columns}
                                        columnVisibilityModel={columnVisibility}
                                        onColumnVisibilityModelChange={(newModel) =>
                                            setColumnVisibility(newModel)
                                        }
                                        pageSizeOptions={[15, 25, 50]}
                                        pagination
                                    />
                                </ThemeProvider>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};


export default VatOverview