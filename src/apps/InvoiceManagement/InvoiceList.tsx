
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Form } from "@/components/ui/form";
import { Filter, Loader2 } from 'lucide-react';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
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




const InvoiceList = ({ title, icon }: any) => {

  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate();
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
const [storeList, setStoreList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const fieldOptions: FieldOption[] = [
    { label: 'Supplier', name: 'supplier', checked: true },
    { label: 'Status', name: 'status', checked: true },
    { label: 'Delivery Date', name: 'deliveryDate', checked: true },
    { label: 'Store', name: 'store', checked: true },
    { label: 'Invoice Type', name: 'invoiceType', checked: true },
    { label: 'Department', name: 'department', checked: true },
    { label: 'Barcode', name: 'barcode', checked: true },
    { label: 'Item Name', name: 'itemName', checked: true },
    { label: 'Supplier Code', name: 'supplierCode', checked: true },
    { label: 'Item Code', name: 'itemCode', checked: true },
    { label: 'Return Id', name: 'returnId', checked: true },
    { label: 'Load List Id', name: 'loadListId', checked: true },
    { label: 'Order No', name: 'orderNo', checked: true },
    { label: 'Invoice No', name: 'invoiceNo', checked: true },
    { label: 'Supplier Ref', name: 'supplierRef', checked: true },
    { label: 'Delivery Node Id', name: 'deliveryNodeId', checked: true },
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
        };
       // setRows(company.data.data)
       setRows([])




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
        };
        setStoreList(store.data.data)

      } catch (e) {
        console.error(e);
      } finally {

      }
    };

    fetchCompany();
    fetchStore();
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
    { field: 'No', headerName: 'No', flex: 1 },
    { field: 'invoiceId', headerName: 'Invoice ID', flex: 1 },
    { field: 'orderId',  headerName: 'Order ID', flex: 1 },
    { field: 'loadListId', headerName: 'Load List ID  ', flex: 1 },
    { field: 'returnId', headerName: 'Return ID', flex: 1 },
    { field: 'deliveryDate', headerName: 'Delivery Date', flex: 1 },
    { field: 'supplier', headerName: 'Supplier', flex: 1 },
    { field: 'totalPrice', headerName: 'Total Price', flex: 1 },
    { field: 'priceDifference', headerName: 'Price Difference', flex: 1 },
    { field: 'totalRetailPrice', headerName: 'Total Retail Price', flex: 1 },
    { field: 'retailPriceDifference', headerName: 'Retail Price Difference', flex: 1 },
    { field: 'totalQty', headerName: 'Total Quantity', flex: 1 },
    { field: 'qtyDifference', headerName: 'Qty Difference', flex: 1 },
    { field: 'totalCase', headerName: 'Total Case', flex: 1 },
    { field: 'caseDifference', headerName: 'Case Difference', flex: 1 },
    { field: 'newItems', headerName: 'New Items', flex: 1 },
    { field: 'newBarCodes', headerName: 'New BarCodes', flex: 1 },
    { field: 'missingItems', headerName: 'Missing Items', flex: 1 },
    { field: 'invoiceType', headerName: 'Invoice Type', flex: 1 },
    { field: 'store', headerName: 'store', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];




  const form = useForm<z.infer<typeof companySearchFormSchema>>({
    resolver: zodResolver(companySearchFormSchema),
    defaultValues: {
      companyId: 0,
      companyCode: '',
      companyName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      status: true,
      taxNo: '',
      createdAt: new Date(),
      createdBy: 0,
      updatedAt: new Date(),
      updatedBy: 0,
      website: '',
      logo: null, // or an empty string, based on your needs
    },
  })


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



  const [searchTerm, setSearchTerm] = useState('');

  const handleCheck = (index: number) => {
    const updatedFields = [...fields];
    updatedFields[index].checked = !updatedFields[index].checked;
    setFields(updatedFields);
  };

  const handleReset = () => {
    setFields(fieldOptions.map(field => ({ ...field, checked: true })));
  };

  const handleShowHideAll = () => {
    const allChecked = fields.every(field => field.checked);
    setFields(fields.map(field => ({ ...field, checked: !allChecked })));
  };





  const getCheckValue = (name: any) => {
    let fieldVal = fields.find(field => { return field.name == name });
    return fieldVal?.checked;

  }

  const [fields, setFields] = useState(fieldOptions);
  const filteredFields = fields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  position: 'absolute',
                  right: 0,
                  top: '30%',
                  transform: 'translateY(-50%)',
                  width: '300px',
                },
              }}
            >

              <div className="p-3 border rounded shadow bg-white">
                <input type="text" placeholder="Search" value={searchTerm}  onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none"/>
                <div className=" max-h-48">



                  {filteredFields.map((field, index) => (
                    <CheckboxLabel key={index} label={field.label} name={field.name} checked={field.checked} onChange={() => handleCheck(index)} />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={handleShowHideAll} className="text-sm text-blue-500 hover:underline" >
                    Show/Hide All
                  </button>
                  <button onClick={handleReset} className="px-4 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
                  >
                    Reset
                  </button>
                </div>
              </div>

            </Dialog>



            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">



                    {getCheckValue('supplier') && <SelectField control={form.control} label="Supplier" name="supplier" options={sample} />}
                    {getCheckValue('status') && <SelectField control={form.control} label="Status" name="status" options={status} />}
                    {getCheckValue('deliveryDate') && <InputField  control={form.control} label="Delivery Date" type="date" name="deliveryDate"/>}
                    {getCheckValue('store') && <SelectField control={form.control} label="Store" name="store" options={sample} />}
                    {getCheckValue('invoiceType') && <SelectField control={form.control} label="Invoice Type" name="invoiceType" options={sample} />}
                    {getCheckValue('department') &&   <MultiSelectDropdown control={form.control} label="Department" name="department" options={groceryDepartments} />}
                    {getCheckValue('barcode') && <SelectField control={form.control} label="Barcode" name="barcode" options={countries} />}
                    {getCheckValue('itemName') && <SelectField control={form.control} label="Item Name" name="itemName" options={sample} />}
                    {getCheckValue('supplierCode') && <SelectField control={form.control} label="Supplier Code" name="supplierCode" options={sample} />}
                    {getCheckValue('itemCode') && <SelectField control={form.control} label="Item Code" name="itemCode" options={sample} />}
                    {getCheckValue('returnId') && <SelectField control={form.control} label="Return Id" name="returnId" options={sample} />}
                    {getCheckValue('loadListId') && <SelectField control={form.control} label="Load List Id" name="loadListId" options={sample} />}
                    {getCheckValue('orderNo') && <SelectField control={form.control} label="Order No" name="orderNo" options={sample} />}
                    {getCheckValue('invoiceNo') && <SelectField control={form.control} label="Invoice No" name="invoiceNo" options={sample} />}
                    {getCheckValue('supplierRef') && <SelectField control={form.control} label="Supplier Ref" name="supplierRef" options={sample} />}
                    {getCheckValue('deliveryNodeId') && <SelectField control={form.control} label="Delivery Node Id" name="deliveryNodeId" options={sample} />}







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

            {/* <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} /> */}


            {isOpenGrid && (<CardContent>


              <div>
                <div className="flex justify-start space-x-4  mt-2 pr-4">
                  <Button type="submit" className='btn-cyan' onClick={onClickAddInvoice}>
                    New Invoice
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
                          getRowId={(row) => row.companyId}
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


export default InvoiceList