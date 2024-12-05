import theme from "@/components/elements/GridTheme"; // Ensure this path is correct
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridSelectionModel, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const BarcodeGrid = () => {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  // Define the columns based on your structure
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

  // Create row values that align with the column definitions
  const rows = [
    {
      id: 68,
      Default: "Yes",
      supplierId: "SUP607",
      EANNumber: "2437854112008",
      caseSize: "13x437ml",
      RRP: "21.70",
      caseCost: "455.99",
      eachPrice: "10.40",
      outerBarcode: "2892582744921",
    },
    {
      id: 81,
      Default: "No",
      supplierId: "SUP845",
      EANNumber: "1400018119569",
      caseSize: "44x342ml",
      RRP: "13.15",
      caseCost: "409.26",
      eachPrice: "11.26",
      outerBarcode: "1170843091663",
    },
    {
      id: 98,
      Default: "No",
      supplierId: "SUP485",
      EANNumber: "1341018658955",
      caseSize: "47x328ml",
      RRP: "27.97",
      caseCost: "208.42",
      eachPrice: "11.47",
      outerBarcode: "8725926152658",
    },
    {
      id: 92,
      Default: "Yes",
      supplierId: "SUP106",
      EANNumber: "6730623072761",
      caseSize: "44x487ml",
      RRP: "17.04",
      caseCost: "371.09",
      eachPrice: "11.61",
      outerBarcode: "1196859554747",
    },
    {
      id: 34,
      Default: "No",
      supplierId: "SUP616",
      EANNumber: "3482454205668",
      caseSize: "42x372ml",
      RRP: "17.73",
      caseCost: "262.17",
      eachPrice: "19.70",
      outerBarcode: "8359888378431",
    },
    {
      id: 9,
      Default: "No",
      supplierId: "SUP691",
      EANNumber: "2694576564709",
      caseSize: "27x281ml",
      RRP: "27.02",
      caseCost: "330.81",
      eachPrice: "18.45",
      outerBarcode: "4282413928666",
    },
    {
      id: 62,
      Default: "Yes",
      supplierId: "SUP408",
      EANNumber: "2977138403865",
      caseSize: "44x414ml",
      RRP: "15.45",
      caseCost: "487.23",
      eachPrice: "10.14",
      outerBarcode: "8543114615491",
    },
    {
      id: 10,
      Default: "Yes",
      supplierId: "SUP613",
      EANNumber: "1835006287776",
      caseSize: "35x211ml",
      RRP: "14.49",
      caseCost: "474.26",
      eachPrice: "14.65",
      outerBarcode: "2307359463940",
    },
    {
      id: 72,
      Default: "Yes",
      supplierId: "SUP785",
      EANNumber: "5486482832773",
      caseSize: "22x320ml",
      RRP: "23.72",
      caseCost: "488.25",
      eachPrice: "17.66",
      outerBarcode: "0166414927436",
    },
    {
      id: 79,
      Default: "No",
      supplierId: "SUP934",
      EANNumber: "0160442630341",
      caseSize: "41x498ml",
      RRP: "10.01",
      caseCost: "294.23",
      eachPrice: "16.00",
      outerBarcode: "9289683178923",
    },
  ];
  return (
    <div className="w-full mt-3">
      {" "}
      {/* TailwindCSS classes for height and width */}
      <div className="h-full w-full">
        {" "}
        {/* Container for DataGrid */}
        <ThemeProvider theme={theme}>
          <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            checkboxSelection
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

export default BarcodeGrid;
