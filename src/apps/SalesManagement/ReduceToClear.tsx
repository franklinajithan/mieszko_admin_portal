

import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPackage } from "react-icons/fi";
import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import MultiDateField from "@/components/elements/MultiDateField";
import { sample, status } from "../../data/constants";
import CardTitle from "@/components/elements/CardTitle";
import { Card, Nav } from "react-bootstrap";
import { CardContent, CardHeader } from "@/components/ui/card";
import { companySearchFormSchema, reduceToClearSearchFormSchema, StoreListFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Form } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { getCompany } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";
import { getReduceToClear } from "@/service/sale.service";

const ReduceToClear = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
  const toggleCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {

        const result = await getReduceToClear();
        if (result.status !== 200) {
          console.error(result.data);
          return;
        };
        setRows(result.data.data)





      } catch (e) {
        console.error(e);
      } finally {

      }
    };

    fetchCompany();
  }, [])

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
  const onClickReduceToClear = () => {
    navigate(`/sale/new-reduce-to-clear`);
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow: any = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };



  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
    },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'barcode', headerName: 'Barcode', flex: 1 },
    { field: 'itemName', headerName: 'Item Name', flex: 1 },
    { field: 'verification', headerName: 'Verification Status', flex: 1 },
    { field: 'storename', headerName: 'Store Name', flex: 1 },
    { field: 'categoryname', headerName: 'Category', flex: 1 },
    { field: 'qty', headerName: 'Quantity', flex: 1 },
    { field: 'updatedQty', headerName: 'Updated Quantity', flex: 1 },
    { field: 'count', headerName: 'Count', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'approvedPrice', headerName: 'Approved Price', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'priceAddedAt', headerName: 'Price Added At', flex: 1 },
    { field: 'approvedAt', headerName: 'Approved At', flex: 1 },
    { field: 'expiryDate', headerName: 'Expiry Date', flex: 1 },

  ];




  const form = useForm<z.infer<typeof reduceToClearSearchFormSchema>>({
    resolver: zodResolver(reduceToClearSearchFormSchema),
    defaultValues: {
     
      barcode: "",
      itemName: "",
      verification:undefined,
      storename: "",
      categoryname: "",
      qty: "",
      updatedQty: null,
      count: 0,
      price: null,
      approvedPrice: null,
      createdAt: "",
      priceAddedAt: null,
      approvedAt: null,
      expiryDate: "",
    },
  });


  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    id: true,
    barcode: true,
    itemName: true,
    verification: true,
    storename: true,
    categoryname: true,
    qty: true,
    updatedQty: true,
    count: true,
    price: true,
    approvedPrice: true,
    createdAt: true,
    priceAddedAt: true,
    approvedAt: true,
    expiryDate: true,
  });

  const onSubmit = (data: any) => {
    // Handle form submission

  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const storeOptions = [{ label: "Hays", value: "Hays" }, /* other stores */];
  const categoryOptions = [{ label: "Cheese", value: "Cheese" }, /* other categories */];
  const verificationOptions = [{ label: "Pending", value: "Pending" }, /* other statuses */];

  return (
    <React.Fragment>

      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="Search" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <SelectField control={form.control} label="Store Name" name="storename" options={storeOptions} />
                    <SelectField control={form.control} label="Category" name="categoryname" options={categoryOptions} />
                    <InputField control={form.control} label="Barcode" name="barcode" type="text" />
                    <InputField control={form.control} label="Item Name" name="itemName" type="text" />
                    <SelectField control={form.control} label="Verification" name="verification" options={verificationOptions} />
                    <InputField control={form.control} label="Quantity" name="qty" type="number" />
                    <InputField control={form.control} label="Updated Quantity" name="updatedQty" type="number" />
                    <InputField control={form.control} label="Count" name="count" type="number" />
                    <InputField control={form.control} label="Price" name="price" type="number" />
                    {/* <InputField control={form.control} label="Approved Price" name="approvedPrice" type="number" />
                    <InputField control={form.control} label="Created At" name="createdAt" type="date" />
                    <InputField control={form.control} label="Price Added At" name="priceAddedAt" type="date" />
                    <InputField control={form.control} label="Approved At" name="approvedAt" type="date" />
                    <InputField control={form.control} label="Expiry Date" name="expiryDate" type="date" /> */}
                  </div>


                  <hr className="border-t border-zinc-300" />



                  <div className="flex justify-end space-x-4 mt-2 pr-4">
                    <button className="btn-zinc">
                      Clear
                    </button>
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

            <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} />


            {isOpenGrid && (<CardContent>


              <div>
                <div className="flex justify-start space-x-4  mt-2 pr-4">
                  <Button type="submit" className='btn-cyan' onClick={onClickReduceToClear}>
                    New Reduce to Clear
                  </Button>
                </div>
                <div className="w-full mt-3">
                  <div className="h-full w-full">
                    <div>
                      <ThemeProvider theme={theme}>
                        <DataGrid
                          style={{ height: 650, width: '100%' }}
                          rowHeight={35}
                          rows={rows}
                          columns={columns}
                          getRowId={(row) => row.id}
                          columnVisibilityModel={columnVisibility}
                          onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibility(newModel)
                          }
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
              </div>
            </CardContent>)}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};


export default ReduceToClear