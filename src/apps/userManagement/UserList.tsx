import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark, FiUsers } from "react-icons/fi";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import HeaderComponents from "@/components/elements/HeaderSection";
import { deleteUser, getUser } from "@/service/user.service";
import { CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import theme from "@/components/elements/GridTheme";
import CardTitle from "@/components/elements/CardTitle";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, SaveIcon } from "lucide-react";

import { z } from "zod";
import SelectField from "@/components/elements/SelectField";
import { sample, status } from "@/data/constants";
import CheckboxField from "@/components/elements/CheckboxField";
import { userSearchSchema } from "@/lib/utils";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./DeleteUser";
import { useToast } from "@/hooks/use-toast";

export default function UserList({ title, icon }: any) {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skin, setSkin] = useState(currentSkin);
    const [rows, setRows] = useState([])
    const [deleteUserId, setDeleteUserId] = useState(null)
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isOpenSearch, setIsOpenSearch] = useState(true);
    const toggleSearchCardBody = () => {
        setIsOpenSearch(!isOpenSearch);
    };
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const [isOpenGrid, setIsOpenGrid] = useState(true);
    const toggleGridCardBody = () => {
        setIsOpenGrid(!isOpenGrid);
    };
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);





 

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };
    const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
        userId: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true, // Assuming 'phone' as 'mobile'
        status: true,
        roles: true, // Example of hiding a column
        hasAccessToMobile: false,
        hasAccessToBackOffice: false,
        hasAccessToPos: false,
        hasVisaDetails: false,
        dob: true,
        address: false,
        city: false,
        state: false,
        country: false,
        postcode: false
    });


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
                        color="error"
                    />,
                ];
            }
        },
        { field: 'userId', headerName: 'User ID', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'phone', headerName: 'Mobile', flex: 1 }, // Assuming 'phone' as 'mobile'
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'roleName', headerName: 'Role', flex: 1 }, // Roles might need further formatting if shown
        { field: 'hasAccessToMobile', headerName: 'Mobile Access', flex: 1 },
        { field: 'hasAccessToBackOffice', headerName: 'Back Office Access', flex: 1 },
        { field: 'hasAccessToPos', headerName: 'POS Access', flex: 1 },
        { field: 'hasVisaDetails', headerName: 'Visa Details', flex: 1 },
        { field: 'dob', headerName: 'Date of Birth', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'city', headerName: 'City', flex: 1 },
        { field: 'state', headerName: 'State', flex: 1 },
        { field: 'country', headerName: 'Country', flex: 1 },
        { field: 'postcode', headerName: 'Postcode', flex: 1 }
    ];


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUser();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                };
                setRows(result.data.data);



            } catch (e) {
                console.error(e);
            } finally {
                // Cleanup or additional logic can go here if needed.
            }
        };

        fetchUser();
    }, []);


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



    const handleEditClick = (id: GridRowId) => () => {

        navigate(`/user/edit-user/${(id.toString())}`);

    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: any) => () => {
        setDeleteUserId(id)
        setIsDeleteDialogOpen(true);

        // setRows(rows.filter((row: any) => row.id !== id));
    };

    const onclickDeleteUser = () => {
        const removeUser = async () => {
            try {
                const result = await deleteUser(deleteUserId);
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                };
                toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
                setIsDeleteDialogOpen(false);
                const user = await getUser();
                if (user.status !== 200) {
                    console.error(user.data);
                    return;
                };
                setRows(user.data.data);

            } catch (e) {
                console.error(e);
            } finally {
                // Cleanup or additional logic can go here if needed.
            }
        };

        removeUser();
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


    const handleRedirect = () => {
        navigate('/user/new-user'); // Redirect to the desired path
    };
    return (
        <div>

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
                                        <SelectField control={form.control} label="Status" name="status" options={status} />
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
                        <CardTitle title="User Grid" onToggle={toggleGridCardBody} isOpen={isOpenGrid} />
                        {isOpenGrid && (<CardContent>
                            <div className="flex justify-start space-x-4  mt-2 pr-4">
                                <Button type="submit" className='form-btn btn-cyan' onClick={handleRedirect}>
                                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                    New User
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
                                                getRowId={(row) => row.userId}
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





            </div>
            <DeleteUser
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onDelete={onclickDeleteUser}
            />
        </div>
    );
}
