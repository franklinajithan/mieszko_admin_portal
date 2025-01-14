import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPackage } from "react-icons/fi";
import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import MultiDateField from "@/components/elements/MultiDateField";
import { groceryDepartments, sample, status } from "../../data/constants";
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
import { Filter, Loader2 } from "lucide-react";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import { getCompany, getStore } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import IOSSwitch from "@/components/elements/toggleTheme";
import CommonSwitch from "@/components/ui/CommonSwitch";
import CheckboxLabel from "@/components/elements/CheckboxLabel";
import MultiSelectDropdown from "@/components/elements/MultiSelectDropdown";

interface FieldOption {
  name: string;
  label: string;
  checked: boolean;
}

const SingleInvoice = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
  const [storeList, setStoreList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const fieldOptions: FieldOption[] = [
    { label: "Supplier", name: "supplier", checked: true },
    { label: "Status", name: "status", checked: true },
    { label: "Delivery Date", name: "deliveryDate", checked: true },
    { label: "Store", name: "store", checked: true },
    { label: "Invoice Type", name: "invoiceType", checked: true },
    { label: "Department", name: "department", checked: true },
    { label: "Barcode", name: "barcode", checked: true },
    { label: "Item Name", name: "itemName", checked: true },
    { label: "Supplier Code", name: "supplierCode", checked: true },
    { label: "Item Code", name: "itemCode", checked: true },
    { label: "Return Id", name: "returnId", checked: true },
    { label: "Load List Id", name: "loadListId", checked: true },
    { label: "Order No", name: "orderNo", checked: true },
    { label: "Invoice No", name: "invoiceNo", checked: true },
    { label: "Supplier Ref", name: "supplierRef", checked: true },
    { label: "Delivery Node Id", name: "deliveryNodeId", checked: true },
  ];

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
        // setRows(company.data.data)
        setRows([]);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    const fetchStore = async () => {
      try {
        const store = await getStore();
        if (store.status !== 200) {
          console.error(store.data);
          return;
        }
        setStoreList(store.data.data);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    fetchCompany();
    fetchStore();
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
  const onClickAddInvoice = () => {
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
    { field: "No", headerName: "No", flex: 1 },
    { field: "LineNumber", headerName: "Line #", flex: 1 },
    { field: "OrderCode", headerName: "Order Code", flex: 1 },
    { field: "ItemCode", headerName: "Item Code", flex: 1 },
    { field: "ItemGroup", headerName: "Item Group", flex: 1 },
    { field: "SequenceNumber", headerName: "Sequence #", flex: 1 },
    { field: "ItemSize", headerName: "Item Size", flex: 1 },
    { field: "SupplierCode", headerName: "Supp. Code", flex: 1 },
    { field: "InnerEAN", headerName: "Inner EAN", flex: 1 },
    { field: "ItemName", headerName: "Item Name", flex: 1 },
    { field: "DeliveryNetCost", headerName: "Delivery Net Cost", flex: 1 },
    { field: "CaseSize", headerName: "Case Size (Unit in Box)", flex: 1 },
    { field: "UnitCost", headerName: "Unit Cost (Price)", flex: 1 },
    { field: "WeightType", headerName: "Weight Type", flex: 1 },
    { field: "DeliveryCaseQty", headerName: "Delivere Case Qty", flex: 1 },
    { field: "DeliveryNewMargin", headerName: "Delivery New Margin", flex: 1 },
    { field: "DeliveryWeight", headerName: "Delivere Weight", flex: 1 },
    { field: "Retail", headerName: "Retail", flex: 1 },
    { field: "NewRetail", headerName: "New Retail", flex: 1 },
    { field: "PromRetail", headerName: "Prom Retail", flex: 1 },
    { field: "ActualCaseQty", headerName: "Actual Case Qty (Box)", flex: 1 },
    { field: "LastReceivedNetCost", headerName: "Last Received Net Cost", flex: 1 },
    { field: "InStockAtLocation", headerName: "In Stock At Location", flex: 1 },
    { field: "TotalUnits", headerName: "Total Units", flex: 1 },
    { field: "SupplierDeliveredQty", headerName: "Supplier Delivered Qty", flex: 1 },
    { field: "TotalNetCost", headerName: "Total Net Cost", flex: 1 },
    { field: "TotalNetCostInclSurcharge", headerName: "Total Net Cost (Incl. Surcharge)", flex: 1 },
    { field: "VATRate", headerName: "VAT Rate (%)", flex: 1 },
    { field: "VAT", headerName: "VAT", flex: 1 },
    { field: "ActualFreeQty", headerName: "Actual Free Qty", flex: 1 },
    { field: "ActualWeightBoxes", headerName: "Actual Weight (Boxes)", flex: 1 },
    { field: "MinimumStock", headerName: "Minimum Stock", flex: 1 },
    { field: "ProductStock", headerName: "Product Stock", flex: 1 },
    { field: "TotalSurcharge", headerName: "Total Surcharge", flex: 1 },
    { field: "PriceMarkFlag", headerName: "Price Mark Flag", flex: 1 },
    { field: "RRP", headerName: "RRP", flex: 1 },
    { field: "LastReceivedMargin", headerName: "Last Received Margin", flex: 1 },
    { field: "MultibuyPromotionCount", headerName: "Multibuy Promotion Count", flex: 1 },
    { field: "TotalInStock", headerName: "Total In Stock", flex: 1 },
    { field: "UnitQty", headerName: "Unit Qty", flex: 1 },
    { field: "ItemStatus", headerName: "Item Status", flex: 1 },
    { field: "LastUpdatedDate", headerName: "Last Updated Date", flex: 1 },
    { field: "LastUpdatedBy", headerName: "Last Updated By", flex: 1 },
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
    No: true,
    LineNumber: false, // Not critical, hidden by default
    OrderCode: true,
    ItemCode: true,
    ItemGroup: false, // Hidden by default
    SequenceNumber: false, // Hidden by default
    ItemSize: true,
    SupplierCode: false, // Hidden by default
    InnerEAN: false, // Hidden by default
    ItemName: true,
    DeliveryNetCost: true,
    CaseSize: false, // Hidden by default
    UnitCost: true,
    WeightType: false, // Hidden by default
    DeliveryCaseQty: true,
    DeliveryNewMargin: false, // Hidden by default
    DeliveryWeight: false,
    Retail: true,
    NewRetail: true,
    PromRetail: false, // Hidden by default
    ActualCaseQty: true,
    LastReceivedNetCost: false,
    InStockAtLocation: false,
    TotalUnits: true,
    SupplierDeliveredQty: false, // Hidden by default
    TotalNetCost: true,
    TotalNetCostInclSurcharge: false, // Hidden by default
    VATRate: false, // Hidden by default
    VAT: true,
    ActualFreeQty: false, // Hidden by default
    ActualWeightBoxes: false,
    MinimumStock: true,
    ProductStock: false, // Hidden by default
    TotalSurcharge: false, // Hidden by default
    PriceMarkFlag: false, // Hidden by default
    RRP: true,
    LastReceivedMargin: false, // Hidden by default
    MultibuyPromotionCount: false, // Hidden by default
    TotalInStock: true,
    UnitQty: true,
    ItemStatus: false, // Hidden by default
    LastUpdatedDate: false,
    LastUpdatedBy: false, // Hidden by default
  });

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleCheck = (index: number) => {
    const updatedFields = [...fields];
    updatedFields[index].checked = !updatedFields[index].checked;
    setFields(updatedFields);
  };

  const handleReset = () => {
    setFields(fieldOptions.map((field) => ({ ...field, checked: true })));
  };

  const handleShowHideAll = () => {
    const allChecked = fields.every((field) => field.checked);
    setFields(fields.map((field) => ({ ...field, checked: !allChecked })));
  };

  const getCheckValue = (name: any) => {
    let fieldVal = fields.find((field) => {
      return field.name == name;
    });
    return fieldVal?.checked;
  };

  const [fields, setFields] = useState(fieldOptions);
  const filteredFields = fields.filter((field) => field.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filters = [
    { label: "Total Lines", value: 109, color: "bg-gray-500" },
    { label: "Shortages (Received)", value: 109, color: "bg-red-500" },
    { label: "Shortages (Delivered)", value: 109, color: "bg-green-500" },
    { label: "Current Stock Zero", value: 42, color: "bg-yellow-500" },
    { label: "Sell & Cost Promo", value: 20, color: "bg-blue-500" },
    { label: "Cost Promo Only", value: 20, color: "bg-purple-500" },
    { label: "Low Margin", value: 3, color: "bg-orange-500" },
    { label: "Negative Margin", value: 2, color: "bg-pink-500" },
    { label: "Substitution", value: 0, color: "bg-gray-300" },
    { label: "Multibuy Promotions", value: 0, color: "bg-gray-300" },
    { label: "Sell Promo Only", value: 0, color: "bg-blue-400" },
    { label: "Weight Type Diff.", value: 0, color: "bg-yellow-400" },
    { label: "Unavailable", value: 0, color: "bg-gray-300" },
    { label: "New Items", value: 0, color: "bg-green-400" },
    { label: "Duplicates", value: 0, color: "bg-red-400" },
    { label: "Order Additions", value: 0, color: "bg-yellow-400" },
    { label: "Overs", value: 0, color: "bg-orange-300" },
  ];
  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="Search" onShowPopup={() => setShowPopup(true)} />
            <Dialog
              open={showPopup}
              onClose={() => setShowPopup(false)}
              PaperProps={{
                sx: {
                  position: "absolute",
                  right: 0,
                  top: "30%",
                  transform: "translateY(-50%)",
                  width: "300px",
                },
              }}
            >
              <div className="p-3 border rounded shadow bg-white">
                <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none" />
                <div className=" max-h-48">
                  {filteredFields.map((field, index) => (
                    <CheckboxLabel key={index} label={field.label} name={field.name} checked={field.checked} onChange={() => handleCheck(index)} />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={handleShowHideAll} className="text-sm text-blue-500 hover:underline">
                    Show/Hide All
                  </button>
                  <button onClick={handleReset} className="px-4 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                    Reset
                  </button>
                </div>
              </div>
            </Dialog>

            <div className=" mx-auto bg-white shadow-md rounded-md">
              {/* Header Section */}
              <div className="flex flex-wrap items-center gap-4 p-4 border-b">
                <div className="flex items-center gap-2">
                  <label htmlFor="supplier" className="font-medium">
                    Supplier
                  </label>
                  <select id="supplier" className="border rounded-md p-2 text-sm">
                    <option>MasterMedia - Basic</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="dispatch" className="font-medium">
                    Dispatch No
                  </label>
                  <input id="dispatch" type="text" value="2501-SP/02" className="border rounded-md p-2 text-sm" readOnly />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="location" className="font-medium">
                    Location
                  </label>
                  <select id="location" className="border rounded-md p-2 text-sm">
                    <option>Store</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="delivery-date" className="font-medium">
                    Delivery Date
                  </label>
                  <input id="delivery-date" type="date" value="2025-01-10" className="border rounded-md p-2 text-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="comments" className="font-medium">
                    Comments
                  </label>
                  <input id="comments" type="text" value="Download Insert" className="border rounded-md p-2 text-sm" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply All</button>
              </div>

              {/* Delivery Summary Section */}
              <div className="overflow-x-auto p-4">
                <div className="flex flex-wrap gap-4">
                  {/* First Table */}
                  <table className="table-auto w-full text-left text-sm border-collapse border border-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-2 border border-gray-300">As Per Actual</th>
                        <th className="p-2 border border-gray-300">Total Lines</th>
                        <th className="p-2 border border-gray-300">Total Case Qty</th>
                        <th className="p-2 border border-gray-300">Total Unit Qty</th>
                        <th className="p-2 border border-gray-300">Total Qty</th>
                        <th className="p-2 border border-gray-300">Total Net Cost</th>
                        <th className="p-2 border border-gray-300">Total Surcharge</th>
                        <th className="p-2 border border-gray-300">Total VAT</th>
                        <th className="p-2 border border-gray-300">Total Cost</th>
                        <th className="p-2 border border-gray-300">Total Retail</th>
                        <th className="p-2 border border-gray-300">Total Net Margin</th>
                        <th className="p-2 border border-gray-300">Margin(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-gray-300">This Delivery</td>
                        <td className="p-2 border border-gray-300">109.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.0000</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.0000</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Second Table */}
                  <table className="table-auto w-full text-left text-sm border-collapse border border-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-2 border border-gray-300">As Per GRN</th>
                        <th className="p-2 border border-gray-300">Total Lines</th>
                        <th className="p-2 border border-gray-300">Total Case Qty</th>
                        <th className="p-2 border border-gray-300">Total Qty</th>
                        <th className="p-2 border border-gray-300">Total Net Cost</th>
                        <th className="p-2 border border-gray-300">Total Surcharge</th>
                        <th className="p-2 border border-gray-300">Total VAT</th>
                        <th className="p-2 border border-gray-300">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-gray-300">This Delivery</td>
                        <td className="p-2 border border-gray-300">109.00</td>
                        <td className="p-2 border border-gray-300">196.00</td>
                        <td className="p-2 border border-gray-300">1694.00</td>
                        <td className="p-2 border border-gray-300">1344.2700</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">1344.2700</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-wrap gap-2 p-4">
                {filters.map((filter, index) => (
                  <button key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${filter.color}`}>
                    <span>{filter.label}</span>
                    <span>({filter.value})</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
          <Card className="card-one mt-2">
            {/* <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} /> */}

            {isOpenGrid && (
              <CardContent>
                <div>
                  <div className="flex justify-start space-x-4  mt-2 pr-4">
                    <Button type="submit" className="btn-cyan" onClick={onClickAddInvoice}>
                      New Invoice
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
                            getRowId={(row) => row.companyId}
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

export default SingleInvoice;
