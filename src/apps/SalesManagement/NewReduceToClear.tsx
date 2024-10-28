import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPlusCircle, FiShoppingCart } from "react-icons/fi";

import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
// import DatePicker from "@/components/elements/DatePicker"; // Assuming you have a DatePicker component
import CardTitle from "@/components/elements/CardTitle";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { newReduceToClearFormSchema } from "@/lib/utils"; // Update schema name
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { status } from "@/data/constants";
import { CalendarInput } from "@/components/elements/CalendarInput";

const NewReduceToClear = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newReduceToClearFormSchema>>({
    resolver: zodResolver(newReduceToClearFormSchema),
    defaultValues: {
      barcode: '',
      itemName: '',
      qty: 0,
      storeId: 1,
      categoryId: 15,
      expiryDate: '',
      status: true,
    },
  });

  useEffect(() => {}, []);

  function onSubmit(values: z.infer<typeof newReduceToClearFormSchema>) {
    setIsLoading(true);
    const addReduceToClearItem = async () => {
      let result: any;
      try {
        const data = {
          barcode: values.barcode,
          itemName: values.itemName,
          qty: values.qty,
          storeId: values.storeId,
          categoryId: values.categoryId,
          expiryDate: values.expiryDate,
        
        };

        // result = await addBrand(data); // Update this function to addReduceToClearItem as needed
        // if (result.status === 201) {
        //   toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
        // } else {
        //   toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
        // }
      } catch (e: any) {
        toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    addReduceToClearItem();
  }

  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="New Reduce To Clear Item" />
            <Card.Body>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex grid grid-cols-5 gap-4 mb-6">
                    <InputField control={form.control} label="Barcode" type="text" name="barcode" />
                    <InputField control={form.control} label="Item Name" type="text" name="itemName" />
                    <InputField control={form.control} label="Quantity" type="number" name="qty" />
                    <InputField control={form.control} label="Store ID" type="number" name="storeId" />
                    <SelectField control={form.control} label="Category ID" name="categoryId" options={status} />
                    <CalendarInput control={form.control} label="expiryDate" name="expiryDate" />
            
                  </div>

                  <hr className="border-t border-zinc-300" />
                  <div className="flex justify-end space-x-4 mt-2 pr-4">
                    <button className="btn-zinc">
                      Cancel
                    </button>
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
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewReduceToClear;
