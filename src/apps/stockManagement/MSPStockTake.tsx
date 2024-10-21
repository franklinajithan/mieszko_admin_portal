import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import { MSPModule } from "../../data/constants";
import CardTitle from "@/components/elements/CardTitle";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from 'lucide-react';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { getMSPStockTake, getProductId } from "@/service/stock.service"; // Assuming this service is available
import { useNavigate } from "react-router-dom";
import { mspStockFormSchema } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { CalendarInput } from "@/components/elements/CalendarInput";
import { formatDate } from "date-fns";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";

const MSPStockTake = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [stockTake, setStockTake] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [wastage, setWastage] = useState(0);
  const [salesBeforeRefund, setSalesBeforeRefund] = useState(0);
  const [refund, setRefund] = useState(0);
  const [salesAfterRefund, setSalesAfterRefund] = useState(0);
  const [total, setTotal] = useState(0);
  const [sales, setSales] = useState(0);
  const [systemBookStock, setSystemBookStock] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  const [rows, setRows] = useState([]);
  const [MSPdata, setMSPdata] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    title: true,
    sales: true,
    addedOn: true,
    submittedOn: true,
    submittedBy: true,
    retail: true,
    cost: true

  });

  const toggleCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  useEffect(() => {
    setSalesAfterRefund(salesBeforeRefund - refund);
  }, [salesBeforeRefund, refund]);

  // Calculate the total whenever stockTake, delivery, salesAfterRefund, or wastage changes
  useEffect(() => {
    
    console.log('stockTake '+ stockTake);
    let total = (delivery + stockTake) - (salesAfterRefund + wastage)
    salesForm.reset({ total: total });
    console.log('total '+total);
   // setTotal(total);
  }, [stockTake, delivery, salesAfterRefund, wastage]);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 3 },
    { field: 'moduleData', headerName: 'Module Data', flex: 1 },
    { field: 'sales', headerName: 'Sales', flex: 1 },
    { field: 'addedOn', headerName: 'Added On', flex: 1 },
    { field: 'submittedOn', headerName: 'Submitted On', flex: 1 },
    { field: 'submittedBy', headerName: 'Submitted By', flex: 1 },
    { field: 'retail', headerName: 'Retail Price', flex: 1 },
    { field: 'cost', headerName: 'Cost', flex: 1 }
  ];

  // First Form - Search Form
  const searchForm = useForm<z.infer<typeof mspStockFormSchema>>({
    resolver: zodResolver(mspStockFormSchema),
    defaultValues: {
      itemCode: "M0003490",
      ip: "195.99.114.73:1500",
      module: null,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const { control: searchControl, handleSubmit: handleSearchSubmit, formState: { errors: searchErrors } } = searchForm;

  // Second Form - Sales Data Form
  const salesForm = useForm({
    defaultValues: {
      delivery: 0,
      salesBeforeRefund: 0,
      refundedQty: 0,
      sales: 0,
      stockTake: 0,
      wastage: 0,
      total: 0,
      systemBookStock: 0,
    },
  });

  const { control: salesControl, handleSubmit: handleSalesSubmit, formState: { errors: salesErrors } } = salesForm;

  const onSearchSubmit = async (data: any) => {
    setIsLoading(true);
    try {

      const res = await getProductId({ itemCode: data.itemCode, ip: data.ip });

      if (res.status == 200) {
        let dataItem = {
          ...data,
          productId: res.data.data.productId,
          productStock: res.data.data.productStock.toString(),
          startDate: data.startDate ? formatDate(new Date(data.startDate), 'yyyy-MM-dd') : null,
          endDate: data.endDate ? formatDate(new Date(data.endDate), 'yyyy-MM-dd') : null
        };
        let stockUrl = `http://${data.ip}/api/Product/ProductAuditTrailData?ProdID=${res.data.data.productId}&SearchStartDate=${dataItem.startDate}&SearchEndDate=${dataItem.endDate}`;
        console.log(stockUrl);
        const result = await getMSPStockTake(dataItem);
        setMSPdata(result.data.data);
        setRows(result.data.data.salesData);
        salesForm.reset(result.data.data.total);
        setDelivery(result.data.data.total.delivery);
        setSalesBeforeRefund(result.data.data.total.salesBeforeRefund);
        setSales(result.data.data.total.sales);
        setStockTake(result.data.data.total.stockTake);
        setWastage(result.data.data.total.wastage);
        setTotal(result.data.data.total.total);
   
      } else {
 
      }


    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const onSalesSubmit = (data: any) => {
    console.log("Sales Data Submitted:", data);
    // Handle sales data submission
  };

  const handleChange = (event:any) => {
    console.log(event); // Check if the event object is defined
    if (event && event.target) {
      setStockTake(event.target.value);
    } 
  };

  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />
          <Card className="card-one mt-2">
            <CardTitle title="Search" />
            <Form {...searchForm}>
              <form onSubmit={handleSearchSubmit(onSearchSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <InputField control={searchControl} label="Item Code" name="itemCode" type="text" />
                    <InputField control={searchControl} label="IP" name="ip" type="text" />
                    <SelectField control={searchControl} label="Module" name="module" options={MSPModule} />
                    <CalendarInput control={searchControl} label="Start Date" name="startDate" />
                    <CalendarInput control={searchControl} label="End Date" name="endDate" />
                  </div>

                  <div className="flex justify-end space-x-4 mt-2 pr-4">
                    <Button type="submit" disabled={isLoading} className="btn-cyan">
                      {isLoading ? (
                        <><Loader2 size={20} className="animate-spin" /> &nbsp; Loading...</>
                      ) : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Form>
          </Card>







          {/* Sales Data Form */}
          <Card className="card-one mt-2">
            <CardTitle title="Stock Take List" onToggle={toggleCardBody} isOpen={isOpenGrid} />
            <Form {...salesForm}>
              <form onSubmit={handleSalesSubmit(onSalesSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <InputField control={salesControl} label="Stock Take" type="number" name="stockTake" value={stockTake} onChange={handleChange} />
                    <InputField control={salesControl} label="Stock Take"  type="number"  name="stockTake"  value={stockTake}  onChange={(event:any) => console.log(event.target.value)} />
                    <InputField control={salesControl} label="Delivery" type="number" name="delivery" value={delivery} onChange={(value) => setDelivery(Number(value))} />
                    <InputField control={salesControl} label="Sales" type="number" name="sales" value={sales} onChange={(value) => setSales(Number(value))} />
                    <InputField control={salesControl} label="Wastage" type="number" name="wastage" value={wastage} onChange={(value) => setWastage(Number(value))} />
                    <InputField control={salesControl} label="Total" type="number" name="total" value={total} />
                    <InputField control={salesControl} label="System Book Stock" type="number" name="systemBookStock" value={systemBookStock} disabled />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                    <InputField control={salesControl} label="Sales Before Refund" type="number" name="salesBeforeRefund" value={salesBeforeRefund} onChange={(value) => setSalesBeforeRefund(Number(value))} />
                    <InputField control={salesControl} label="Refunded Quantity" type="number" name="refundedQty" />
                  </div>
                </CardContent>
              </form>
            </Form>



            {isOpenGrid && (
              <CardContent>
                <div className="w-full mt-3">
                  <div className="h-full w-full">
                    {isLoading ? (
                      <RotatingSquaresLoader />
                    ) : (
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
                          getRowId={(row) => row.index}
                          rowHeight={35}
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: { pageSize: 100, page: 0 },
                            },
                          }}
                          pageSizeOptions={[15, 25, 50, 200]}

                          slots={{ toolbar: GridToolbar }}
                          slotProps={{
                            toolbar: {
                              showQuickFilter: true,
                            },
                          }
                          }
                        />
                      </ThemeProvider>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MSPStockTake;
