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
import { getStore } from "@/service/store.service";
import { getCategoryByLevel } from "@/service/category.service";
import { addReduceToClear } from "@/service/sale.service";
import { formatDate } from "date-fns";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { increment, decrement, incrementByAmount } from "@/store/slices/counterSlice";
import NotificationButton from "@/components/elements/NotificationButton";
import NotificationList from "@/components/elements/NotificationList";

const NewReduceToClear = ({ title, icon }: any) => {

  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { id } = useParams();

  const form = useForm<z.infer<typeof newReduceToClearFormSchema>>({
    resolver: zodResolver(newReduceToClearFormSchema),
    defaultValues: {
      barcode: '',
      itemName: '',
      qty: 0,
      // storeId: 1,
      // categoryId: 15,
      // expiryDate: '',
      status: true,
    },
  });

  useEffect(() => {


    let t = id;

    const fetchStore = async () => {
      try {

        const store = await getStore();
        if (store.status !== 200) {
          console.error(store.data);
          return;
        };
        setStoreList(store.data.data.map((item: any) => ({
          value: item.storeId.toString(),
          label: item.storeName
        })));


        const category = await getCategoryByLevel(3);
        if (category.status !== 200) {
          console.error(category.data);
          return;
        };
        setCategoryList(
          category.data.data
            .map((item: any) => ({
              value: item.category_id.toString(),
              label: item.category_name
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label))
        );

      } catch (e) {
        console.error(e);
      } finally {

      }
    };

    fetchStore();
  }, [])

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
          verification: "Pending",
          expiryDate: values.expiryDate ? formatDate(new Date(values.expiryDate), 'yyyy-MM-dd') : formatDate(new Date(), 'yyyy-MM-dd'),

        };

        result = await addReduceToClear(data); // Update this function to addReduceToClearItem as needed
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
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="New RTC Item" />
            <Card.Body>

              {/* <div>
                <h1>Counter: {count}</h1>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
              </div>


              <div className="App">
                <h1>Notification Example</h1>
                <NotificationButton />
            
              </div> */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex grid grid-cols-5 gap-4 mb-6">
                    <InputField control={form.control} label="Barcode" type="text" name="barcode" />
                    <InputField control={form.control} label="Item Name" type="text" name="itemName" />
                    <InputField control={form.control} label="Quantity" type="number" name="qty" />

                    <SelectField control={form.control} label="Store ID" name="storeId" options={storeList} />
                    <SelectField control={form.control} label="Category ID" name="categoryId" options={categoryList} />
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
