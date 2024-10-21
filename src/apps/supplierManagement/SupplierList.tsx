import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import theme from "@/components/elements/GridTheme";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { useToast } from "@/hooks/use-toast";
import { Loader2, SaveIcon, } from "lucide-react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelIcon from '@mui/icons-material/Close';
import { deleteSupplier, getSuppliers } from "@/service/supplier.service";
import { Card, CardContent } from "@/components/ui/card";
import HeaderComponents from "@/components/elements/HeaderSection";
import CardTitle from "@/components/elements/CardTitle";
import { useForm } from "react-hook-form";
import { userSearchSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectField from "@/components/elements/SelectField";
import { Form } from "@/components/ui/form";
import CheckboxField from "@/components/elements/CheckboxField";
import { sample } from "@/data/constants";


export default function SupplierList({ title, icon }: any) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteSupplierId, setDeleteSupplierId] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />
        ];
      }
    },
    { field: 'supplierId', headerName: 'Supplier ID', flex: 1 },
    { field: 'supplierName', headerName: 'Supplier Name', flex: 1 },
    { field: 'contactPersonName', headerName: 'Contact Person', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'supplierType', headerName: 'Supplier Type', flex: 1 },
    { field: 'creditScore', headerName: 'Credit Score', flex: 1 },
  ];

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const result = await getSuppliers();
        if (result.status !== 200) {
          console.error(result.data);
          return;
        };
        setRows(result.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSuppliers();
  }, []);


  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    supplierId: true,
    supplierName: true,
    contactPersonName: true,
    supplierEmail: true,
    supplierPhone: true,
    supplierStatus: true,
    supplierType: true,
    creditScore: true,
  });

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/supplier/edit-supplier/${id}`);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: any) => () => {
    setDeleteSupplierId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const onClickDeleteSupplier = async () => {
    try {
      const result = await deleteSupplier(deleteSupplierId);
      if (result.status !== 200) {
        console.error(result.data);
        return;
      };
      toast({ variant: "success", title: result.data.status, description: result.data.message });
      const supplier = await getSuppliers();
      setRows(supplier.data.data);
      setIsDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const toggleSearchCardBody = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const form = useForm<z.infer<typeof userSearchSchema>>({
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      role: "",  // Default value for the "Role" select field
      type: "",  // Default value for the "Type" select field
      reporting: "",  // Default value for the "Reporting" select field
      status: "",  // Default value for the "Status" select field
      usersAccessToPOS: false,  // Default value for the "Users Access to POS" checkbox
      userAccessToMobile: false,  // Default value for the "User Access to Mobile" checkbox
    },
  });


  function onSubmit(values: z.infer<typeof userSearchSchema>) {
    setIsLoading(true);
    setIsLoading(false);
  }
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const toggleGridCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  const handleRedirect = () => {
    navigate('/supplier/new-supplier'); // Redirect to the desired path
  };

  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">
        {/* Header */}
        <HeaderComponents icon={icon} title={title} />
        <Card className="card-one mt-2">

          <CardTitle title="Search" onToggle={toggleSearchCardBody} isOpen={isOpenSearch} />
          {isOpenSearch && (<CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex w-full grid grid-cols-6 gap-3 mt-2">

                  <SelectField control={form.control} label="Role" name="role" options={sample} />
                  <SelectField control={form.control} label="Type" name="type" options={sample} />
                  <SelectField control={form.control} label="Reporting" name="reporting" options={sample} />
                  <CheckboxField control={form.control} id="posAccess" label="Users Access to POS" name="usersAccessToPOS" />
                  <CheckboxField control={form.control} id="mobileAccess" label="User Access to Mobile" name="userAccessToMobile" />


                </div>

                <hr className="border-t border-zinc-300 " />
                <div className="flex justify-end space-x-4  mt-2 pr-4">
                  <Button type="submit" disabled={isLoading} className='btn-cyan'>
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSearch} />
                        &nbsp; Search
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>)}
        </Card>
        <Card className="card-one mt-2">
          <CardTitle title="Supplier Grid" onToggle={toggleGridCardBody} isOpen={isOpenGrid} />
          {isOpenGrid && (<CardContent>
            <div className="flex justify-start space-x-4  mt-2 pr-4">
              <Button type="submit" className='form-btn btn-cyan' onClick={handleRedirect}>
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                New Supplier
              </Button>
            </div>
            <div className="w-full mt-3"> {/* TailwindCSS classes for height and width */}
              <div className="h-full w-full"> {/* Container for DataGrid */}
                <div>
                  <ThemeProvider theme={theme}>
                    <DataGrid autoHeight
                      // disableColumnFilter
                      // disableColumnSelector
                      // disableDensitySelector
                      // checkboxSelection
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                      }}

                      columnVisibilityModel={columnVisibility}
                      onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibility(newModel)
                      }
                      getRowId={(row) => row.supplierId}
                      rowHeight={35}
                      rows={rows}
                      columns={columns}
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
                      }
                      }
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>

          </CardContent>)}

        </Card>
      </div>
      {/* {isDeleteDialogOpen && <DeleteSupplierDialog onDelete={onClickDeleteSupplier} onClose={() => setIsDeleteDialogOpen(false)} />} */}
    </div>
  );
}
