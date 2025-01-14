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
import { getCompany, getStore } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";
import MultiSelectDropdown from "@/components/elements/MultiSelectDropdown";

const SupplierItemImport = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState<FormData[]>([]);
  const [storeList, setStoreList] = useState([]);
  const toggleCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  interface FormData {
    no: number;
    supplierId: string;
    supplierItemCode: string;
    supplierName: string;
    currentDescription: string;
    newDescription: string;
    phone: string;
  }

  const [formData, setFormData] = useState<FormData[]>([]);
  const sampleData: FormData[] = [
    {
      no: 1,
      supplierId: "SUP001",
      supplierItemCode: "ITEM12345",
      supplierName: "MM",
      currentDescription: "High-quality cotton fabric",
      newDescription: "Premium cotton fabric",
      phone: "123-456-7890",
    },
    {
      no: 2,
      supplierId: "SUP002",
      supplierItemCode: "ITEM67890",
      supplierName: "MM",
      currentDescription: "Industrial grade steel",
      newDescription: "High-strength steel",
      phone: "234-567-8901",
    },
    {
      no: 3,
      supplierId: "SUP003",
      supplierItemCode: "ITEM98765",
      supplierName: "JJ Supplies",
      currentDescription: "Water-resistant paint",
      newDescription: "Premium waterproof paint",
      phone: "345-678-9012",
    },
    {
      no: 4,
      supplierId: "SUP004",
      supplierItemCode: "ITEM54321",
      supplierName: "SteelWorld Ltd.",
      currentDescription: "Galvanized steel sheets",
      newDescription: "Rust-proof steel sheets",
      phone: "456-789-0123",
    },
    {
      no: 5,
      supplierId: "SUP005",
      supplierItemCode: "ITEM11223",
      supplierName: "EcoFurnish",
      currentDescription: "Bamboo furniture",
      newDescription: "Eco-friendly bamboo furniture",
      phone: "567-890-1234",
    },
    {
      no: 6,
      supplierId: "SUP006",
      supplierItemCode: "ITEM33445",
      supplierName: "GreenTech",
      currentDescription: "Solar-powered generators",
      newDescription: "High-efficiency solar generators",
      phone: "678-901-2345",
    },
    {
      no: 7,
      supplierId: "SUP007",
      supplierItemCode: "ITEM55667",
      supplierName: "SmartLights Co.",
      currentDescription: "LED smart bulbs",
      newDescription: "Bluetooth-controlled LED smart bulbs",
      phone: "789-012-3456",
    },
    {
      no: 8,
      supplierId: "SUP008",
      supplierItemCode: "ITEM77889",
      supplierName: "TechTools Inc.",
      currentDescription: "Cordless drill set",
      newDescription: "Advanced cordless drill set with extra battery",
      phone: "890-123-4567",
    },
    {
      no: 9,
      supplierId: "SUP009",
      supplierItemCode: "ITEM99000",
      supplierName: "OfficeSuppliesPro",
      currentDescription: "Ergonomic desk chairs",
      newDescription: "Adjustable ergonomic desk chairs",
      phone: "901-234-5678",
    },
    {
      no: 10,
      supplierId: "SUP010",
      supplierItemCode: "ITEM11112",
      supplierName: "PrintWorld",
      currentDescription: "Color laser printers",
      newDescription: "High-speed color laser printers",
      phone: "012-345-6789",
    },
  ];

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const store = await getStore();
        if (store.status !== 200) {
          console.error(store.data);
          return;
        }
        debugger;
        let storeList = store.data.data.map((st: any) => ({
          value: st.storeId.toString(),
          label: st.storeCode,
        }));
        setStoreList(storeList);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    fetchStore();
    setRows(sampleData);
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/supplier/supplier-item-import/${id.toString()}`);
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

        return [<GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />];
      },
    },
    { field: "no", headerName: "No", flex: 1 },
    { field: "supplierId", headerName: "Supplier ID", flex: 1 },
    { field: "supplierItemCode", headerName: "Supplier Item Code", flex: 1 },
    { field: "supplierName", headerName: "Supplier Name", flex: 1 },
    { field: "currentDescription", headerName: "Current Description", flex: 1 },
    { field: "newDescription", headerName: "New Description", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  const form = useForm<z.infer<typeof companySearchFormSchema>>({
    resolver: zodResolver(companySearchFormSchema),
    defaultValues: {
      no: 0,
      supplierId: "",
      supplierItemCode: "",
      supplierName: "",
      currentDescription: "",
      newDescription: "",
      phone: "",
    },
  });

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    no: false,
    supplierId: true,
    supplierItemCode: true,
    currentDescription: true,
    supplierName: true,
    newDescription: true,
    phone: true,
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
                    <InputField control={form.control} label="Item Code" name="itemCode" placeholder="Please enter item code" />
                    <InputField control={form.control} label="Supplier" name="supplier" placeholder="Please enter supplier" />
                    <SelectField control={form.control} label="Department" name="department" options={status} />
                    <InputField control={form.control} label="Supplier Item Code" name="supplierItemCode" />
                    <InputField control={form.control} label="item Name" name="itemName" placeholder="Please enter item name" />
                    <InputField control={form.control} label="Last Updated" name="lastUpdated" placeholder="Please enter last updated" />
                    <InputField control={form.control} label="Barcode" name="barcode" placeholder="Please enter barcode" />

                    <MultiSelectDropdown control={form.control} label="Department" name="department" options={storeList} />
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
            {/* <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} /> */}

            {isOpenGrid && (
              <CardContent>
                <div>
                  <div className="flex">
                    <div className="justify-start space-x-4  mt-2 pr-4">
                      <Button type="submit" className="btn-danger" onClick={onClickAddCompany}>
                        Assign to Store
                      </Button>
                    </div>

                    <div className="justify-start space-x-4  mt-2 pr-4">
                      <Button type="submit" className="btn-danger" onClick={onClickAddCompany}>
                        Accept All Changes
                      </Button>
                    </div>
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
                            getRowId={(row) => row.no}
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

export default SupplierItemImport;
