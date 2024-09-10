import theme from '@/elements/GridTheme'; // Ensure this path is correct
import { ThemeProvider } from '@mui/material';
import { DataGrid, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

const PromotionGrid = () => {
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});

    // Define the columns for promotion data
    const columns = [
        { field: 'PromotionName', headerName: 'Promotion Name', width: 200 },
        { field: 'Discount', headerName: 'Discount', width: 150 },
        { field: 'StartDate', headerName: 'Start Date', width: 150 },
        { field: 'EndDate', headerName: 'End Date', width: 150 },
    ];

    // Define the rows with promotion data
    const rows = [
        {
            id: 1,
            PromotionName: 'New Year Sale',
            Discount: '20%',
            StartDate: '2024-01-01',
            EndDate: '2024-01-15',
        },
        {
            id: 2,
            PromotionName: 'Spring Clearance',
            Discount: '30%',
            StartDate: '2024-03-01',
            EndDate: '2024-03-31',
        },
        {
            id: 3,
            PromotionName: 'Summer Special',
            Discount: '25%',
            StartDate: '2024-06-01',
            EndDate: '2024-06-30',
        },
        {
            id: 4,
            PromotionName: 'Fall Frenzy',
            Discount: '15%',
            StartDate: '2024-09-01',
            EndDate: '2024-09-30',
        },
        {
            id: 5,
            PromotionName: 'Holiday Deals',
            Discount: '10%',
            StartDate: '2024-12-01',
            EndDate: '2024-12-31',
        },
    ];

    return (
        <div className="w-full mt-3"> {/* TailwindCSS classes for height and width */}
            <div className="h-full w-full"> {/* Container for DataGrid */}
                <ThemeProvider theme={theme}>
                    <DataGrid
                        autoHeight
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        checkboxSelection

                        slotProps={{
                            toolbar: {
                                showQuickFilter: false,
                                printOptions: { disableToolbarButton: true },
                                csvOptions: { disableToolbarButton: true },
                        }}}


                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        
                        columnVisibilityModel={columnVisibility}
                        onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibility(newModel)
                        }
                        getRowId={(row) => row.id}
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
                    
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default PromotionGrid;
