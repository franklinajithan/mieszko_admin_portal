import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShield } from "react-icons/fi";
import { Card, Nav } from "react-bootstrap";
import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";
import PermissionsCheckboxes from "./PermissionsCheckboxes";
import { getPermission, getPermissionById } from "@/service/user.service";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rolesAndRightsFormSchema } from "@/lib/utils";
import { z } from "zod";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CardTitle from "@/components/elements/CardTitle";

type PermissionActions = {
  add: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
};

type Permissions = {
  [key: string]: PermissionActions;
};



interface PermissionsPanelProps {
  permissions: { name: string; checked: boolean }[];
  onPermissionChange: (name: string) => void;
}



const RolesAndRights = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
  const [permissionData, setPermissionData] = useState<any | null>([]);
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof rolesAndRightsFormSchema>>({
    resolver: zodResolver(rolesAndRightsFormSchema),
    defaultValues: {
      roleName: "",
      description: "",
      reportingToRole: "", // Provide a default value if required
      reportingToUser: "", // Provide a default value if required
      status: true,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPermissionById(2);
        setPermissionData(result.data.data.permission_details);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  // Generic handler for permission checkboxes
  const handlePermissionChange =
    (permissionsSetter: React.Dispatch<React.SetStateAction<Permissions>>) =>
      (key: string, action: keyof PermissionActions) => {
        permissionsSetter((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            [action]: !prevState[key][action], // Toggle the value of the checkbox
          },
        }));
      };



  const [showList, setShowList] = useState({
    title: "Roles and Rights",
    search: true,
    new: true,
    delete: true,
    download: true,
    bookmark: true,
    setting: true,
    filter: true,
  });


  function onSubmit(values: z.infer<typeof rolesAndRightsFormSchema>) {

    setIsLoading(true);
    const fetchData = async () => {
      let result: any
      setIsLoading(true);

      try {
        let data = {
          roleName: values.roleName,
          description: values.description,
          reportingToRole: values.reportingToRole,
          reportingToUser: values.reportingToUser,
          status: values.status,
          permissionDetails:[]
        };

       // result = await addBrand(data);
     //   if (result.status == 201) {
          //  toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800, })
      //  } else {
          //    toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800, })
     //   }
      } catch (e: any) {
        //  toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800, })
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();

  }

  const handleUpdatePermissions = async (permissions: any[]) => {
    try {
      console.log("Updated permissions:", permissions);
      // Call your API here
    } catch (error) {
      console.error("Failed to update permissions:", error);
    }
  };


  return (
    <>

      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />
         
              <Card className="card-one mt-2">
                <CardTitle title="New Role" />
                <Card.Body className="">

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-5 gap-4 mb-6">
                 
                    <InputField control={form.control} label="Role Name" type="text" name="roleName"/>
                    <InputField control={form.control} label="Description" type="text" name="description"/>
                    <InputField control={form.control} label="Reporting To Role" type="text" name="reportingToRole" />
                    <InputField control={form.control} label="Reporting To User" type="text" name="reportingToUser"/>
                    <SelectField control={form.control} label="Status" name="status"  options={[{ value: true, label: "Active" },{ value: false, label: "Inactive" },]} />
                  </div>

                  </form>
                  </Form>
               
                </Card.Body>
              </Card>

              <Card className="card-one mt-2">
              
                <CardTitle title='Role and Rights' />
                  
                <Card.Body>

                  <div>
                    {permissionData ? (
                   <PermissionsCheckboxes
                   permissionData={permissionData}
                   onSubmit={handleUpdatePermissions}
                 />
                    ) : (
                      <p>Loading permissions...</p>
                    )}
                  </div>

                </Card.Body>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-4 mt-2 pr-4 mb-4">
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
              </Card>


         

        </div>
      </div>
    </>
  );
};

export default RolesAndRights;
