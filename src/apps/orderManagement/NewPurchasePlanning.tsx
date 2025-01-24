import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";

import CardTitle from "@/components/elements/CardTitle";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import MultiSelectDropdown from "@/components/elements/MultiSelectDropdown";

import { Form } from "@/components/ui/form";
import { status, sample, groceryDepartments, Week } from "../../data/constants";
import CheckboxField from "@/components/elements/CheckboxField";
import { Card, Nav } from "react-bootstrap";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newPurchasePlanningFormSchema } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FiPackage } from "react-icons/fi";
import { ThemeProvider } from "@mui/material";
import theme from "@/components/elements/GridTheme";
import { DataGrid, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";

const NewPurchasePlanning = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";

  const [skin, setSkin] = useState(currentSkin);
  const [isLoading, setIsLoading] = useState(false);

  const [deliveryType, setDeliveryType] = useState("fastest");
  const [selectedOption, setSelectedOption] = useState("Select");
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
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
  const form = useForm<z.infer<typeof newPurchasePlanningFormSchema>>({
    resolver: zodResolver(newPurchasePlanningFormSchema),
    defaultValues: {
      documentNo: "",
      storeNo: "",
      WHLocation: "",
      planType: "",
      supplier: "",
      addOns: "",
      leadTimes: "",
      expectedDeliveryDate: "",
      brand: "",
      status: "",
      Comments: "",
      period1StartDate: "",
      period1EndDate: "",
      period2StartDate: "",
      period2EndDate: "",
      currentStock: "",
      scheduleDay: "",
      time: "",
      email: "",
      currentStock1: false,
      rtcSales: false,
      wastage: false,
      promoSales: false,
      itemsBasket: false,
      hhuItems: false,
      considerOrder: false,
      considerSales: false,
      selfLife: false,
      passToAnotherStore: "",
      filterType: "",
      specificDivisionPlanning: "",
      considerAgentPrice: "",
    },
  });

  function onSubmit(values: z.infer<typeof newPurchasePlanningFormSchema>) {
    setIsLoading(true);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title={"Search"} />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <InputField
                      control={form.control}
                      label="Document No"
                      name="documentNo"
                      type="text"
                      placeholder="Enter your document no"
                      disabled={true}
                    />
                    <InputField
                      control={form.control}
                      label="Store No"
                      name="storeNo"
                      type="text"
                      placeholder="Enter your Store"
                      disabled={true}
                    />
                    <InputField
                      control={form.control}
                      label="Related WH Location"
                      name="WHLocation"
                      type="text"
                      placeholder="Enter related warehouse location"
                      disabled={true}
                    />
                    <SelectField
                      control={form.control}
                      label="Supplier"
                      name="supplier"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Plan Type"
                      name="planType"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Add Ons"
                      name="addOns"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Lead Times"
                      name="leadTimes"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Pass to Another Store"
                      name="passToAnotherStore"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Filter Type"
                      name="filterType"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Specific Division Planning"
                      name="specificDivisionPlanning"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Consider Agent Price"
                      name="considerAgentPrice"
                      options={sample}
                    />
                    <InputField
                      control={form.control}
                      label="Expected Delivery Date"
                      name="expectedDeliveryDate"
                      type="text"
                      placeholder="Enter your expected delivery date"
                    />
                    <SelectField
                      control={form.control}
                      label="Brand"
                      name="brand"
                      options={sample}
                    />
                    <SelectField
                      control={form.control}
                      label="Status"
                      name="status"
                      options={status}
                    />
                    <InputField
                      control={form.control}
                      label="Comments"
                      name="Comments"
                      type="text"
                      placeholder="Enter your comments"
                    />
                    {/* <MultiSelectDropdown label="Department" options={groceryDepartments} /> */}
                  </div>

                  <hr className="border-t border-zinc-300 " />

                  <div className="flex gap-4">
                    <div className="grid grid-cols-2 gap-4 w-1/3">
                      <InputField
                        control={form.control}
                        label="Period 1 Start Date"
                        name="period1StartDate"
                        type="text"
                        placeholder="Enter period 1 start date"
                      />
                      <InputField
                        control={form.control}
                        label="Period 1 End Date"
                        name="period1EndDate"
                        type="text"
                        placeholder="Enter period 1 end date"
                      />
                      <InputField
                        control={form.control}
                        label="Period 2 Start Date"
                        name="period2StartDate"
                        type="text"
                        placeholder="Enter period 2 start date"
                      />
                      <InputField
                        control={form.control}
                        label="Period 2 End Date"
                        name="period2EndDate"
                        type="text"
                        placeholder="Enter period 2 end date"
                      />
                    </div>
                    <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
                    <div className="grid grid-cols-4 gap-4 w-2/3 items-end">
                      <CheckboxField
                        control={form.control}
                        id="currentStock"
                        label="Current Stock"
                        name="currentStock1"
                      />

                      <SelectField
                        control={form.control}
                        label="Schedule Day"
                        name="scheduleDay"
                        options={Week}
                      />
                      <InputField
                        control={form.control}
                        label="Time"
                        name="time"
                        type="text"
                        placeholder="Enter the time"
                      />
                      <InputField
                        control={form.control}
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Enter the email"
                      />
                      <CheckboxField
                        control={form.control}
                        id="rtcSales"
                        label="RTC Sales"
                        name="rtcSales"
                      />
                      <CheckboxField
                        control={form.control}
                        id="wastage"
                        label="Wastage"
                        name="wastage"
                      />
                      <CheckboxField
                        control={form.control}
                        id="promoSales"
                        label="Promo Items Sales"
                        name="promoSales"
                      />
                      <CheckboxField
                        control={form.control}
                        id="itemsBasket"
                        label="Items from Basket"
                        name="itemsBasket"
                      />
                      <CheckboxField
                        control={form.control}
                        id="hhuItems"
                        label="HHU Items"
                        name="hhuItems"
                      />
                      <CheckboxField
                        control={form.control}
                        id="considerOrder"
                        label="Consider On Order"
                        name="considerOrder"
                      />
                      <CheckboxField
                        control={form.control}
                        id="considerSales"
                        label="Consider Sales"
                        name="considerSales"
                      />
                      <CheckboxField
                        control={form.control}
                        id="selfLife"
                        label="Self Life"
                        name="selfLife"
                      />
                    </div>
                  </div>
                  <hr className="border-t border-zinc-300 " />
                  <div className="flex justify-end space-x-4  mt-2 pr-4">
                    <button className="btn-zinc">Cancel</button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="btn-cyan"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp;
                          Loading...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Form>
          </Card>

          <Card className="card-one mt-2">
            <CardTitle title="Purchase Plan List" />
            <CardContent>
              <ThemeProvider theme={theme}>
                <DataGrid
                 // autoHeight
                 // disableColumnFilter
                  //disableColumnSelector
                //  disableDensitySelector
                  checkboxSelection
                  rowSelectionModel={rowSelectionModel}
                  onRowSelectionModelChange={(newRowSelectionModel: any) => {
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
            </CardContent>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPurchasePlanning;
