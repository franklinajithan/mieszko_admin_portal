import CardTitle from '@/components/elements/CardTitle'
import HeaderComponents from '@/components/elements/HeaderSection'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import StockTakeForm from './StockTakeForm'
import { IconType } from 'react-icons'
import { useParams } from 'react-router-dom'
import { ModeType } from '@/data/enum'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowMode, GridRowModes, GridToolbar } from '@mui/x-data-grid'
import theme from '@/components/elements/GridTheme'
import { DeleteIcon, EditIcon, SaveIcon } from 'lucide-react'
import CancelIcon from '@mui/icons-material/Close';
import StockTakeSearchResults from './StockTakeSearchResults'


interface AddEditStockTakeProps {
    title: string;
    icon: IconType;
}

const AddEditStockTake = ({ title, icon }: AddEditStockTakeProps) => {

    const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(false);
    const toggleBasicInfo = () => setIsOpenBasicInfo(!isOpenBasicInfo);
    const { id } = useParams();

    const [isOpenGrid, setIsOpenGrid] = useState(false);
    const [rows, setRows] = useState([]);


    const toggleCardBody = () => {
        setIsOpenGrid(!isOpenGrid);
    };

    let type = id ? ModeType.Edit : ModeType.Add;
    const [rowModesModel, setRowModesModel] = React.useState<GridRowMode>({});

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
      
        { field: 'itemId', headerName: 'Item ID', flex: 1 },
        { field: 'itemName', headerName: 'Item Name', flex: 2 },
        { field: 'itemSize', headerName: 'Item Size', flex: 1 },
        { field: 'caseSize', headerName: 'Case Size', flex: 1 },
        { field: 'supplierCost', headerName: 'Supplier Cost', flex: 1 },
        { field: 'retailCost', headerName: 'Retail Cost', flex: 1 },
        { field: 'bookStock', headerName: 'Book Stock', flex: 1 },
        { field: 'physicalStock', headerName: 'Physical Stock', flex: 1 },
        { field: 'stockDifference', headerName: 'Stock Difference', flex: 1 },
        { field: 'retailDiscrepancy', headerName: 'Retail Discrepancy', flex: 1 },
        { field: 'costDiscrepancy', headerName: 'Cost Discrepancy', flex: 1 },
        { field: 'closingStock', headerName: 'Closing Stock', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'createdBy', headerName: 'Created By', flex: 1 },
        { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
        { field: 'updatedBy', headerName: 'Updated By', flex: 1 },
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
    ];

    const [searchData, setSearchData] = useState(
        [
            {
                itemCode: "123"
            }
        ]
    );

    return (
        <>
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Basic Information" onToggle={toggleBasicInfo} isOpen={isOpenBasicInfo} />
                        <CardContent>
                            <StockTakeForm type={type} id={id} />
                            <StockTakeSearchResults searchData={searchData} setSearchData={setSearchData} />
                        </CardContent>

                    </Card>
                    <Card className="card-one mt-2">

                        <CardTitle title="Company List" onToggle={toggleCardBody} isOpen={isOpenGrid} />


                        {isOpenGrid && (
                            <CardContent>


                                <div>
                                    <div className="flex justify-start space-x-4  mt-2 pr-4">
                                        {/* <Button type="submit" className='btn-cyan' onClick={onClickAddCompany}>
                                        New Company
                                    </Button> */}
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
        </>
    )
}

export default AddEditStockTake
