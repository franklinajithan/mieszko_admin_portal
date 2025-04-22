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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridRowsProp, GridToolbar, GridToolbarExport, useGridApiRef } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import { getCompany } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";
import { getReduceToClear, updateReduceToClear } from "@/service/sale.service";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/slices/notificationSlice";
import { v4 as uuidv4 } from "uuid";

const ReduceToClearList = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const dispatch = useDispatch();
  const apiRef = useGridApiRef();
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
        }
        setRows([]);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    fetchCompany();
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/sale/edit-reduce-to-clear/${id.toString()}`);
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "postingDate", headerName: "Posting Date", flex: 1, width: 100 },
    { field: "documentNumber", headerName: "Document Number", flex: 1, width: 100 },
    { field: "itemNumber", headerName: "Item Number", flex: 1, width: 100 },
    { field: "description", headerName: "Description", flex: 1, width: 100 },
    { field: "quantity", headerName: "Quantity", flex: 1, width: 100, editable: true },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1, width: 100, editable: true },
    { field: "currentCost", headerName: "Current Cost", flex: 1, width: 100, editable: true },
    { field: "currentSalesPrice", headerName: "Current Sales Price", flex: 1, width: 100, editable: true },
    { field: "promoSalesPrice", headerName: "Promo Sales Price", width: 150, editable: true },
    { field: "ApprovalStatus", headerName: "Approval Status", width: 150, editable: true },

    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "dd-MM-yy HH:mm"); // Using date-fns format
      },
    },
   
  ];

  const form = useForm<z.infer<typeof reduceToClearSearchFormSchema>>({
    resolver: zodResolver(reduceToClearSearchFormSchema),
    defaultValues: {
      id: "",
      postingDate: "",
      documentNumber: "",
      itemNumber: "",
      description: "",
      quantity: undefined,
      expiryDate: "",
      currentCost: undefined,
      currentSalesPrice: undefined,
      promoSalesPrice: undefined,
      ApprovalStatus: "",
    },
  });

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    id: true,
    postingDate: true,
    documentNumber: true,
    itemNumber: true,
    description: true,
    quantity: true,
    expiryDate: true,
    currentCost: true,
    currentSalesPrice: true,
    promoSalesPrice: true,
    ApprovalStatus: true,
  });

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const [pageSize, setPageSize] = React.useState(5); // Set default rows per page

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const storeOptions = [{ label: "Hays", value: "Hays" } /* other stores */];
  const categoryOptions = [{ label: "Cheese", value: "Cheese" } /* other categories */];
  const verificationOptions = [{ label: "Pending", value: "Pending" } /* other statuses */];

  const handleRTCUpdate = async (status: any) => {
    const payload = selectedRows.map((id) => ({ id, status }));
    try {
      // await updateRTCStatus(payload); // Send selected data to your service
      // alert(`Selected RTCs have been ${status}`);
      // Optionally refresh data after update
    } catch (error) {
      console.error(error);
    }
  };

  // const [rows, setRows] = useState(initialRows); // Replace `initialRows` with your initial data
  // const [selectedRows, setSelectedRows] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  // const [columnVisibility, setColumnVisibility] = useState({});

  const updateRowData = async (rowData: any) => {
    try {
      let body = {
        rtcDetails: [
          {
            id: rowData.id,
            qty: rowData.qty,
            price: rowData.price,
            //   categoryId: rowData.categoryname,
            updatedQty: rowData.updatedQty,
            verification: rowData.verification,
            approvedPrice: rowData.approvedPrice,
          },
        ],
      };

      const result = await updateReduceToClear(body);
      if (result.status !== 200) {
        console.error(result.data);
        return;
      }

      // Make an API call to update the row data in the backend
      // const response = await axios.post('/api/update-row', rowData);
      // return response.data;
    } catch (error) {
      console.error("Failed to update row data:", error);
      throw error;
    }
  };

  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="Reduce to Clear List" onToggle={toggleCardBody} isOpen={isOpenGrid} />

            {isOpenGrid && (
              <CardContent>
                <div>
                  <div className="w-full mt-3">
                    <div className="h-full w-full">
                      <div>
                        <ThemeProvider theme={theme}>
                          <DataGrid
                            apiRef={apiRef}
                            style={{ height: 650, width: "100%" }}
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableColumnResize={false}
                            sortingOrder={["asc", "desc", null]}
                            sortModel={sortModel}
                            onSortModelChange={(model: any) => setSortModel(model)}
                            filterModel={filterModel}
                            onFilterModelChange={(newModel: any) => setFilterModel(newModel)}
                            processRowUpdate={async (newRow: any) => {
                              const updatedRow = { ...newRow };

                              // Check if `approvedPrice` has changed
                              const existingRow: any = rows.find((row: any) => row.id === newRow.id);

                              const changedColumns = Object.keys(newRow).filter((key) => newRow[key] !== existingRow[key]);

                              if (existingRow && newRow.approvedPrice !== existingRow.approvedPrice && changedColumns.includes("approvedPrice")) {
                                updatedRow.verification = "Approved";
                                try {
                                  // Send the updated row data to the backend
                                  await updateRowData(updatedRow);
                                  //  console.log("Row data updated successfully");
                                } catch (error) {
                                  //  console.error("Failed to update row data:", error);
                                  // Handle error (e.g., revert the row change or show an error message)
                                  throw error;
                                }

                                setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));

                                return updatedRow;
                              } else if (existingRow && newRow.price !== existingRow.price && changedColumns.includes("price")) {
                                updatedRow.verification = "Processing";
                                if (existingRow.verification !== "Approved") {
                                  try {
                                    // Send the updated row data to the backend
                                    await updateRowData(updatedRow);
                                    //   console.log("Row data updated successfully");
                                  } catch (error) {
                                    //   console.error("Failed to update row data:", error);
                                    // Handle error (e.g., revert the row change or show an error message)
                                    throw error;
                                  }

                                  setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));

                                  return updatedRow;
                                } else {
                                  dispatch(
                                    addNotification({
                                      id: uuidv4(),
                                      message: "You cannot update this row",
                                      type: "error",
                                      duration: 2000,
                                    })
                                  );
                                  const field = Object.keys(newRow).find((key) => newRow[key] !== existingRow[key]);
                                  if (field) {
                                    apiRef.current.stopCellEditMode({
                                      id: newRow.id,
                                      field: field,
                                    });
                                  }
                                  setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? existingRow : row)));
                                  return existingRow;
                                }
                              } else if (existingRow && newRow.qty !== existingRow.qty && changedColumns.includes("qty") && existingRow.verification == "Pending") {
                                updatedRow.verification = "Pending"; // Set Verification Status to "Processing"
                                try {
                                  // Send the updated row data to the backend
                                  await updateRowData(updatedRow);
                                  console.log("Row data updated successfully");
                                } catch (error) {
                                  console.error("Failed to update row data:", error);
                                  // Handle error (e.g., revert the row change or show an error message)
                                  throw error;
                                }

                                setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));

                                return updatedRow;
                              } else {
                                dispatch(
                                  addNotification({
                                    id: uuidv4(),
                                    message: "You cannot update this row",
                                    type: "error",
                                    duration: 2000,
                                  })
                                );
                                const field = Object.keys(newRow).find((key) => newRow[key] !== existingRow[key]);
                                if (field) {
                                  apiRef.current.stopCellEditMode({
                                    id: newRow.id,
                                    field: field,
                                  });
                                }
                                setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? existingRow : row)));
                                return existingRow;
                              }
                            }}
                            onProcessRowUpdateError={(error: any) => console.error("Row update error:", error)}
                            onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => setSelectedRows([...rowSelectionModel] as GridRowId[])}
                            pagination
                            pageSizeOptions={[10, 15, 25, 50, 100]}
                            paginationMode="client"
                            columnVisibilityModel={columnVisibility}
                            onColumnVisibilityModelChange={(newModel: GridColumnVisibilityModel) => setColumnVisibility(newModel)}
                            slots={{
                              toolbar: () => (
                                <GridToolbar>
                                  <GridToolbarExport /> {/* Add export button here */}
                                </GridToolbar>
                              ),
                            }}
                            disableVirtualization={false}
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

export default ReduceToClearList;
