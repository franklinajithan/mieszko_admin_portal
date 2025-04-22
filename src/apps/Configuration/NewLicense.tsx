import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { status } from "@/data/constants";
import { countries, ModeType } from "@/data/enum";
import { toast } from "@/hooks/use-toast";
import { newLicenseFormSchema, storeFormSchema } from "@/lib/utils";
import { addCompany, getCompanyById, updateCompany } from "@/service/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import HeaderComponents from "@/components/elements/HeaderSection";

import { Container } from "@mui/material";
import CardTitle from "@/components/elements/CardTitle";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
const NewLicense = ({ title, icon }: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>([]);
  const form = useForm<z.infer<typeof newLicenseFormSchema>>({
    resolver: zodResolver(newLicenseFormSchema),
    defaultValues: {
      id: "",
      company: "",
      licenseId: "",
      serverIp: "",
      noOfTillsLeft: "",
      licensePeriod: "",
      licenseType: "",
      expireDate: "",
      tillsWorking: "",
      licenseGroup: "",
      active: "false",
    },
  });
  const { handleSubmit, formState, reset, setValue } = form;
  useEffect(() => {
    // const fetch = async () => {
    //     try {
    //         const result = await getCompanyById(id);
    //         setCompanyDetails(result.data.data)
    //         reset(result.data.data)
    //         if (result.status !== 200) {
    //             console.error(result.data);
    //             return;
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    // if (type == ModeType.Edit) {
    //     fetch();
    // }
  }, []);

  const onSubmit = async (data: z.infer<typeof storeFormSchema>) => {
    setIsLoading(true);

    // let result :any
    // try {
    //     if (type == ModeType.Edit) {
    //         result = await updateCompany(id, data);
    //     } else {
    //         result = await addCompany(data);
    //     }

    //     if (result.status === 201 || result.status === 200) {
    //         toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
    //     } else {
    //         toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
    //     }
    //     setTimeout(() => { setIsLoading(false); }, 2000);
    //     setTimeout(() => { navigate(`/store/company-list`); }, 2000);
    // } catch (e: any) {
    //     toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
    // }
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
                      <InputField control={form.control} label="Id" name="id" type="text" placeholder="Enter the id" />
                      <InputField control={form.control} label="Company" name="company" type="text" placeholder="Enter the company name" />
                      <InputField control={form.control} label="License Id" name="licenseId" type="text" placeholder="Enter the license id" />
                      <InputField control={form.control} label="Server IP" name="serverIp" type="text" placeholder="Enter server IP" />
                      <InputField control={form.control} label="No of Tills Left" name="noOfTillsLeft" type="text" placeholder="Enter number of tills left" />
                      <InputField control={form.control} label="License Period" name="licensePeriod" type="text" placeholder="Enter license period" />
                      <InputField control={form.control} label="License Type" name="licenseType" type="text" placeholder="Enter license type" />
                      <InputField control={form.control} label="Expire Date" name="expireDate" type="text" placeholder="Enter expire date" />
                      <InputField control={form.control} label="Tills Working" name="tillsWorking" type="text" placeholder="Enter tills working count" />
                      <InputField control={form.control} label="License Group" name="licenseGroup" type="text" placeholder="Enter license group" />
                      <InputField control={form.control} label="Active" name="active" type="text" placeholder="Enter active status" />
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
export default NewLicense;
