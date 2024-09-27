
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
import { companySearchFormSchema, StoreListFormSchema, storeSearchFormSchema } from "@/lib/utils";
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
import { getCompany, getStore } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";

const StoreList = ({ title, icon }: any) => {
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
    const fetchStore = async () => {
      try {

        const store = await getStore();
        if (store.status !== 200) {
          console.error(store.data);
          return;
        };
        setRows(store.data.data)





      } catch (e) {
        console.error(e);
      } finally {

      }
    };

    fetchStore();
  }, [])

  const handleEditClick = (id: GridRowId) => () => {

    navigate(`/store/edit-store/${id.toString()}`);
    //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };
  const onClickAddCompany = () => {
    navigate(`/store/new-store`);
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


  // Column definitions for store management grid
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

    { field: 'storeId', headerName: 'Store ID', flex: 1 },
    { field: 'storeCode', headerName: 'Store Code', flex: 1 },
    { field: 'storeName', headerName: 'Store Name', flex: 1 },
    { field: 'inChargeName', headerName: 'In Charge Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'postcode', headerName: 'Postcode', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'website', headerName: 'Website', width: 250 },
    { field: 'logo', headerName: 'Logo', flex: 1 },
    { field: 'storeType', headerName: 'Store Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, type: 'boolean' },
  ];






  const form = useForm<z.infer<typeof storeSearchFormSchema>>({
    resolver: zodResolver(storeSearchFormSchema),
    defaultValues: {
      storeId: 0,
      storeCode: '',
      storeName: '',
      inChargeName: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      phone: '',
      email: '',
      website: '',
      logo: '',
      storeType: '',
      status: false,
    },
  });
  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    storeId: false,
    storeCode: true,
    storeName: true,
    inChargeName: false,
    address: true,
    city: true,
    state: true,
    postcode: true,
    country: false,
    phone: false,
    email: false,
    website: false,
    logo: false,
    storeType: true,
    status: false,
  });

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const countryOptions = [
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    // Add more options as needed
];

const storeTypeOptions = [
    { value: 'grocery', label: 'Grocery' },
    { value: 'pharmacy', label: 'Pharmacy' },
    // Add more options as needed
];

const onClickAddStore = () =>  {
  navigate(`/store/new-store`);
};


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
                    <InputField control={form.control} label="Store ID" name="storeId" type="number" />
                    <InputField control={form.control} label="Store Code" name="storeCode" type="text" />
                    <InputField control={form.control} label="Store Name" name="storeName" type="text" />
                    <InputField control={form.control} label="In Charge Name" name="inChargeName" type="text" />
                    <InputField control={form.control} label="Address" name="address" type="text" />
                    <InputField control={form.control} label="City" name="city" type="text" />
                    <InputField control={form.control} label="State" name="state" type="text" />
                    <InputField control={form.control} label="Postcode" name="postcode" type="text" />
                    <SelectField control={form.control} label="Country" name="country" options={countryOptions} />
                    <InputField control={form.control} label="Phone" name="phone" type="text" />
                    <InputField control={form.control} label="Email" name="email" type="email" />
                    <InputField control={form.control} label="Website" name="website" type="url" />
                    <InputField control={form.control} label="Logo" name="logo" type="text" />
                    <SelectField control={form.control} label="Store Type" name="storeType" options={storeTypeOptions} />
                    <SelectField control={form.control} label="Status" name="status" options={[
                      { value: true.toString(), label: 'Active' },
                      { value: false.toString(), label: 'Inactive' },
                    ]} />
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

            <CardTitle title="Store List" onToggle={toggleCardBody} isOpen={isOpenGrid} />


            {isOpenGrid && (<CardContent>


              <div>
                <div className="flex justify-start space-x-4  mt-2 pr-4">
                  <Button type="submit" className='btn-cyan' onClick={onClickAddStore}>
                    New Store
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
                          getRowId={(row) => row.storeId}
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


export default StoreList