import theme from "@/components/elements/GridTheme"; // Ensure this path is correct
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridSelectionModel, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const SupplierGrid = () => {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = [
    { field: "Default", headerName: "Default", width: 90 },
    { field: "supplierId", headerName: "Supplier ID", width: 150 },
    { field: "EANNumber", headerName: "EAN Number", width: 150 },
    { field: "caseSize", headerName: "Case Size", width: 150 },
    { field: "RRP", headerName: "RRP", width: 150 },
    { field: "caseCost", headerName: "Case Cost", width: 150 },
    { field: "eachPrice", headerName: "Each Price", width: 150 },
    { field: "outerBarcode", headerName: "Outer Barcode", width: 150 },
  ];

  const rows = [
    {
      id: 68,
      Default: "Yes",
      supplierId: "SUP123",
      EANNumber: "9876543210987",
      caseSize: "20x500ml",
      RRP: "25.50",
      caseCost: "510.00",
      eachPrice: "12.75",
      outerBarcode: "1234567890123",
    },
    {
      id: 81,
      Default: "No",
      supplierId: "SUP234",
      EANNumber: "8765432109876",
      caseSize: "30x400ml",
      RRP: "18.20",
      caseCost: "435.00",
      eachPrice: "14.00",
      outerBarcode: "2345678901234",
    },
    {
      id: 98,
      Default: "No",
      supplierId: "SUP345",
      EANNumber: "7654321098765",
      caseSize: "50x350ml",
      RRP: "22.00",
      caseCost: "330.00",
      eachPrice: "16.00",
      outerBarcode: "3456789012345",
    },
    {
      id: 92,
      Default: "Yes",
      supplierId: "SUP456",
      EANNumber: "6543210987654",
      caseSize: "35x420ml",
      RRP: "19.30",
      caseCost: "470.00",
      eachPrice: "13.50",
      outerBarcode: "4567890123456",
    },
    {
      id: 34,
      Default: "No",
      supplierId: "SUP567",
      EANNumber: "5432109876543",
      caseSize: "25x500ml",
      RRP: "21.60",
      caseCost: "270.00",
      eachPrice: "10.80",
      outerBarcode: "5678901234567",
    },
    {
      id: 9,
      Default: "No",
      supplierId: "SUP678",
      EANNumber: "4321098765432",
      caseSize: "40x300ml",
      RRP: "29.00",
      caseCost: "320.00",
      eachPrice: "18.00",
      outerBarcode: "6789012345678",
    },
    {
      id: 62,
      Default: "Yes",
      supplierId: "SUP789",
      EANNumber: "3210987654321",
      caseSize: "28x450ml",
      RRP: "16.00",
      caseCost: "448.00",
      eachPrice: "12.00",
      outerBarcode: "7890123456789",
    },
    {
      id: 10,
      Default: "Yes",
      supplierId: "SUP890",
      EANNumber: "2109876543210",
      caseSize: "32x220ml",
      RRP: "15.75",
      caseCost: "480.00",
      eachPrice: "15.00",
      outerBarcode: "8901234567890",
    },
    {
      id: 72,
      Default: "Yes",
      supplierId: "SUP901",
      EANNumber: "1098765432109",
      caseSize: "18x350ml",
      RRP: "22.50",
      caseCost: "405.00",
      eachPrice: "18.00",
      outerBarcode: "9012345678901",
    },
    {
      id: 79,
      Default: "No",
      supplierId: "SUP012",
      EANNumber: "0987654321098",
      caseSize: "45x500ml",
      RRP: "12.80",
      caseCost: "350.00",
      eachPrice: "15.50",
      outerBarcode: "0123456789012",
    },
  ];

  return (
    <div className="w-full mt-3">
      <div className="h-full w-full">
        <ThemeProvider theme={theme}>
          <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            checkboxSelection
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={setRowSelectionModel}
            columnVisibilityModel={columnVisibility}
            onColumnVisibilityModelChange={setColumnVisibility}
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
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SupplierGrid;
