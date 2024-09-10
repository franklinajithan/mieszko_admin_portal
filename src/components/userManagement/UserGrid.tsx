import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark, FiUsers } from "react-icons/fi";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import HeaderComponents from "@/elements/HeaderSection";
import { getUser } from "@/service/user.service";
import { CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import theme from "@/elements/GridTheme";
import CardTitle from "@/elements/CardTitle";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { z } from "zod";
import SelectField from "@/elements/SelectField";
import { sample } from "@/data/constants";
import CheckboxField from "@/elements/CheckboxField";
import { userSearchSchema } from "@/lib/utils";

export default function UserGrid({ title,icon}:any) {
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skin, setSkin] = useState(currentSkin);
    const [rows, setRows] = useState([])
    const navigate = useNavigate();
 

    const [isOpenSearch, setIsOpenSearch] = useState(true);
    const toggleSearchCardBody = () => {
        setIsOpenSearch(!isOpenSearch);
    };

    const [isOpenGrid, setIsOpenGrid] = useState(true);
    const toggleGridCardBody = () => {
        setIsOpenGrid(!isOpenGrid);
    };



    const columns: GridColDef[] = [
        { field: 'user_id', headerName: 'User ID', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'mobile', headerName: 'Mobile', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
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
        //console.log(values);
        setIsLoading(false);
    }



    const handleRedirect = () => {
        navigate('/user/new-user'); // Redirect to the desired path
    };
    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <HeaderComponents icon={icon} title={title} />


                    <Card className="card-one mt-2">

                        <CardTitle title="Search" onToggle={toggleSearchCardBody} isOpen={isOpenSearch} />
                        {isOpenSearch && (<CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                                    <div className="flex w-full grid-cols-1 gap-3 mt-2 items-end">
                                        <div className="flex grid-cols-1 gap-3 items-end w-4/6">
                                            <SelectField
                                                control={form.control}
                                                label="Role"
                                                name="role"
                                                options={sample}
                                            />
                                            <SelectField
                                                control={form.control}
                                                label="Type"
                                                name="type"  // Updated to match the label
                                                options={sample}
                                            />
                                            <SelectField
                                                control={form.control}
                                                label="Reporting"
                                                name="reporting"  // Updated to match the label
                                                options={sample}
                                            />
                                            <SelectField
                                                control={form.control}
                                                label="Status"
                                                name="status"  // Updated to match the label
                                                options={sample}
                                            />
                                        </div>
                                        <div className="border rounded-md flex justify-center items-center w-2/6 h-10 mb-2">
                                            <div className="flex items-center gap-4">
                                                <CheckboxField
                                                    control={form.control}
                                                    id="posAccess"  // Updated to a unique ID
                                                    label="Users Access to POS"
                                                    name="usersAccessToPOS"  // Updated to match the label
                                                />
                                                <CheckboxField
                                                    control={form.control}
                                                    id="mobileAccess"  // Updated to a unique ID
                                                    label="User Access to Mobile"
                                                    name="userAccessToMobile"  // Updated to match the label
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-t border-gray-300 " />
                                    <div className="flex justify-end space-x-4  mt-2 pr-4">
                                        <Button type="submit" disabled={isLoading} className='btn-red'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>)
                                                : "Search"}
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
                                <Button type="submit" className='form-btn' onClick={handleRedirect}>
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
                                                checkboxSelection
                                                onRowSelectionModelChange={(newRowSelectionModel) => {
                                                    setRowSelectionModel(newRowSelectionModel);
                                                }}
                                                rowSelectionModel={rowSelectionModel}
                                                getRowId={(row) => row.user_id}
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
        </React.Fragment>
    );
}
