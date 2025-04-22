import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { status } from "@/data/constants";
import { countries, ModeType } from "@/data/enum";
import { toast } from "@/hooks/use-toast";
import { productFromSupplierSchema, storeFormSchema } from "@/lib/utils";
import { addCompany, getCompanyById, updateCompany } from "@/service/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
const AddProductFromSupplier = ({ onSelectRow }:any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>([]);
  const initialRows = [
    {
      id: 1,
      innerEAN: "40145037",
      supplier: "1",
      itemName: "SMIETANKA DO KAWY KAFFEESAHN...",
      itemSize: "",
      main: true,
      supplierCode: "10137",
      caseSize: 20,
      caseCost: 9,
      rrp: 0.45,
      margin: 0,
      outerEAN: "",
    },
  ];
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  
  const columns: GridColDef[] = [
    { field: "innerEAN", headerName: "Inner EAN", flex: 1, type: "string" },
    { field: "supplier", headerName: "Supplier", flex: 1, type: "string" },
    { field: "itemName", headerName: "Item Name", flex: 2, type: "string" },
    { field: "itemSize", headerName: "Item Size", flex: 1, type: "string" },
    { field: "main", headerName: "Main", flex: 1, type: "boolean" },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1, type: "string" },
    { field: "caseSize", headerName: "Case Size", flex: 1, type: "number" },
    { field: "caseCost", headerName: "Case Cost", flex: 1, type: "number" },
    { field: "rrp", headerName: "RRP", flex: 1, type: "number" },
    { field: "margin", headerName: "Margin(%)", flex: 1, type: "number" },
    { field: "outerEAN", headerName: "Outer EAN", flex: 1, type: "string" },
  ];
  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/store/edit-company/${id.toString()}`);
    //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };
  const onClickAddCompany = () => {
    navigate(`/store/new-company`);
  };

  const handleCancelClick = (id: GridRowId) => () => {};

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    companyId: false,
    companyCode: true,
    companyName: true,
    ownerName: true,
    email: true,
    phone: true,
    address: true,
    city: true,
    state: true,
    postcode: true,
    country: true,
    status: false,
    taxNo: true,
    createdAt: false,
    createdBy: false,
    updatedAt: false,
    updatedBy: false,
    website: false,
    logo: false,
  });
  const form = useForm<z.infer<typeof productFromSupplierSchema>>({
    resolver: zodResolver(productFromSupplierSchema),
    defaultValues: {
      eanDeliScale: "",
      description: "",
      supplier: "",
      supplierCode: "",
    },
  });

  const { handleSubmit, formState, reset, setValue } = form;
  useEffect(() => {
    //  const fetch = async () => {
    //      try {
    //          const result = await getCompanyById(id);
    //          setCompanyDetails(result.data.data)
    //          reset(result.data.data)
    //          if (result.status !== 200) {
    //              console.error(result.data);
    //              return;
    //          }
    //      } catch (e) {
    //          console.error(e);
    //      }
    //  };
    //  if (type == ModeType.Edit) {
    //      fetch();
    //  }
  }, []);

  const onSubmit = async (data: z.infer<typeof productFromSupplierSchema>) => {
    //  setIsLoading(true);
    //  let result :any
    //  try {
    //      if (type == ModeType.Edit) {
    //          result = await updateCompany(id, data);
    //      } else {
    //          result = await addCompany(data);
    //      }
    //      if (result.status === 201 || result.status === 200) {
    //          toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
    //      } else {
    //          toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
    //      }
    //      setTimeout(() => { setIsLoading(false); }, 2000);
    //      setTimeout(() => { navigate(`/store/company-list`); }, 2000);
    //  } catch (e: any) {
    //      toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
    //  }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 ">
              <InputField control={form.control} label="EAN (Deli Scale)" name="eanDeliScale" type="text" placeholder="Enter EAN (Deli Scale)" />
              <InputField control={form.control} label="Description" name="description" type="text" placeholder="Enter description" />
              <InputField control={form.control} label="Supplier" name="supplier" type="text" placeholder="Enter supplier" />
              <InputField control={form.control} label="Supplier Code" name="supplierCode" type="text" placeholder="Enter supplier code" />
            </div>
            <div className="flex justify-center mt-3">
              <Button className="btn-cyan text-sm px-4 py-2 mr-3">Search</Button>
              <Button className="btn-cyan text-sm px-4 py-2 ml-3">Reset</Button>
            </div>

            <div className="w-full mt-3">
              <div className="h-full w-full">
                <div>
                  <ThemeProvider theme={theme}>
                    <DataGrid
                      style={{ height: 350, width: "100%" }}
                      rowHeight={35}
                      rows={rows}
                      columns={columns}
                      getRowId={(row) => row.id}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 15, page: 0 },
                        },
                      }}
                      pageSizeOptions={[15, 25, 50]}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                      pagination
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>

            <hr className="border-t border-zinc-300 " />

            <div className="flex justify-end space-x-4  mt-2 pr-4">
             
              <Button type="submit" disabled={isLoading} className="btn-cyan">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                  </>
                ) : (
                  "Add"
                )}
              </Button>
              <Button className="btn-zinc">Cancel</Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </div>
  );
};

export default AddProductFromSupplier;
