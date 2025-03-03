import CardTitle from '@/components/elements/CardTitle'
import HeaderComponents from '@/components/elements/HeaderSection'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import StockTakeForm from './StockTakeForm'
import { IconType } from 'react-icons'
import { useParams } from 'react-router-dom'
import { ModeType } from '@/data/enum'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowMode, GridRowModes, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import theme from '@/components/elements/GridTheme'
import { DeleteIcon, EditIcon, SaveIcon } from 'lucide-react'
import CancelIcon from '@mui/icons-material/Close';

interface StockTakeRow {
    id: number;
    itemId: string;
    itemName: string;
    category: string;
    bookStock: number;
    supplierCost: number;
    retailCost: number;
}

interface StockTakeSearchResultsProps {
    searchData: any[];  // Update this type based on your actual search data structure
    setSearchData: (data: any[]) => void;
}

const StockTakeSearchResults = ({ searchData, setSearchData }: StockTakeSearchResultsProps) => {
    const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(false);
    const toggleBasicInfo = () => setIsOpenBasicInfo(!isOpenBasicInfo);
    const { id } = useParams();

    const [isOpenGrid, setIsOpenGrid] = useState(true);
    const [rows, setRows] = useState<StockTakeRow[]>([]);


    const toggleCardBody = () => {
        setIsOpenGrid(!isOpenGrid);
    };

    let type = id ? ModeType.Edit : ModeType.Add;
    const [rowModesModel, setRowModesModel] = React.useState<GridRowMode>({});

    // const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    //     companyId: false,
    //     companyCode: true,
    //     companyName: true,
    //     ownerName: true,
    //     email: true,
    //     phone: true,
    //     address: true,
    //     city: true,
    //     state: true,
    //     postcode: true,
    //     country: true,
    //     status: false,
    //     taxNo: true,
    //     createdAt: false,
    //     createdBy: false,
    //     updatedAt: false,
    //     updatedBy: false,
    //     website: false,
    //     logo: false,
    // });

    const handleEditClick = (id: GridRowId) => () => {

        //navigate(`/store/edit-company/${id.toString()}`);
        //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        // setRows(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {

    };


    const columns: GridColDef[] = [
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 100,
        //     cellClassName: 'actions',
        //     getActions: ({ id }) => {
        //         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        //         if (isInEditMode) {
        //             return [
        //                 <GridActionsCellItem
        //                     icon={<SaveIcon />}
        //                     label="Save"
        //                     sx={{
        //                         color: 'primary.main',
        //                     }}
        //                     onClick={handleSaveClick(id)}
        //                 />,
        //                 <GridActionsCellItem
        //                     icon={<CancelIcon />}
        //                     label="Cancel"
        //                     className="textPrimary"
        //                     onClick={handleCancelClick(id)}
        //                     color="inherit"
        //                 />,
        //             ];
        //         }

        //         return [
        //             <GridActionsCellItem
        //                 icon={<EditIcon />}
        //                 label="Edit"
        //                 className="textPrimary"
        //                 onClick={handleEditClick(id)}
        //                 color="inherit"
        //             />,
        //             <GridActionsCellItem
        //                 icon={<DeleteIcon />}
        //                 label="Delete"
        //                 onClick={handleDeleteClick(id)}
        //                 color="inherit"
        //             />,
        //         ];
        //     }
        // },
        { field: 'itemId', headerName: 'Item ID', flex: 1 },
        { field: 'itemName', headerName: 'Item Name', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'bookStock', headerName: 'Book Stock', flex: 1 },
        { field: 'supplierCost', headerName: 'Supplier Cost', flex: 1 },
        { field: 'retailCost', headerName: 'Retail Cost', flex: 1 },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer className='flex flex-row justify-between w-full'>
                <Button className='inline-flex items-center justify-end whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 btn-cyan '>Add Records</Button>
                <GridToolbarQuickFilter />
            </GridToolbarContainer>
        );
    }

    useEffect(() => {
        setRows(() => [
            {
                id: 1,
                itemId: "011",
                itemName: "test",
                category: "dairy",
                bookStock: 10,
                supplierCost: 1.99,
                retailCost: 2.99
            },
            {
                id: 2,
                itemId: "012",
                itemName: "test",
                category: "dairy",
                bookStock: 10,
                supplierCost: 1.99,
                retailCost: 2.99
            }
        ]);
    }, []);

    return (
        searchData != null && searchData.length > 0 && (
            <div>
                <div className="w-full mt-3">
                    <div className="h-full w-full">
                        <div>
                            <ThemeProvider theme={theme}>
                                <DataGrid
                                    checkboxSelection
                                    getRowId={(row) => row.id}
                                    style={{ height: 650, width: '100%' }}
                                    rowHeight={35}
                                    rows={rows}
                                    columns={columns}

                                    initialState={{
                                        pagination: {
                                            paginationModel: { pageSize: 15, page: 0 },
                                        },
                                    }}
                                    pageSizeOptions={[15, 25, 50]}
                                    slots={{ toolbar: CustomToolbar }}
                                    slotProps={{
                                        toolbar: {
                                            printOptions: {
                                                disableToolbarButton: true
                                            },
                                            csvOptions: {
                                                disableToolbarButton: true
                                            },
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
        )
    )
}

export default StockTakeSearchResults
