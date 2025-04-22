import CardTitle from "@/components/elements/CardTitle";
import HeaderComponents from "@/components/elements/HeaderSection";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { status } from "@/data/constants";
import { countries, ModeType } from "@/data/enum";
import { toast } from "@/hooks/use-toast";
import { newSpecialOrderFormSchema, storeFormSchema } from "@/lib/utils";
import { addCompany, getCompanyById, updateCompany } from "@/service/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const NewSpecialOrder = ({ title, icon }: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>([]);

  const form = useForm<z.infer<typeof newSpecialOrderFormSchema>>({
    resolver: zodResolver(newSpecialOrderFormSchema),
    defaultValues: {
      id: "",
      customerId: "",
      customerName: "",
      mobile: "",
      email: "",
      itemCode: "",
      productName: "",
      quantity: 1,
      department: "",
      depositAmount: 0,
      totalAmount: 0,
      dueAmount: 0,
      orderDate: "",
      deliveryDate: "",
      paidOn: "",
      collectedOn: "",
      cashTransferredOn: "",
      orderStatus: "Pending", // Default status
      loyaltyStatus: "Gold Member", // Default loyalty status
      processingLocation: "",
      receiptDetails: "",
      receiptBarcode: "",
      communicationLog: "",
      tillNo: "",
      storeOrdered: "",
      storeDelivered: "",
      creditNoteId: "",
      transferredBy: "",
      isWeighted: false,
      uom: "",
      retailUom: "",
      weight: "",
      costPrice: 0,
      margin: 0,
      vat: 0,
      retailPrice: 0,
      depositBy: "",
      comments: "",
      alertEmail: false,
      alertMobile: false,
    },
  });

  const { handleSubmit, formState, reset, setValue } = form;
  useEffect(() => {}, []);

  const onSubmit = async (data: z.infer<typeof newSpecialOrderFormSchema>) => {
    setIsLoading(true);

    let result: any;
    try {
      // if (type == ModeType.Edit) {
      //     result = await updateCompany(id, data);
      // } else {
      //     result = await addCompany(data);
      // }
      // if (result.status === 201 || result.status === 200) {
      //     toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
      // } else {
      //     toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
      // }
      // setTimeout(() => { setIsLoading(false); }, 2000);
      // setTimeout(() => { navigate(`/store/company-list`); }, 2000);
    } catch (e: any) {
      toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
    }
  };

  return (
    <>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            {/* <CardTitle title="Basic Information" onToggle={toggleBasicInfo} isOpen={isOpenBasicInfo} /> */}
            <div>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                      <InputField control={form.control} label="ID" name="id" type="text" placeholder="Enter ID" />
                      <InputField control={form.control} label="Customer ID" name="customerId" type="text" placeholder="Enter customer ID" />
                      <InputField control={form.control} label="Customer Name" name="customerName" type="text" placeholder="Enter customer name" />
                      <InputField control={form.control} label="Mobile" name="mobile" type="text" placeholder="Enter mobile number" />
                      <InputField control={form.control} label="Email" name="email" type="email" placeholder="Enter email" />
                      <InputField control={form.control} label="Item Code" name="itemCode" type="text" placeholder="Enter item code" />
                      <InputField control={form.control} label="Product Name" name="productName" type="text" placeholder="Enter product name" />
                      <InputField control={form.control} label="Quantity" name="quantity" type="text" placeholder="Enter quantity" />
                      <InputField control={form.control} label="Department" name="department" type="text" placeholder="Enter department" />
                      <InputField control={form.control} label="Deposit Amount" name="depositAmount" type="text" placeholder="Enter deposit amount" />
                      <InputField control={form.control} label="Total Amount" name="totalAmount" type="text" placeholder="Enter total amount" />
                      <InputField control={form.control} label="Due Amount" name="dueAmount" type="text" placeholder="Enter due amount" />
                      <InputField control={form.control} label="Order Date" name="orderDate" type="date" />
                      <InputField control={form.control} label="Delivery Date" name="deliveryDate" type="date" />
                      <InputField control={form.control} label="Paid On" name="paidOn" type="date" />
                      <InputField control={form.control} label="Collected On" name="collectedOn" type="date" />
                      {/* <InputField control={form.control} label="Cash Transferred On" name="cashTransferredOn" type="datetime-local" /> */}
                      {/* <SelectField control={form.control} label="Order Status" name="orderStatus" options={orderStatusOptions} />
                      <SelectField control={form.control} label="Loyalty Status" name="loyaltyStatus" options={loyaltyStatusOptions} /> */}
                      <InputField control={form.control} label="Processing Location" name="processingLocation" type="text" placeholder="Enter processing location" />
                      <InputField control={form.control} label="Receipt Details" name="receiptDetails" type="text" placeholder="Enter receipt details" />
                      <InputField control={form.control} label="Receipt Barcode" name="receiptBarcode" type="text" placeholder="Enter receipt barcode" />
                      <InputField control={form.control} label="Communication Log" name="communicationLog" type="text" placeholder="Enter communication log" />
                      <InputField control={form.control} label="Till No" name="tillNo" type="text" placeholder="Enter till number" />
                      <InputField control={form.control} label="Store Ordered" name="storeOrdered" type="text" placeholder="Enter store ordered" />
                      <InputField control={form.control} label="Store Delivered" name="storeDelivered" type="text" placeholder="Enter store delivered" />
                      <InputField control={form.control} label="Credit Note ID" name="creditNoteId" type="text" placeholder="Enter credit note ID" />
                      <InputField control={form.control} label="Transferred By" name="transferredBy" type="text" placeholder="Enter transferred by" />
                      <InputField control={form.control} label="Is Weighted" name="isWeighted" type="text" placeholder="Yes/No" />
                      <InputField control={form.control} label="UOM" name="uom" type="text" placeholder="Enter unit of measure" />
                      <InputField control={form.control} label="Retail UOM" name="retailUom" type="text" placeholder="Enter retail unit of measure" />
                      <InputField control={form.control} label="Weight" name="weight" type="text" placeholder="Enter weight" />
                      <InputField control={form.control} label="Cost Price" name="costPrice" type="text" placeholder="Enter cost price" />
                      <InputField control={form.control} label="Margin" name="margin" type="text" placeholder="Enter margin" />
                      <InputField control={form.control} label="VAT" name="vat" type="text" placeholder="Enter VAT" />
                      <InputField control={form.control} label="Retail Price" name="retailPrice" type="text" placeholder="Enter retail price" />
                      <InputField control={form.control} label="Deposit By" name="depositBy" type="text" placeholder="Enter deposit method" />
                      <InputField control={form.control} label="Comments" name="comments" type="text" placeholder="Enter comments" />
                      {/* <SelectField control={form.control} label="Alert Email" name="alertEmail" options={alertOptions} />
                      <SelectField control={form.control} label="Alert Mobile" name="alertMobile" options={alertOptions} /> */}
                    </div>

                    <hr className="border-t border-zinc-300 " />

                    <div className="flex justify-end space-x-4  mt-2 pr-4">
                      <button className="btn-zinc">Cancel</button>
                      <Button type="submit" disabled={isLoading} className="btn-cyan">
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </form>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NewSpecialOrder;
