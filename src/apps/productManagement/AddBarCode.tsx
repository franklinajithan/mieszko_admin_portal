import React, { useState } from "react";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { CalendarInput } from "@/components/elements/CalendarInput";
import CheckboxField from "@/components/elements/CheckboxField";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import theme from "@/components/elements/GridTheme";
import { ThemeProvider } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const AddBarCode = ({ form, close }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const columns: GridColDef[] = [
    { field: "mapped", headerName: "Mapped", width: 100, renderCell: () => <input type="checkbox" checked readOnly /> },
    { field: "mainPack", headerName: "Main Pack", width: 120 },
    { field: "subPack", headerName: "Sub Pack", width: 120 },
    { field: "supplierName", headerName: "Supplier Name", width: 200 },
    { field: "supplierItemCode", headerName: "Supplier Item Code", width: 180 },
    { field: "caseSize", headerName: "Case Size", width: 120 },
    { field: "caseCost", headerName: "Case Cost", width: 120 },
    { field: "rrp", headerName: "RRP", width: 120 },
    { field: "outerBarcode", headerName: "OuterBarcode", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: () => <button className="text-blue-600 hover:underline">Edit</button>,
    },
  ];
  const supplierRows = [
    {
      id: 1,
      mapped: true,
      mainPack: "40",
      subPack: "22",
      supplierName: "FRESH VEGETABLES LTD",
      supplierItemCode: "GARL200G",
      caseSize: "40",
      caseCost: "22.00",
      rrp: "0.99",
      outerBarcode: "1234567890123",
    },
    {
      id: 2,
      mapped: false,
      mainPack: "30",
      subPack: "10",
      supplierName: "NATURE PRODUCE CO.",
      supplierItemCode: "NATGARLIC",
      caseSize: "30",
      caseCost: "18.50",
      rrp: "1.15",
      outerBarcode: "9876543210987",
    },
    {
      id: 3,
      mapped: true,
      mainPack: "50",
      subPack: "25",
      supplierName: "ORGANIC FARMERS",
      supplierItemCode: "ORGGARLIC200",
      caseSize: "50",
      caseCost: "25.00",
      rrp: "1.29",
      outerBarcode: "4567891234567",
    },
  ];

  const onCloseProductFromSupplier = () => {
  //  onClose(false);
  };

  return (
    <div>
      <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-3">
        <InputField control={form.control} label="Barcode* (Deli Scale)" name="barcode" placeholder="Press F2 for new barcode" type="text" clipboard />

        <InputField control={form.control} label="Short Description*" name="shortDescription" placeholder="e.g. CZOSNEK PACZKA 200G" type="text" clipboard />

        <InputField control={form.control} label="Item Size*" name="itemSize" placeholder="e.g. 200G" type="text" />

        <InputField control={form.control} label="Till Message" name="tillMessage" placeholder="Enter till message" type="text" />

        <InputField control={form.control} label="Sale Size" name="saleSize" placeholder="200" type="text" />
        <SelectField control={form.control} label="UOM" name="uom" options={[{ label: "Gram (g)", value: "g" }]} />

        <InputField control={form.control} label="Retail*" name="retail" placeholder="e.g. 2.29" type="number" />
        <InputField control={form.control} label="Margin" name="margin" placeholder="76.53 %" type="text" disabled />

        <InputField control={form.control} label="Prom Retail" name="promRetail" placeholder="Optional" type="number" />
        <InputField control={form.control} label="Prom Margin" name="promMargin" placeholder="Auto" type="text" disabled />

        <CalendarInput control={form.control} label="Prom Start Date" name="promStartDate" />
        <CalendarInput control={form.control} label="Prom End Date" name="promEndDate" />
        <CheckboxField control={form.control} label="PLU" name="plu" />
        <CheckboxField control={form.control} label="Price Marked" name="priceMarked" />

        <InputField control={form.control} label="Label Format" name="labelFormat" placeholder="Standard Label 7x3 (Letter)" type="text" />
        <InputField control={form.control} label="Label Qty" name="labelQty" placeholder="1" type="number" />
        <InputField control={form.control} label="Country Of Origin" name="countryOfOrigin" placeholder="e.g. Poland" type="text" />
        <SelectField
          control={form.control}
          label="Status*"
          name="status"
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ]}
        />

        <InputField control={form.control} label="Weight" name="weight" placeholder="Optional" type="text" />
        <InputField control={form.control} label="Ingredient" name="ingredient" placeholder="Optional" type="text" />
        <InputField control={form.control} label="Created Date" name="createdDate" type="text" disabled placeholder="Auto filled" />
      </div>

      <ThemeProvider theme={theme}>
        <div>
          <DataGrid
            autoHeight
            rows={supplierRows}
            columns={columns}
            getRowId={(row) => row.id}
            rowHeight={35}
            // columnVisibilityModel={columnVisibility}
            // onColumnVisibilityModelChange={(newModel) => setColumnVisibility(newModel)}
            // onRowSelectionModelChange={(newSelection) => setRowSelectionModel(newSelection)}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 15, page: 0 },
              },
              filter: {
                filterModel: {
                  items: [],
                  //   quickFilterValues: [searchQuery],
                },
              },
            }}
            pageSizeOptions={[15, 25, 50]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
          />
        </div>
      </ThemeProvider>

      <hr className="border-t border-zinc-300 " />

      <div className="flex justify-end space-x-4  mt-2 pr-4">
        <Button type="submit" disabled={isLoading} className="btn-cyan">
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
            </>
          ) : (
            "Add"
          )}
        </Button>
        <Button className="btn-zinc" onClick={onCloseProductFromSupplier}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddBarCode;
