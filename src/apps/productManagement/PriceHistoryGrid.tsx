import React from "react";
import { DataGrid, GridToolbarQuickFilter, GridToolbarExport } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

import theme from "../../components/elements/GridTheme";
import { Button, Card, CardContent, Input, Tooltip } from "@mui/material";

const PriceHistoryGrid = ({ rows }:any) => {
  const columns = [
    { field: "date", headerName: "Date", width: 140, type: "date", valueGetter: (params) => new Date(params.value) },
    { field: "shortDescription", headerName: "Description", flex: 1 },
    { field: "retail", headerName: "Retail", width: 100, type: "number" },
    // { field: "retailForGroupA", headerName: "Retail - Group A", width: 130 },
    // { field: "retailForGroupB", headerName: "Retail - Group B", width: 130 },
    { field: "promRetail", headerName: "Promo Retail", width: 120, type: "number" },
    { field: "promoStartDate", headerName: "Promo Start", width: 130, type: "date", valueGetter: (params) => new Date(params.value) },
    { field: "promoEndDate", headerName: "Promo End", width: 130, type: "date", valueGetter: (params) => new Date(params.value) },
    { field: "cost", headerName: "Cost", width: 100, type: "number" },
    { field: "VAT", headerName: "VAT %", width: 90, type: "number" },
    {
      field: "margin",
      headerName: "Margin",
      width: 100,
      valueGetter: (params:any) => {
        const { retail, cost } = params.row;
        return retail && cost ? `${(((retail - cost) / cost) * 100).toFixed(1)}%` : "-";
      },
      renderHeader: () => (
        <Tooltip title="((Retail - Cost) / Cost) × 100">
          <span>Margin (%)</span>
        </Tooltip>
      ),
    },
    // { field: "availableStock", headerName: "Stock Qty", width: 100 },
    // { field: "stockLocation", headerName: "Stock Location", width: 140 },
    // { field: "salesAtThisPrice", headerName: "Sales Qty", width: 110 },
    // { field: "requestedPrice", headerName: "Requested Price", width: 130 },
    // { field: "status", headerName: "Status", width: 110 },
    // { field: "priceNotes", headerName: "Notes", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: () => (
        <button >
          View History
        </button>
      ),
    },
    // { field: "modifiedBy", headerName: "Modified By", width: 130 },
    // { field: "modifiedAt", headerName: "Modified At", type: "dateTime", width: 150, valueGetter: (params) => new Date(params.value) }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Tabs defaultValue="price-history" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="price-history">Price History</TabsTrigger>
          <TabsTrigger value="supplier-info">Supplier Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="price-history">
          <Card>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <div className="list-disc pl-5">
                    <div>
                      <span className="inline-block w-3 h-3 mr-2 align-middle bg-green-100 border border-green-400"></span>Promo &lt; Retail
                    </div>
                    <div>
                      <span className="inline-block w-3 h-3 mr-2 align-middle bg-yellow-100 border border-yellow-400"></span>Cost &gt; Retail
                    </div>
                    <div>
                      <span className="inline-block w-3 h-3 mr-2 align-middle bg-red-100 border border-red-400"></span>Margin &lt; 5%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button >Import CSV</button>
                  <button  >Export CSV</button>
                </div>
              </div>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={35}
                pageSizeOptions={[10, 25, 50]}
                slots={{
                  toolbar: () => (
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                      <div className="flex gap-2">
                        <GridToolbarQuickFilter />
                        <GridToolbarExport csvOptions={{ fileName: "Price_History" }} />
                      </div>
                    </div>
                  ),
                }}
                getRowClassName={(params) => {
                  const { promRetail, retail, cost } = params.row;
                  if (promRetail && promRetail < retail) return "row-promo";
                  if (cost > retail) return "row-warning";
                  if ((retail - cost) / cost < 0.05) return "row-margin-low";
                  return "";
                }}
                sx={{
                  "& .row-promo": { backgroundColor: "#d1fae5 !important" },
                  "& .row-warning": { backgroundColor: "#fef3c7 !important" },
                  "& .row-margin-low": { backgroundColor: "#fee2e2 !important" },
                }}
                processRowUpdate={(newRow) => ({
                  ...newRow,
                  modifiedBy: "Ajithan",
                  modifiedAt: new Date().toISOString(),
                })}
                onProcessRowUpdateError={(error) => console.error("Update error:", error)}
                disableRowSelectionOnClick
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier-info">
          <Card>
            <CardContent className="space-y-4">
              <Input placeholder="Filter by supplier or brand" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Supplier Name" />
                <Input placeholder="Stock Location" />
                <Input placeholder="Available Stock" />
                <Input placeholder="Cost Source (Manual, Feed...)" />
              </div>
              <button >Link Supplier</button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="VAT / GST %" />
                <Input placeholder="Unit of Measure (kg, piece)" />
              </div>
              <button >Save Settings</button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
};

export default PriceHistoryGrid;
