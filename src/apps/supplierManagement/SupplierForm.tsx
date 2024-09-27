import React, { useEffect, useState } from 'react';
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
import { City, countries, Country, countryToCities, invoiceTypes, ModeType, supplierCreditScores, supplierTypes, uomList } from '@/data/enum';
import { useNavigate } from 'react-router-dom';
import { addSupplier, getSupplierById, updateSupplier } from '@/service/supplier.service';
import { sample } from '@/data/constants';


export const SupplierForm = ({ id, type }: any) => {
    const [activeItem, setActiveItem] = useState("Basic");
    const [isLoading, setIsLoading] = useState(false);
    const [cityOptions, setCityOptions] = useState<City[]>([]);
    const defaultValues = {
        shortCode: "", 
        logo: "", 
        supplierName: "", 
        contactPersonName: "", 
        email: "", 
        emailCc: "", 
        phone: "", 
        fax: "",  
        website: "",  
        webPortal: "",  
        address: "",
        postcode: "", 
        state: "",
        city: "London",
        country: "GB",
        supplierType: "edi", 
        postingGroup: "Group A",
        creditScore: "excellent", 
        status: true,
        createdBy: 1,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),

        supplier_details: [
            {
                orderCc: "", 
                orderBcc: "",
                orderUom: "case", 
                orderEmail: "", 
                invoiceType: "email",
                maxOrderQty: "",
                minOrderQty: "",
                deliveryCharge: "",
                hasFtpAccount: true,
                maxOrderValue: "",
                minOrderValue: "", 
                isCashAccepted: false,
                isMainSupplier: true, 
                canAcceptReturn: true,
                isDailySupplier: false, 
                canScheduleOrder: false,
                isRebateSupplier: false, 
                orderStatusEmail: "",
                isAnySpecialPrice: false,
                orderPlacementType: "ftp", 
                payOutAmountLimit: "", 
                canRaiseCreditNote: true,
                isPrePaymentNeeded: false,
                canPlaceMultipleOrder: true, 
                canBePaidOutFromTill: false, 
                freeDeliveryOrderValue: "",
                willReceiveDeliveryNote: false, 
                canOrderPriceMarkedItem: true,
                canBePartOfPurchasePlan: true, 
                noOfDeliveryNotesToBeMerged: "",
                canBeConsideredForFastestSupplier: false,
                canBeConsideredForCheapestSupplier: false,
                needToCheckPalletPriceBeforeOrder: true, 
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
            },
        ],

        price_rules: [
            {
                margin: 0,
                endDate: "", 
                startDate: "", 
                categoryId: 0, 
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
                scheduledType: null, 
                extendedLeadTime: "0",
                standardLeadTime: "0",
                promotionLeadTime: "0",
            },
        ],

        categories: [
            {
                isPlu: false, 
                level: 1,
                pluCode: "",
                parentId: 0, 
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
    const navigate = useNavigate();
    const handleMenuItemClick = (item: string) => {
        setActiveItem(item);
    };


    useEffect(() => {
        const fetch = async () => {
            try {
                // const result = await getRole();
                // setRole(result.data.data.map((item: any) => ({
                //     value: item.role_id.toString(),
                //     label: item.role_name
                // })));

                handleCountryChange('GB')
                if (type === ModeType.Edit) {
                    const user = await getSupplierById(id);

                    form.reset({ ...user.data.data, });
                }
            } catch (error) {
            }
        }
        fetch();
    }, [])


    const onSubmit = async (values: any) => {
        setIsLoading(true);
        const fetch = async () => {
            try {
                if (type === ModeType.Add) {
                    const result = await addSupplier({ ...values });
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
                } else {
                    const result = await updateSupplier(id, { ...values });
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });

                }
                setTimeout(() => { setIsLoading(false); }, 2000);
                setTimeout(() => { navigate(`/supplier/supplier-list`); }, 2000);


            } catch (error) {

            }
        }
        fetch();
    };







    const addFtpData = () => {
        const currentFtpData = form.getValues('ftp_data') || [];
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
        form.setValue('ftp_data', [...currentFtpData, newFtpData], { shouldValidate: true });
    };

    const addPriceRules = () => {
        const currentPriceRules = form.getValues('price_rules') || [];
        const newPriceRule = {
            margin: 0,
            startDate: '',
            endDate: '',
            categoryId: 0,
            categoryName: '',
            roundValue1: 0,
            roundValue2: 0,
            roundConcept: '',
        };
        form.setValue('price_rules', [...currentPriceRules, newPriceRule]);
    };


    const addDeliverySchedules = () => {
        const currentDeliverySchedules = form.getValues('delivery_schedules') || [];
        const newDeliverySchedule = {
            orderDay: '',
            deliveryDay: '',
            startTime: '',
            endTime: '',
            scheduledType: null,
            standardLeadTime: '',
            extendedLeadTime: '',
            promotionLeadTime: '',
        };
        form.setValue('delivery_schedules', [...currentDeliverySchedules, newDeliverySchedule]);
    };

    const addAgent = () => {
        const currentAgents = form.getValues('agents') || [];
        const newAgent = {
            agentName: "",
            agentEmail: "",
            agentPhone: "",
            agentWhatsapp: "",
        };
        form.setValue('agents', [...currentAgents, newAgent], { shouldValidate: true });
    };

    const removeFtpData = (index: number) => {
        const currentFtpData = form.getValues('ftp_data') || [];
        const updatedFtpData = currentFtpData.filter((_, i) => i !== index)
        form.setValue('ftp_data', []);
        setTimeout(() => {
            form.setValue('ftp_data', updatedFtpData);
        }, 50);
    };

    const removePriceRules = (index: number) => {
        const currentPriceRules = form.getValues('price_rules') || [];
        const updatedPriceRules = currentPriceRules.filter((_, i) => i !== index);
        form.setValue('price_rules', []);
        setTimeout(() => {
            form.setValue('price_rules', updatedPriceRules);
        }, 50);
    };

    const removeDeliverySchedules = (index: number) => {
        const currentDeliverySchedules = form.getValues('delivery_schedules') || [];
        const updatedDeliverySchedules = currentDeliverySchedules.filter((_, i) => i !== index);
        form.setValue('delivery_schedules', []);
        setTimeout(() => {
            form.setValue('delivery_schedules', updatedDeliverySchedules);
        }, 50);
    };

    const removeAgent = (index: number) => {
        const currentAgents = form.getValues('agents') || [];
        const updatedAgents = currentAgents.filter((_, i) => i !== index);
        form.setValue('agents', []);
        setTimeout(() => {
            form.setValue('agents', updatedAgents);
        }, 50);
    };
    
    const handleCountryChange = (selectedCountry: any) => {
        const cities = countryToCities[selectedCountry] || [];
        setCityOptions(cities);
      }
 

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
                                        <MenuItem href="#" text="Category" isActive={activeItem === "Category"} onClick={() => handleMenuItemClick("Category")} />
                                        <MenuItem href="#" text="FTP" isActive={activeItem === "FTP"} onClick={() => handleMenuItemClick("FTP")} />
                                        <MenuItem href="#" text="Price" isActive={activeItem === "Price"} onClick={() => handleMenuItemClick("Price")} />
                                        <MenuItem href="#" text="Delivery" isActive={activeItem === "Delivery"} onClick={() => handleMenuItemClick("Delivery")} />
                                        <MenuItem href="#" text="Agents" isActive={activeItem === "Agents"} onClick={() => handleMenuItemClick("Agents")} />

                                    </ul>
                                    <div className="p-3 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">
                                        {activeItem === "Basic" && (
                                            <>
                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                    <InputField control={form.control} label="Short Code" name="shortCode" type="text" placeholder="Enter Short Code" required />
                                                    <InputField control={form.control} label="Supplier Logo" name="logo" type="text" placeholder="Upload Supplier Logo" />
                                                    <InputField control={form.control} label="Supplier Name" name="supplierName" type="text" placeholder="Enter Supplier Name" required />
                                                    <InputField control={form.control} label="Contact Person Name" name="contactPersonName" type="text" placeholder="Enter Contact Person Name" />
                                                    <InputField control={form.control} label="Supplier Email" name="email" type="email" placeholder="Enter Supplier Email" />
                                                    <InputField control={form.control} label="Email CC" name="emailCc" type="email" placeholder="Enter Email CC" />
                                                    <InputField control={form.control} label="Supplier Phone" name="phone" type="tel" placeholder="Enter Supplier Phone" />
                                                    <InputField control={form.control} label="Supplier Fax" name="fax" type="text" placeholder="Enter Supplier Fax" />
                                                    <InputField control={form.control} label="Supplier Website" name="website" type="url" placeholder="Enter Supplier Website" />
                                                    <InputField control={form.control} label="Web Portal" name="webPortal" type="url" placeholder="Enter Web Portal" />
                                                    <InputField control={form.control} label="Supplier Address" name="address" type="text" placeholder="Enter Supplier Address" />
                                                    <InputField control={form.control} label="Supplier Postcode" name="postcode" type="text" placeholder="Enter Supplier Postcode" />
                                                    <InputField control={form.control} label="Supplier State" name="state" type="text" placeholder="Enter Supplier State" />
                                                    <SelectField control={form.control} label="Supplier Country" name="country"  onChange={handleCountryChange} options={countries} />
                                                    <SelectField control={form.control} label="Supplier City" name="city" options={cityOptions}/>
                                                    <SelectField control={form.control} label="Supplier Type" name="supplierType" options={supplierTypes} />
                                                    <InputField control={form.control} label="Posting Group" name="postingGroup" type="text" placeholder="Enter Posting Group" />
                                                    <SelectField control={form.control} label="Credit Score" name="creditScore" options={supplierCreditScores} />
                                                    <CheckboxField control={form.control} label="Supplier Status" name="status" />
                                                </div>
                                            </>
                                        )}

                                        {activeItem === "Details" && (
                                            <>
                                                {form.watch('supplier_details')?.map((detail, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <InputField control={form.control} label="Order CC" name={`supplier_details[${index}].orderCc`} type="text" placeholder="Enter Order CC" />
                                                        <InputField control={form.control} label="Order BCC" name={`supplier_details[${index}].orderBcc`} type="text" placeholder="Enter Order BCC" />
                                                        <SelectField control={form.control} label="Order UOM" name={`supplier_details[${index}].orderUom`} options={uomList} />
                                                        <InputField control={form.control} label="Order Email" name={`supplier_details[${index}].orderEmail`} type="email" placeholder="Enter Order Email" />
                                                        <SelectField control={form.control} label="Invoice Type" name={`supplier_details[${index}].invoiceType`} options={invoiceTypes} />
                                                        <InputField control={form.control} label="Max Order Qty" name={`supplier_details[${index}].maxOrderQty`} type="number" placeholder="Enter Max Order Qty" />
                                                        <InputField control={form.control} label="Min Order Qty" name={`supplier_details[${index}].minOrderQty`} type="number" placeholder="Enter Min Order Qty" />
                                                        <InputField control={form.control} label="Delivery Charge" name={`supplier_details[${index}].deliveryCharge`} type="number" placeholder="Enter Delivery Charge" />
                                                        <CheckboxField control={form.control} label="Has FTP Account" name={`supplier_details[${index}].hasFtpAccount`} />
                                                        <InputField control={form.control} label="Max Order Value" name={`supplier_details[${index}].maxOrderValue`} type="number" placeholder="Enter Max Order Value" />
                                                        <InputField control={form.control} label="Min Order Value" name={`supplier_details[${index}].minOrderValue`} type="number" placeholder="Enter Min Order Value" />
                                                        <CheckboxField control={form.control} label="Is Cash Accepted" name={`supplier_details[${index}].isCashAccepted`} />
                                                        <CheckboxField control={form.control} label="Is Main Supplier" name={`supplier_details[${index}].isMainSupplier`} />
                                                        <CheckboxField control={form.control} label="Can Accept Return" name={`supplier_details[${index}].canAcceptReturn`} />
                                                        <CheckboxField control={form.control} label="Is Daily Supplier" name={`supplier_details[${index}].isDailySupplier`} />
                                                        <CheckboxField control={form.control} label="Can Schedule Order" name={`supplier_details[${index}].canScheduleOrder`} />
                                                        <CheckboxField control={form.control} label="Is Rebate Supplier" name={`supplier_details[${index}].isRebateSupplier`} />
                                                        <InputField control={form.control} label="Order Status Email" name={`supplier_details[${index}].orderStatusEmail`} type="email" placeholder="Enter Order Status Email" />
                                                        <CheckboxField control={form.control} label="Is Any Special Price" name={`supplier_details[${index}].isAnySpecialPrice`} />
                                                        <SelectField control={form.control} label="Order Placement Type" name={`supplier_details[${index}].orderPlacementType`} options={["ftp", "email"].map(option => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1), }))} />
                                                        <InputField control={form.control} label="Pay Out Amount Limit" name={`supplier_details[${index}].payOutAmountLimit`} type="number" placeholder="Enter Pay Out Amount Limit" />
                                                        <CheckboxField control={form.control} label="Can Raise Credit Note" name={`supplier_details[${index}].canRaiseCreditNote`} />
                                                        <CheckboxField control={form.control} label="Is Pre-Payment Needed" name={`supplier_details[${index}].isPrePaymentNeeded`} />
                                                        <CheckboxField control={form.control} label="Can Place Multiple Orders" name={`supplier_details[${index}].canPlaceMultipleOrder`} />
                                                        <CheckboxField control={form.control} label="Can Be Paid Out From Till" name={`supplier_details[${index}].canBePaidOutFromTill`} />
                                                        <InputField control={form.control} label="Free Delivery Order Value" name={`supplier_details[${index}].freeDeliveryOrderValue`} type="number" placeholder="Enter Free Delivery Order Value" />
                                                        <CheckboxField control={form.control} label="Will Receive Delivery Note" name={`supplier_details[${index}].willReceiveDeliveryNote`} />
                                                        <CheckboxField control={form.control} label="Can Order Price Marked Item" name={`supplier_details[${index}].canOrderPriceMarkedItem`} />
                                                        <CheckboxField control={form.control} label="Can Be Part of Purchase Plan" name={`supplier_details[${index}].canBePartOfPurchasePlan`} />
                                                        <InputField control={form.control} label="No. of Delivery Notes to Be Merged" name={`supplier_details[${index}].noOfDeliveryNotesToBeMerged`} type="number" placeholder="Enter No. of Delivery Notes" />
                                                        <CheckboxField control={form.control} label="Consider for Fastest Supplier" name={`supplier_details[${index}].canBeConsideredForFastestSupplier`} />
                                                        <CheckboxField control={form.control} label="Consider for Cheapest Supplier" name={`supplier_details[${index}].canBeConsideredForCheapestSupplier`} />
                                                        <CheckboxField control={form.control} label="Need to Check Pallet Price Before Order" name={`supplier_details[${index}].needToCheckPalletPriceBeforeOrder`} />
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {activeItem === "Category" && (
                                            <>
                                                {form.watch('categories')?.map((category, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full">
                                                        <CheckboxField control={form.control} label="Is PLU" name={`categories[${index}].isPlu`} />
                                                        <SelectField control={form.control} label="Level" name={`categories[${index}].level`} options={uomList} />
                                                        <InputField control={form.control} label="PLU Code" name={`categories[${index}].pluCode`} type="text" placeholder="Enter the PLU Code" />
                                                        <SelectField control={form.control} label="Parent ID" name={`categories[${index}].parentId`} options={sample} />
                                                        <InputField control={form.control} label="Category Name" name={`categories[${index}].categoryName`} type="text" placeholder="Enter the Category Name" />
                                                        <CheckboxField control={form.control} label="Can Assign Items" name={`categories[${index}].canAssignItems`} />
                                                        <InputField control={form.control} label="Translated Name" name={`categories[${index}].translatedName`} type="text" placeholder="Enter the Translated Name" />
                                                    </div>
                                                ))}
                                            </>
                                        )}


                                        {activeItem === "FTP" && (
                                            <>
                                                <Button type="button" className="btn-cyan mb-2" onClick={addFtpData}>Add FTP Data</Button>
                                                {form.watch('ftp_data')?.map((ftp, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mb-4">
                                                        <InputField control={form.control} label="FTP URL" placeholder="Enter FTP URL" name={`ftp_data[${index}].ftpUrl`} type="url" />
                                                        <SelectField control={form.control} label="FTP Type" placeholder="Select FTP Type" name={`ftp_data[${index}].ftpType`} options={sample} />
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
                                                <Button type="button" className="btn-cyan mb-2" onClick={addPriceRules}>Add Price Rules</Button>
                                                {form.watch('price_rules')?.map((priceRule, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mb-4">
                                                        <InputField control={form.control} label="Margin" placeholder="Enter Margin" name={`price_rules[${index}].margin`} type="number" />
                                                        <InputField control={form.control} label="Start Date" placeholder="Enter Start Date" name={`price_rules[${index}].startDate`} type="date" />
                                                        <InputField control={form.control} label="End Date" placeholder="Enter End Date" name={`price_rules[${index}].endDate`} type="date" />
                                                        <InputField control={form.control} label="Category Name" placeholder="Enter Category Name" name={`price_rules[${index}].categoryName`} type="text" />
                                                        <InputField control={form.control} label="Round Value 1" placeholder="Enter Round Value 1" name={`price_rules[${index}].roundValue1`} type="number" />
                                                        <InputField control={form.control} label="Round Value 2" placeholder="Enter Round Value 2" name={`price_rules[${index}].roundValue2`} type="number" />
                                                        <SelectField control={form.control} label="Round Concept" name={`price_rules[${index}].roundConcept`} options={["round up", "round down"].map(option => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))} />
                                                        <div className="flex items-end h-full"></div> 
                                                        <div className="flex items-end h-full"></div> 
                                                        <div className="flex items-end h-full">
                                                            <Button type="button" className="btn-danger w-full" onClick={() => removePriceRules(index)}>Remove</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {activeItem === "Delivery" && (
                                            <>
                                                <Button type="button" className="btn-cyan mb-2" onClick={addDeliverySchedules}>Add Delivery Schedules</Button>
                                                {form.watch('delivery_schedules')?.map((delivery, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mb-4">
                                                        <InputField control={form.control} label="Order Day" placeholder="Enter Order Day" name={`delivery_schedules[${index}].orderDay`} type="text" />
                                                        <InputField control={form.control} label="Delivery Day" placeholder="Enter Delivery Day" name={`delivery_schedules[${index}].deliveryDay`} type="text" />
                                                        <InputField control={form.control} label="Start Time" placeholder="Enter Start Time" name={`delivery_schedules[${index}].startTime`} type="time" />
                                                        <InputField control={form.control} label="End Time" placeholder="Enter End Time" name={`delivery_schedules[${index}].endTime`} type="time" />
                                                        <SelectField control={form.control} label="Scheduled Type" name={`delivery_schedules[${index}].scheduledType`} options={["no of days", "specific date"].map(option => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))} />
                                                        <InputField control={form.control} label="Standard Lead Time" placeholder="Enter Standard Lead Time" name={`delivery_schedules[${index}].standardLeadTime`} type="text" />
                                                        <InputField control={form.control} label="Extended Lead Time" placeholder="Enter Extended Lead Time" name={`delivery_schedules[${index}].extendedLeadTime`} type="text" />
                                                        <InputField control={form.control} label="Promotion Lead Time" placeholder="Enter Promotion Lead Time" name={`delivery_schedules[${index}].promotionLeadTime`} type="text" />
                                                        <div className="flex items-end h-full"></div> 
                                                        <div className="flex items-end h-full">
                                                            <Button type="button" className="btn-danger w-full" onClick={() => removeDeliverySchedules(index)}>Remove</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}


                                        {activeItem === "Agents" && (
                                            <>
                                                <Button type="button" className="btn-cyan mb-2" onClick={addAgent}>Add Agent</Button>
                                                {form.watch('agents')?.map((agent, index) => (
                                                    <div key={index} className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-6 rounded-lg shadow-md w-full mb-4">
                                                        <InputField control={form.control} label="Agent Name" placeholder="Enter Agent Name" name={`agents[${index}].agentName`} type="text" />
                                                        <InputField control={form.control} label="Agent Email" placeholder="Enter Agent Email" name={`agents[${index}].agentEmail`} type="email" />
                                                        <InputField control={form.control} label="Agent Phone" placeholder="Enter Agent Phone" name={`agents[${index}].agentPhone`} type="tel" />
                                                        <InputField control={form.control} label="Agent WhatsApp" placeholder="Enter Agent WhatsApp" name={`agents[${index}].agentWhatsapp`} type="tel" />
                                                        <div className="flex items-end h-full">
                                                            <Button type="button" className="btn-danger w-full" onClick={() => removeAgent(index)}>Remove</Button>
                                                        </div>
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
