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
import { companySearchFormSchema, specialOrderFormSchema, StoreListFormSchema } from "@/lib/utils";
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

const SpecialOrder = ({ title, icon }: any) => {
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

  const sampleData = [
    {
      Id: 1,
      orderId: "ORD1001",
      customerId: "CUST2001",
      customerName: "ABC Ltd",
      customerPhone: "07123456789",
      customerEmail: "customer1@example.com",
      loyaltyStatus: "Gold",
      store: "London",
      tillOrdered: "Till 3",
      processingLocation: "E14 5AB",
    },
    {
      Id: 2,
      orderId: "ORD1002",
      customerId: "CUST2002",
      customerName: "XYZ Corp",
      customerPhone: "07987654321",
      customerEmail: "customer2@example.com",
      loyaltyStatus: "Silver",
      store: "Manchester",
      tillOrdered: "Till 2",
      processingLocation: "M12 4AB",
    },
    {
      Id: 3,
      orderId: "ORD1003",
      customerId: "CUST2003",
      customerName: "Tech Solutions",
      customerPhone: "07876543210",
      customerEmail: "customer3@example.com",
      loyaltyStatus: "Platinum",
      store: "Birmingham",
      tillOrdered: "Till 1",
      processingLocation: "B15 2YZ",
    },
    {
      Id: 4,
      orderId: "ORD1004",
      customerId: "CUST2004",
      customerName: "MegaMart",
      customerPhone: "07765432109",
      customerEmail: "customer4@example.com",
      loyaltyStatus: "Bronze",
      store: "Glasgow",
      tillOrdered: "Till 4",
      processingLocation: "G12 8QQ",
    },
    {
      Id: 5,
      orderId: "ORD1005",
      customerId: "CUST2005",
      customerName: "ABC Ltd",
      customerPhone: "07543210987",
      customerEmail: "customer5@example.com",
      loyaltyStatus: "Gold",
      store: "London",
      tillOrdered: "Till 5",
      processingLocation: "E1 6AN",
    },
  ];

  useEffect(() => {
    // const fetchCompany = async () => {
    //   try {
    //     const company = await getCompany();
    //     if (company.status !== 200) {
    //       console.error(company.data);
    //       return;
    //     }
    //     setRows(company.data.data);
    //   } catch (e) {
    //     console.error(e);
    //   } finally {
    //   }
    // };
    // fetchCompany();
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/order/new-special-order/${id.toString()}`);
    //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };
  const onClickNewOrder = () => {
    navigate(`/order/new-special-order`);
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
    { field: "Id", headerName: "ID", flex: 1 },
    { field: "orderId", headerName: "Order Id", flex: 1 },
    { field: "customerId", headerName: "Customer Id", flex: 1 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "customerPhone", headerName: "Customer Phone", flex: 1 },
    { field: "customerEmail", headerName: "Customer Email", flex: 1 },
    { field: "loyaltyStatus", headerName: "Loyalty Status", flex: 1 },
    { field: "store", headerName: "Store", flex: 1 },
    { field: "tillOrdered", headerName: "Till Ordered", flex: 1 },
    { field: "processingLocation", headerName: "Postcode", flex: 1 },
  ];

  const form = useForm<z.infer<typeof specialOrderFormSchema>>({
    resolver: zodResolver(specialOrderFormSchema),
    defaultValues: {
      id: "",
      status: "",
      orderDate: "",
      deliveryDate: "",
      itemCode: "",
      itemName: "",
      customerName: "",
      mobile: "",
      email: "",
      storeOrdered: "",
      storeDelivered: "",
      depositAmount: "",
      receiptBarcode: "",
    },
  });

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    orderId: true,
    customerId: true,
    customerName: true,
    customerPhone: true,
    customerEmail: true,
    loyaltyStatus: true,
    store: true,
    tillOrdered: true,
    processingLocation: true,
  });

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
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
                    <SelectField control={form.control} label="ID" name="id" options={sample} />
                    <SelectField control={form.control} label="Status" name="status" options={sample} />
                    <SelectField control={form.control} label="Order Date" name="orderDate" options={status} />
                    <SelectField control={form.control} label="Delivery Date" name="deliveryDate" options={sample} />
                    <SelectField control={form.control} label="Item Code" name="itemCode" options={sample} />
                    <SelectField control={form.control} label="Item Name" name="itemName" options={sample} />
                    <SelectField control={form.control} label="Customer Name" name="Customer Name" options={countries} />
                    <SelectField control={form.control} label="Mobile" name="mobile " options={sample} />
                    <InputField control={form.control} label="Email" name="email" type="email" />
                    <InputField control={form.control} label="Store Ordered" name="storeOrdered" type="text" />
                    <InputField control={form.control} label="Store Delivered" name="storeDelivered" type="text" />
                    <InputField control={form.control} label="Deposit Amount" name="depositAmount" type="text" />
                    <InputField control={form.control} label="Receipt Barcode" name="receiptBarcode" type="text" />
                  </div>

                  <hr className="border-t border-zinc-300" />

                  <div className="flex justify-end space-x-4 mt-2 pr-4">
                    <button className="btn-zinc">Clear</button>
                    <Button type="submit" disabled={isLoading} className="btn-cyan">
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                        </>
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Form>
          </Card>
          <Card className="card-one mt-2">
            <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} />

            {isOpenGrid && (
              <CardContent>
                <div>
                  <div className="flex justify-start space-x-4  mt-2 pr-4">
                    <Button type="submit" className="btn-cyan" onClick={onClickNewOrder}>
                      New Special Order
                    </Button>
                  </div>
                  <div className="w-full mt-3">
                    <div className="h-full w-full">
                      <div>
                        <ThemeProvider theme={theme}>
                          <DataGrid
                            style={{ height: 650, width: "100%" }}
                            rowHeight={35}
                            rows={sampleData}
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
export default SpecialOrder;
