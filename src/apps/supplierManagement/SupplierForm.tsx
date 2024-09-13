import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Card } from '@mui/material';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import MenuItem from '@/components/elements/MenuItem';
import { editProductFormSchema, supplierFormSchema } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import InputField from '@/components/elements/InputField';
import CheckboxField from '@/components/elements/CheckboxField';
import SelectField from '@/components/elements/SelectField';
import { countries, invoiceTypes, supplierCreditScores, supplierTypes, uomList } from '@/data/enum';

// Removed unused imports
// Removed useEffect since it's not used

export const SupplierForm = ({ type }: any) => {
    const [activeItem, setActiveItem] = useState("Basic");
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        supplier_id:"",
        short_code: "",
        supplier_logo:"",
        supplier_name: "",
        contact_person_name: "",
        supplier_email: "",
        email_cc: "",
        supplier_phone: "",
        supplier_fax:"",
        supplier_website: "",
        web_portal: "",
        supplier_address: "",
        supplier_city:"",
        supplier_postcode: "",
        supplier_state:"",
        supplier_country: "GB", // Defaulting to a country code
        supplier_type: "distributor", // Assuming 'edi' as a default
        posting_group: "Group A",
        credit_score: "excellent",
        supplier_status: true,
        created_by: 1, // Assuming the creator is logged in user
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        supplier_details: [
            {
                order_cc: "",
                order_bcc: "",
                order_uom: "case", // Default UOM
                order_email: "",
                invoice_type: "email", // Default invoice type
                max_order_qty: "",
                min_order_qty: "",
                delivery_charge: "",
                has_ftp_account: true,
                max_order_value: "",
                min_order_value: "",
                is_cash_accepted: false,
                is_main_supplier: true,
                can_accept_return: true,
                is_daily_supplier: false,
                can_schedule_order: false,
                is_rebate_supplier: false,
                order_status_email: "",
                is_any_special_price: false,
                order_placement_type: "ftp",
                pay_out_amount_limit: "",
                can_raise_credit_note: true,
                is_pre_payment_needed: false,
                can_place_multiple_order: true,
                can_be_paid_out_from_till: false,
                free_delivery_order_value: "",
                will_receive_delivery_note: false,
                can_order_price_marked_item: true,
                can_be_part_of_purchase_plan: true,
                no_of_delivery_notes_to_be_merged: "",
                can_be_considered_for_fastest_supplier: false,
                can_be_considered_for_cheapest_supplier: false,
                need_to_check_pallet_price_before_order: true,
            },
        ],
        ftp_data: [
            {
                ftpUrl: "",
                ftpType: "invoice",
                autoDelete: false,
                ftpPassword: "",
                ftpUsername: "",
                autoDownload: true,
                sellerBuyerId: "",
                connectionName: "",
                autoDownloadTime: "10:00:00",
            }
        ],
        price_rules: [
            {
                margin: 0,
                endDate: "",
                startDate: "",
                categoryId: "",
                roundValue1: 0,
                roundValue2: 0,
                categoryName: "",
                roundConcept: "round up",
            },
        ],
        delivery_schedules: [
            {
                endTime: "",
                orderDay: "",
                startTime: "",
                deliveryDay: "",
                scheduledType: "no of days",
                extendedLeadTime: "0",
                standardLeadTime: "0",
                promotionLeadTime: "0",
            },
        ],
        categories: [
            {
                isPLU: false,
                level: 1,
                pluCode: "",
                parentId: "",
                categoryName: "",
                canAssignItems: true,
                translatedName: "",
            },
        ],
        agents: [
            {
                agentName: "",
                agentEmail: "",
                agentPhone: "",
                agentWhatsapp: "",
            },
        ],
    };

    const form = useForm({
        resolver: zodResolver(supplierFormSchema),
        defaultValues,
    });

    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;
    const { toast } = useToast(); // Destructured useToast hook

    const handleMenuItemClick = (item: string) => {
        setActiveItem(item);
    };

    const onSubmit = async (values: any) => {
        debugger;
        setIsLoading(true);
        try {
            // Implement your submit logic here
        } catch (e: any) {
            toast({ variant: "destructive", title: e.response?.status ?? "Error", description: e.response?.data?.message ?? "An error occurred", duration: 800 });
        } finally {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }
    };


    const removeFtpData = (index: number) => {
        const currentFtpData = form.getValues('ftp_data') || [];
        form.setValue('ftp_data', currentFtpData.filter((_, i) => i !== index));
    };

    const addFtpData = () => {
        // Retrieve current ftp_data or default to an empty array
        const currentFtpData = form.getValues('ftp_data') || [];

        // Define new FTP data
        const newFtpData = {
            ftpUrl: '',
            ftpType: '',
            autoDelete: false,
            ftpPassword: '',
            ftpUsername: '',
            autoDownload: false,
            sellerBuyerId: '',
            connectionName: '',
            autoDownloadTime: '',
        };

        // Set the new value at the start of the array
        form.setValue('ftp_data', [newFtpData, ...currentFtpData]);
    };

    return (
        <div>
            <Card className="card-one mt-2">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="mt-2">
                                <div className="md:flex">
                                    <ul className="flex-col space-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:me-4 mb-4 md:mb-0">
                                        <MenuItem href="#" text="Basic" isActive={activeItem === "Basic"} onClick={() => handleMenuItemClick("Basic")} />
                                        <MenuItem href="#" text="Details" isActive={activeItem === "Details"} onClick={() => handleMenuItemClick("Details")} />
                                        <MenuItem href="#" text="FTP" isActive={activeItem === "FTP"} onClick={() => handleMenuItemClick("FTP")} />
                                        <MenuItem href="#" text="Agents" isActive={activeItem === "Agents"} onClick={() => handleMenuItemClick("Agents")} />
                                        <MenuItem href="#" text="Price" isActive={activeItem === "Price"} onClick={() => handleMenuItemClick("Price")} />
                                        <MenuItem href="#" text="Delivery" isActive={activeItem === "Delivery"} onClick={() => handleMenuItemClick("Delivery")} />
                                      
                                    </ul>
                                    <div className="p-3 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">
                                        {activeItem === "Basic" && (
                                            <>
                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                    <InputField control={form.control} label="Supplier ID" name="supplier_id" type="number" placeholder="Enter Supplier ID" required/>
                                                    <InputField control={form.control} label="Short Code" name="short_code" type="text" placeholder="Enter Short Code" required/>
                                                    <InputField control={form.control} label="Supplier Logo" name="supplier_logo" type="text" placeholder="Upload Supplier Logo" />
                                                    <InputField control={form.control} label="Supplier Name" name="supplier_name" type="text" placeholder="Enter Supplier Name" required/>
                                                    <InputField control={form.control} label="Contact Person Name" name="contact_person_name" type="text" placeholder="Enter Contact Person Name" />
                                                    <InputField control={form.control} label="Supplier Email" name="supplier_email" type="email" placeholder="Enter Supplier Email" />
                                                    <InputField control={form.control} label="Email CC" name="email_cc" type="email" placeholder="Enter Email CC" />
                                                    <InputField control={form.control} label="Supplier Phone" name="supplier_phone" type="tel" placeholder="Enter Supplier Phone" />
                                                    <InputField control={form.control} label="Supplier Fax" name="supplier_fax" type="text" placeholder="Enter Supplier Fax" />
                                                    <InputField control={form.control} label="Supplier Website" name="supplier_website" type="url" placeholder="Enter Supplier Website" />
                                                    <InputField control={form.control} label="Web Portal" name="web_portal" type="url" placeholder="Enter Web Portal" />
                                                    <InputField control={form.control} label="Supplier Address" name="supplier_address" type="text" placeholder="Enter Supplier Address" />
                                                    <InputField control={form.control} label="Supplier City" name="supplier_city" type="text" placeholder="Enter Supplier City" />
                                                    <InputField control={form.control} label="Supplier Postcode" name="supplier_postcode" type="text" placeholder="Enter Supplier Postcode" />
                                                    <InputField control={form.control} label="Supplier State" name="supplier_state" type="text" placeholder="Enter Supplier State" />
                                                    <SelectField control={form.control} label="Supplier Country" name="supplier_country" options={countries} />
                                                    <SelectField control={form.control} label="Supplier Type" name="supplier_type" options={supplierTypes} />
                                                    <InputField control={form.control} label="Posting Group" name="posting_group" type="text" placeholder="Enter Posting Group" />
                                                    <SelectField control={form.control} label="Credit Score" name="credit_score" options={supplierCreditScores}/>
                                                    <CheckboxField control={form.control} label="Supplier Status" name="supplier_status" />
                                                </div>
                                            </>
                                        )}

                                        {activeItem === "Details" && (
                                            <>
                                                {form.watch('supplier_details')?.map((detail, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <InputField control={form.control} label="Order CC" name={`supplier_details[${index}].order_cc`} type="text" placeholder="Enter Order CC" />
                                                        <InputField control={form.control} label="Order BCC" name={`supplier_details[${index}].order_bcc`} type="text" placeholder="Enter Order BCC" />
                                                        <SelectField control={form.control} label="Order UOM" name={`supplier_details[${index}].order_uom`} options={uomList}/>
                                                        <InputField control={form.control} label="Order Email" name={`supplier_details[${index}].order_email`} type="email" placeholder="Enter Order Email" />
                                                        <SelectField control={form.control} label="Invoice Type" name={`supplier_details[${index}].invoice_type`} options={invoiceTypes} />
                                                        <InputField control={form.control} label="Max Order Qty" name={`supplier_details[${index}].max_order_qty`} type="number" placeholder="Enter Max Order Qty" />
                                                        <InputField control={form.control} label="Min Order Qty" name={`supplier_details[${index}].min_order_qty`} type="number" placeholder="Enter Min Order Qty" />
                                                        <InputField control={form.control} label="Delivery Charge" name={`supplier_details[${index}].delivery_charge`} type="number" placeholder="Enter Delivery Charge" />
                                                        <CheckboxField control={form.control} label="Has FTP Account" name={`supplier_details[${index}].has_ftp_account`} />
                                                        <InputField control={form.control} label="Max Order Value" name={`supplier_details[${index}].max_order_value`} type="number" placeholder="Enter Max Order Value" />
                                                        <InputField control={form.control} label="Min Order Value" name={`supplier_details[${index}].min_order_value`} type="number" placeholder="Enter Min Order Value" />
                                                        <CheckboxField control={form.control} label="Is Cash Accepted" name={`supplier_details[${index}].is_cash_accepted`} />
                                                        <CheckboxField control={form.control} label="Is Main Supplier" name={`supplier_details[${index}].is_main_supplier`} />
                                                        <CheckboxField control={form.control} label="Can Accept Return" name={`supplier_details[${index}].can_accept_return`} />
                                                        <CheckboxField control={form.control} label="Is Daily Supplier" name={`supplier_details[${index}].is_daily_supplier`} />
                                                        <CheckboxField control={form.control} label="Can Schedule Order" name={`supplier_details[${index}].can_schedule_order`} />
                                                        <CheckboxField control={form.control} label="Is Rebate Supplier" name={`supplier_details[${index}].is_rebate_supplier`} />
                                                        <InputField control={form.control} label="Order Status Email" name={`supplier_details[${index}].order_status_email`} type="email" placeholder="Enter Order Status Email" />
                                                        <CheckboxField control={form.control} label="Is Any Special Price" name={`supplier_details[${index}].is_any_special_price`} />
                                                        <SelectField control={form.control} label="Order Placement Type" name={`supplier_details[${index}].order_placement_type`} options={["ftp", "email"].map(option => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1), }))} />
                                                        <InputField control={form.control} label="Pay Out Amount Limit" name={`supplier_details[${index}].pay_out_amount_limit`} type="number" placeholder="Enter Pay Out Amount Limit" />
                                                        <CheckboxField control={form.control} label="Can Raise Credit Note" name={`supplier_details[${index}].can_raise_credit_note`} />
                                                        <CheckboxField control={form.control} label="Is Pre-Payment Needed" name={`supplier_details[${index}].is_pre_payment_needed`} />
                                                        <CheckboxField control={form.control} label="Can Place Multiple Orders" name={`supplier_details[${index}].can_place_multiple_order`} />
                                                        <CheckboxField control={form.control} label="Can Be Paid Out From Till" name={`supplier_details[${index}].can_be_paid_out_from_till`} />
                                                        <InputField control={form.control} label="Free Delivery Order Value" name={`supplier_details[${index}].free_delivery_order_value`} type="number" placeholder="Enter Free Delivery Order Value" />
                                                        <CheckboxField control={form.control} label="Will Receive Delivery Note" name={`supplier_details[${index}].will_receive_delivery_note`} />
                                                        <CheckboxField control={form.control} label="Can Order Price Marked Item" name={`supplier_details[${index}].can_order_price_marked_item`} />
                                                        <CheckboxField control={form.control} label="Can Be Part of Purchase Plan" name={`supplier_details[${index}].can_be_part_of_purchase_plan`} />
                                                        <InputField control={form.control} label="No. of Delivery Notes to Be Merged" name={`supplier_details[${index}].no_of_delivery_notes_to_be_merged`} type="number" placeholder="Enter No. of Delivery Notes" />
                                                        <CheckboxField control={form.control} label="Consider for Fastest Supplier" name={`supplier_details[${index}].can_be_considered_for_fastest_supplier`} />
                                                        <CheckboxField control={form.control} label="Consider for Cheapest Supplier" name={`supplier_details[${index}].can_be_considered_for_cheapest_supplier`} />
                                                        <CheckboxField control={form.control} label="Need to Check Pallet Price Before Order" name={`supplier_details[${index}].need_to_check_pallet_price_before_order`} />
                                                    </div>


                                                ))}
                                            </>)}
                                        {activeItem === "FTP" && (
                                            <>
                                                <Button type="button" className="btn-cyan mb-2" onClick={addFtpData}>Add FTP Data</Button>
                                                {form.watch('ftp_data')?.slice().reverse().map((ftp, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mb-4">
                                                        <InputField control={form.control} label="FTP URL" placeholder="Enter FTP URL" name={`ftp_data[${index}].ftpUrl`} type="url" />
                                                        <InputField control={form.control} label="FTP Type" placeholder="Enter FTP Type" name={`ftp_data[${index}].ftpType`} type="text" />
                                                        <InputField control={form.control} label="FTP Username" placeholder="Enter FTP Username" name={`ftp_data[${index}].ftpUsername`} type="text" />
                                                        <InputField control={form.control} label="FTP Password" placeholder="Enter FTP Password" name={`ftp_data[${index}].ftpPassword`} type="password" />
                                                        <CheckboxField control={form.control} label="Auto Delete" name={`ftp_data[${index}].autoDelete`} />
                                                        <CheckboxField control={form.control} label="Auto Download" name={`ftp_data[${index}].autoDownload`} />
                                                        <InputField control={form.control} label="Seller Buyer ID" placeholder="Enter Seller Buyer ID" name={`ftp_data[${index}].sellerBuyerId`} type="text" />
                                                        <InputField control={form.control} label="Connection Name" placeholder="Enter Connection Name" name={`ftp_data[${index}].connectionName`} type="text" />
                                                        <InputField control={form.control} label="Auto Download Time" placeholder="Enter Auto Download Time" name={`ftp_data[${index}].autoDownloadTime`} type="time" />
                                                        <div className="flex items-end h-full">
                                                            <Button type="button" className="btn-danger w-full" onClick={() => removeFtpData(index)}>Remove</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {activeItem === "Price" && (
                                            <>
                                                {form.watch('price_rules')?.map((priceRule, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <InputField control={form.control} label="Margin" placeholder="Enter Margin" name={`price_rules[${index}].margin`} type="number" />
                                                        <InputField control={form.control} label="Start Date" placeholder="Enter Start Date" name={`price_rules[${index}].startDate`} type="date" />
                                                        <InputField control={form.control} label="End Date" placeholder="Enter End Date" name={`price_rules[${index}].endDate`} type="date" />
                                                        <InputField control={form.control} label="Category Name" placeholder="Enter Category Name" name={`price_rules[${index}].categoryName`} type="text" />
                                                        <InputField control={form.control} label="Round Value 1" placeholder="Enter Round Value 1" name={`price_rules[${index}].roundValue1`} type="number" />
                                                        <InputField control={form.control} label="Round Value 2" placeholder="Enter Round Value 2" name={`price_rules[${index}].roundValue2`} type="number" />
                                                        <InputField control={form.control} label="Round Concept" placeholder="Enter Round Concept" name={`price_rules[${index}].roundConcept`} type="text" />
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {activeItem === "Delivery" && (
                                            <>
                                                {form.watch('delivery_schedules')?.map((delivery, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <InputField control={form.control} label="Order Day" placeholder="Enter Order Day" name={`delivery_schedules[${index}].orderDay`} type="text" />
                                                        <InputField control={form.control} label="Delivery Day" placeholder="Enter Delivery Day" name={`delivery_schedules[${index}].deliveryDay`} type="text" />
                                                        <InputField control={form.control} label="Start Time" placeholder="Enter Start Time" name={`delivery_schedules[${index}].startTime`} type="time" />
                                                        <InputField control={form.control} label="End Time" placeholder="Enter End Time" name={`delivery_schedules[${index}].endTime`} type="time" />
                                                        <InputField control={form.control} label="Scheduled Type" placeholder="Enter Scheduled Type" name={`delivery_schedules[${index}].scheduledType`} type="text" />
                                                        <InputField control={form.control} label="Standard Lead Time" placeholder="Enter Standard Lead Time" name={`delivery_schedules[${index}].standardLeadTime`} type="text" />
                                                        <InputField control={form.control} label="Extended Lead Time" placeholder="Enter Extended Lead Time" name={`delivery_schedules[${index}].extendedLeadTime`} type="text" />
                                                        <InputField control={form.control} label="Promotion Lead Time" placeholder="Enter Promotion Lead Time" name={`delivery_schedules[${index}].promotionLeadTime`} type="text" />
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {activeItem === "Agents" && (
                                            <>
                                                {form.watch('agents')?.map((agent, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <InputField control={form.control} label="Agent Name" placeholder="Enter Agent Name" name={`agents[${index}].agentName`} type="text" />
                                                        <InputField control={form.control} label="Agent Email" placeholder="Enter Agent Email" name={`agents[${index}].agentEmail`} type="email" />
                                                        <InputField control={form.control} label="Agent Phone" placeholder="Enter Agent Phone" name={`agents[${index}].agentPhone`} type="tel" />
                                                        <InputField control={form.control} label="Agent WhatsApp" placeholder="Enter Agent WhatsApp" name={`agents[${index}].agentWhatsapp`} type="tel" />
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <hr className="border-t border-zinc-300" />
                            <div className="flex justify-end space-x-4 mt-2 pr-4">
                                <button type="button" className="btn-zinc">Cancel</button>
                                <Button type="submit" disabled={isLoading} className="btn-cyan">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                        </>
                                    ) : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
