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
import { companySearchFormSchema, StoreListFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import { getCompany } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";

const FillScanListDetail = ({ title, icon }: any) => {
  const sampleData: any = [
    {
      Id: 1,
      "Fill Id": "C001",
      companyName: "Tech Solutions Ltd",
      allottedShelfSpace: "50 sq ft",
      itemCount: 120,
      shelfNumber: "A12",
      shelfLocation: "Warehouse 1",
      totalShelfSize: "200 sq ft",
      presentShelfCount: 80,
      department: "Electronics",
      scanPerson: "John Doe",
    },
    {
      Id: 2,
      "Fill Id": "C002",
      companyName: "Green Foods Inc",
      allottedShelfSpace: "30 sq ft",
      itemCount: 90,
      shelfNumber: "B05",
      shelfLocation: "Warehouse 2",
      totalShelfSize: "150 sq ft",
      presentShelfCount: 60,
      department: "Groceries",
      scanPerson: "Jane Smith",
    },
    {
      Id: 3,
      "Fill Id": "C003",
      companyName: "Fashion Trends",
      allottedShelfSpace: "40 sq ft",
      itemCount: 75,
      shelfNumber: "C22",
      shelfLocation: "Warehouse 3",
      totalShelfSize: "180 sq ft",
      presentShelfCount: 70,
      department: "Clothing",
      scanPerson: "Mark Johnson",
    },
    {
      Id: 4,
      "Fill Id": "C004",
      companyName: "Home Essentials",
      allottedShelfSpace: "60 sq ft",
      itemCount: 150,
      shelfNumber: "D11",
      shelfLocation: "Warehouse 4",
      totalShelfSize: "220 sq ft",
      presentShelfCount: 110,
      department: "Home & Living",
      scanPerson: "Lisa Adams",
    },
  ];
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
  const toggleCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await getCompany();
        if (company.status !== 200) {
          console.error(company.data);
          return;
        }
        setRows(sampleData);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    fetchCompany();
  }, []);

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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
          ];
        }

        return [<GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />, <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />];
      },
    },
    { field: "Id", headerName: "Company ID", flex: 1 },
    { field: "Fill Id", headerName: "Company Code", flex: 1 },
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "allottedShelfSpace", headerName: "Allotted Shelf Space", flex: 1 },
    { field: "itemCount", headerName: "Item Count", flex: 1 },
    { field: "shelfNumber", headerName: "Shelf Number", flex: 1 },
    { field: "shelfLocation", headerName: "Shelf Location", flex: 1 },
    { field: "totalShelfSize", headerName: "Total Shelf Size", flex: 1 },
    { field: "presentShelfCount", headerName: "Present Shelf Count", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "scanPerson", headerName: "Scan Person", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
  ];

  const form = useForm<z.infer<typeof companySearchFormSchema>>({
    resolver: zodResolver(companySearchFormSchema),
    defaultValues: {
      companyId: 0,
      companyCode: "",
      companyName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      status: true,
      taxNo: "",
      createdAt: new Date(),
      createdBy: 0,
      updatedAt: new Date(),
      updatedBy: 0,
      website: "",
      logo: null, // or an empty string, based on your needs
    },
  });

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

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
  };
  const { handleSubmit, formState, reset } = form;
  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="Fill Scan List" onToggle={toggleCardBody} isOpen={isOpenGrid} />
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <InputField control={form.control} label="Item Name" name="itemName" type="text" placeholder="Enter item name" />
                    <InputField control={form.control} label="Allotted Shelf Space" name="allottedShelfSpace" type="text" placeholder="Enter allotted shelf space" />
                    <InputField control={form.control} label="Item Size" name="itemSize" type="text" placeholder="Enter item size" />
                    <InputField control={form.control} label="Shelf Number" name="shelfNumber" type="text" placeholder="Enter shelf number" />
                    <InputField control={form.control} label="Shelf Location" name="shelfLocation" type="text" placeholder="Enter shelf location" />
                    <InputField control={form.control} label="Total Shelf Size" name="totalShelfSize" type="text" placeholder="Enter total shelf size" />
                    <InputField control={form.control} label="Present Shelf Count" name="presentShelfCount" type="text" placeholder="Enter present shelf count" />
                    <InputField control={form.control} label="Product Placement" name="productPlacement" type="text" placeholder="Enter product placement" />
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

            {isOpenGrid && (
              <CardContent>
                <div>
                  <div className="flex justify-start space-x-4  mt-2 pr-4">
                    <Button type="submit" className="btn-cyan" onClick={onClickAddCompany}>
                      Fill Scan List
                    </Button>
                  </div>
                  <div className="w-full mt-3">
                    <div className="h-full w-full">
                      <div>
                        <ThemeProvider theme={theme}>
                          <DataGrid
                            style={{ height: 650, width: "100%" }}
                            rowHeight={35}
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.Id}
                            columnVisibilityModel={columnVisibility}
                            onColumnVisibilityModelChange={(newModel) => setColumnVisibility(newModel)}
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
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FillScanListDetail;
