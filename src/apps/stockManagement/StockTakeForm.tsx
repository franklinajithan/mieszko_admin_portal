import { Form } from '@/components/ui/form';
import { ModeType } from '@/data/enum';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import { CardContent } from '@/components/ui/card';
import InputField from '@/components/elements/InputField';
import SelectField from '@/components/elements/SelectField';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { stockTakeFormSchema } from '@/lib/utils';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { status } from '@/data/constants'
import { countries } from '@/data/enum'
import { Select } from '@/components/ui/select';
import { ThemeProvider } from 'react-bootstrap';
import { DataGrid, GridActionsCell, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowModes, GridRowModesModel, GridToolbar } from '@mui/x-data-grid';
import theme from "@/components/elements/GridTheme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TextAreaField from '@/components/elements/TextareaField';

interface StockTakeFormProps {
    type: ModeType;
    id?: string;
}

const StockTakeForm = ({ type, id }: StockTakeFormProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [productCategoryList, setProductCategoryList] = useState([]);
    const [rows, setRows] = useState([]);

    const form = useForm<z.infer<typeof stockTakeFormSchema>>({
        resolver: zodResolver(stockTakeFormSchema),
        defaultValues: {
            itemCode: '',
            barcode: '',
            itemName: '',
            qty: '',
            category: '',
            notes: '',
            status: true,
        },
    });
    const { handleSubmit, formState, reset, setValue } = form;

    const onSubmit = async (data: z.infer<typeof stockTakeFormSchema>) => {

        setIsLoading(true);

        let result: any


    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                            <InputField control={form.control} label="Item Code" name="itemCode" type="text" placeholder='Enter Item Code' />
                            <InputField control={form.control} label="Barcode" name="barcode" type="text" placeholder='Enter Barcode' />
                            <InputField control={form.control} label="Item Name" name="itemName" type="text" placeholder='Enter Item Name' />
                            <InputField control={form.control} label="Supplier Code" name="supplierCode" type="text" placeholder='Enter Supplier Code' />

                            {/* <InputField control={form.control} label="Qty" name="qty" type="text" placeholder='Enter Quantity' /> */}
                            <SelectField control={form.control} label="Category" name="category" options={productCategoryList} />
                            {/* <TextAreaField
                                control={form.control}
                                label="Notes"
                                name="notes"
                                placeholder='Enter notes'
                                rows={5}
                                cols={50}
                            /> */}
                            {/* <InputField control={form.control} label="City" name="city" type="text" placeholder='Enter city' />
                            <InputField control={form.control} label="State" name="state" type="text" placeholder='Enter state' />
                            <InputField control={form.control} label="Postcode" name="postcode" type="text" placeholder='Enter postcode' />
                            <SelectField control={form.control} label="Country" name="country" options={countries} />
                            <InputField control={form.control} label="Phone" name="phone" type="text" placeholder='Enter phone number' />
                            <InputField control={form.control} label="Email" name="email" type="email" placeholder='Enter email' />
                            <InputField control={form.control} label="Website" name="website" type="url" placeholder='Enter website' />
                            <InputField control={form.control} label="Logo" name="logo" type="text" placeholder='Enter logo URL' />
                            <SelectField control={form.control} label="Status" name="status" options={status} /> */}

                        </div>

                        <div className="grid grid-cols-1 mt-4">
                            <TextAreaField
                                control={form.control}
                                label="Notes"
                                name="notes"
                                placeholder='Enter notes'
                                rows={5}
                                cols={50}
                            />

                        </div>
                        <hr className="border-t border-zinc-300 " />





                        <div className="flex justify-end space-x-4  mt-2 pr-4">
                            <button className="btn-zinc">
                                Cancel
                            </button>
                            <Button type="submit" disabled={isLoading} className='btn-cyan'>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                    </>)
                                    : "Search"}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </>
    )
}

export default StockTakeForm
