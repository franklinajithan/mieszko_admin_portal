

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
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridRowsProp, GridToolbar, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { getCompany } from "@/service/store.service";
import { useNavigate } from "react-router-dom";
import { on } from "events";
import { countries } from "@/data/enum";
import { getReduceToClear, updateReduceToClear } from "@/service/sale.service";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/slices/notificationSlice";
import { v4 as uuidv4 } from 'uuid';
const ReduceToClear = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false)
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
      },
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'barcode', headerName: 'Barcode', flex: 1, width: 100 },
    { field: 'itemName', headerName: 'Item Name', flex: 1, width: 100 },
    { field: 'storename', headerName: 'Store Name', flex: 1, width: 100 },
    { field: 'categoryname', headerName: 'Category', flex: 1, width: 100 },
    { field: 'qty', headerName: 'Quantity', flex: 1, width: 100, editable: true, },
    { field: 'updatedQty', headerName: 'Updated Quantity', flex: 1, width: 100, editable: true, },
    { field: 'count', headerName: 'Count', flex: 1, width: 100, editable: true, },
    { field: 'price', headerName: 'Price', flex: 1, width: 100, editable: true, },
    {
      field: 'approvedPrice',
      headerName: 'Approved Price',
      width: 150,
      editable: true,
      renderCell: (params) => (params.value != null ? `£ ${params.value}` : ''),
      preProcessEditCellProps: (params) => {
        const hasError = isNaN(Number(params.props.value));
        return { ...params.props, error: hasError };
      },
    },
    {
      field: 'verification',
      headerName: 'Verification Status',
      width: 150,
      editable: true,
      renderCell: (params) => {
        let cellClass = '';
        switch (params.value) {
          case 'Approved':
            cellClass = 'bg-green-100 text-green-800';
            break;
          case 'Processing':
            cellClass = 'bg-blue-100 text-blue-800';
            break;
          case 'Rejected':
            cellClass = 'bg-red-100 text-red-800';
            break;
          default:
            cellClass = 'bg-gray-100 text-gray-800'; // Default for 'Pending' or other statuses
        }

        return (
          <div
            className={`flex items-center justify-center font-bold ${cellClass}`}
            style={{
              width: '100%', // Full width
              height: '100%', // Full height
              padding: 0,
              margin: 0,
            }}
          >
            {params.value || "Pending"}
          </div>
        );
      },
      preProcessEditCellProps: (params) => {
        const validValues = ["Pending", "Approved", "Processing", "Rejected"];
        const hasError = !validValues.includes(params.props.value);
        return { ...params.props, error: hasError };
      },
      cellClassName: (params) => {
        // Optionally, apply a background color to the cell directly with tailwind classes
        switch (params.value) {
          case 'Approved':
            return 'bg-green-100';
          case 'Processing':
            return 'bg-blue-100';
          case 'Rejected':
            return 'bg-red-100';
          default:
            return 'bg-gray-100';
        }
      },
    },



    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, 'dd-MM-yy HH:mm'); // Using date-fns format
      },
    },
    { field: 'priceAddedAt', headerName: 'Price Added At', flex: 1 },
    { field: 'approvedAt', headerName: 'Approved At', flex: 1 },
    { field: 'expiryDate', headerName: 'Expiry Date', flex: 1 },
  ];





  const form = useForm<z.infer<typeof reduceToClearSearchFormSchema>>({
    resolver: zodResolver(reduceToClearSearchFormSchema),
    defaultValues: {

      barcode: "",
      itemName: "",
      verification: undefined,
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
    id: false,
    barcode: false,
    itemName: true,
    verification: true,
    storename: false,
    categoryname: false,
    qty: true,
    updatedQty: true,
    count: false,
    price: true,
    approvedPrice: true,
    createdAt: true,
    priceAddedAt: true,
    approvedAt: false,
    expiryDate: false,
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


  const handleRTCUpdate = async (status: any) => {
    debugger;
    const payload = selectedRows.map(id => ({ id, status }));
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
            approvedPrice: rowData.approvedPrice
          },
        ]
      }




      const result = await updateReduceToClear(body);
      if (result.status !== 200) {
        console.error(result.data);
        return;
      };










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

            <CardTitle title="Reduce to Clear" onToggle={toggleCardBody} isOpen={isOpenGrid} />


            {isOpenGrid && (<CardContent>


              <div>
                <div className="flex justify-between space-x-4 mt-2 pr-4">
                  {/* Left-aligned "New RTC" button */}
                  <Button type="submit" className="btn-cyan" onClick={onClickReduceToClear}>
                    New RTC
                  </Button>

                  {/* Right-aligned "Accept RTC" and "Reject RTC" buttons */}
                  <div className="flex space-x-4 ml-auto">
                    <Button className="btn-green" onClick={() => handleRTCUpdate('approve')}>
                      Accept RTC
                    </Button>
                    <Button className="btn-danger" onClick={() => handleRTCUpdate('reject')}>
                      Reject RTC
                    </Button>
                  </div>
                </div>
                <div className="w-full mt-3">
                  <div className="h-full w-full">
                    <div>
                      <ThemeProvider theme={theme}>
                        <DataGrid
                          apiRef={apiRef}
                          style={{ height: 650, width: '100%' }}
                          rows={rows}
                          columns={columns}
                          checkboxSelection
                          disableColumnResize={false}
                          sortingOrder={['asc', 'desc', null]}
                          sortModel={sortModel}
                          onSortModelChange={(model: any) => setSortModel(model)}
                          filterModel={filterModel}
                          onFilterModelChange={(newModel: any) => setFilterModel(newModel)}
                          processRowUpdate={async (newRow: any) => {
                            const updatedRow = { ...newRow };
                            debugger;
                            // Check if `approvedPrice` has changed
                            const existingRow: any = rows.find((row: any) => row.id === newRow.id);

                            const changedColumns = Object.keys(newRow).filter(
                              (key) => newRow[key] !== existingRow[key]
                            );


                            if (existingRow && newRow.approvedPrice !== existingRow.approvedPrice && changedColumns.includes('approvedPrice')) {

                              updatedRow.verification = "Approved";
                              try {
                                // Send the updated row data to the backend
                                await updateRowData(updatedRow);
                                console.log("Row data updated successfully");
                              } catch (error) {
                                console.error("Failed to update row data:", error);
                                // Handle error (e.g., revert the row change or show an error message)
                                throw error;
                              }


                              setRows((prevRows: any) =>
                                prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
                              );

                              return updatedRow;
                            } else if (existingRow && newRow.price !== existingRow.price && changedColumns.includes('price')) {
                              updatedRow.verification = "Processing";
                              if (existingRow.verification !== "Approved") {
                                try {
                                  // Send the updated row data to the backend
                                  await updateRowData(updatedRow);
                                  console.log("Row data updated successfully");
                                } catch (error) {
                                  console.error("Failed to update row data:", error);
                                  // Handle error (e.g., revert the row change or show an error message)
                                  throw error;
                                }

                                setRows((prevRows: any) =>
                                  prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
                                );

                                return updatedRow;
                              } else {
                                dispatch(addNotification({ id: uuidv4(), message: 'You cannot update this row', type: 'error', duration: 2000, }));
                                const field = Object.keys(newRow).find((key) => newRow[key] !== existingRow[key]);
                                if (field) { apiRef.current.stopCellEditMode({ id: newRow.id, field: field, }); }
                                setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? existingRow : row)));
                                return existingRow;
                              }

                            } else if (existingRow && newRow.qty !== existingRow.qty && changedColumns.includes('qty') && existingRow.verification == "Pending") {

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

                              setRows((prevRows: any) =>
                                prevRows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
                              );

                              return updatedRow;
                            }

                            else {
                              dispatch(addNotification({ id: uuidv4(), message: 'You cannot update this row', type: 'error', duration: 2000, }));
                              const field = Object.keys(newRow).find((key) => newRow[key] !== existingRow[key]);
                              if (field) { apiRef.current.stopCellEditMode({ id: newRow.id, field: field, }); }
                              setRows((prevRows: any) => prevRows.map((row: any) => (row.id === newRow.id ? existingRow : row)));
                              return existingRow;

                            }



                          }}
                          onProcessRowUpdateError={(error: any) => console.error("Row update error:", error)}
                          onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) =>
                            setSelectedRows([...rowSelectionModel] as GridRowId[])
                          }
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
            </CardContent>)}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};


export default ReduceToClear