import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { status } from "@/data/constants";
import { countries, ModeType } from "@/data/enum";
import { toast } from "@/hooks/use-toast";
import { productFromSupplierSchema, storeFormSchema } from "@/lib/utils";
import { addCompany, getCompanyById, updateCompany } from "@/service/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";


const AddProductFromSupplier = ({ onSelectRow, onClose }: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const initialRows = [
    {
      id: 101,
      itemCode: "MZK12345",
      itemName: "Organic Honey 500g",
      translatedName: "Pure Honey",
      description: "100% organic honey collected from certified farms.",
      labelName: "Organic Honey",
      invoiceName: "Honey 500g",
      tillMessage: "Buy 2 Get 10% Off",
      ingredients: "Honey",
      translatedIngredients: "Honig",
      allergicDetails: "May contain pollen",
      translatedAllergicDetails: "Kann Pollen enthalten",
      item_image: "organic-honey.png",
      uom: "each",
      retailUom: "each",
      wastagePercentage: "0.00000",
      itemType: "unit",
      minOrderQty: "10.00000",
      maxOrderQty: "100.00000",
      leadTime: "5",
      reorderLevel: "20.00000",
      reorderLevelType: "fixed",
      safetyStock: "10.00000",
      shelfLife: 365,
      shelfLifeType: "days",
      countryOfOrigin: "UK",
      vatId: 1,
      brandId: "2",
      parentCategory: "1",
      childCategory: "10",
      categoryId: "100",
      item_details: {
        tags: "organic,natural",
        isPluCoded: true,
        isSeasoned: false,
        isStoreUse: false,
        isWeighted: false,
        hasLeadTime: true,
        canBeInPromo: true,
        canSplitSell: false,
        canStockTake: true,
        isOutOfStock: false,
        needPreOrder: false,
        splitSellQty: null,
        hasBoxBarcode: true,
        hasLinkedItem: false,
        isPriceMarked: true,
        minSellingQty: 1,
        isDiscontinued: false,
        isDiscountable: true,
        isStoreVisible: true,
        hasOuterBarcode: false,
        isAgeRestricted: false,
        canOrderInPallet: false,
        hasMinSellingQty: true,
        hasPalletBarcode: false,
        isStoreTransferable: true,
        isConsideredForPurchasePlan: true,
      },
    },
  ];
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const columns: GridColDef[] = [
    { field: "itemCode", headerName: "Item Code", flex: 1, type: "string" },
    { field: "itemName", headerName: "Product Name", flex: 2, type: "string" },
    { field: "translatedName", headerName: "English Name", flex: 2, type: "string" },
    { field: "description", headerName: "Description", flex: 3, type: "string" },
    { field: "retailPrice", headerName: "Retail Price", flex: 1, type: "number" },
    { field: "promotionPrice", headerName: "Promotion Price", flex: 1, type: "number" },
    { field: "caseSize", headerName: "Case Size", flex: 1, type: "number" },
    { field: "uom", headerName: "UOM", flex: 1, type: "string" },
    { field: "vatId", headerName: "VAT ID", flex: 1, type: "number" },
    { field: "brandId", headerName: "Brand", flex: 1, type: "string" },
    { field: "countryOfOrigin", headerName: "Country of Origin", flex: 1, type: "string" },
  ];
  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/store/edit-company/${id.toString()}`);
    //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };
  const onClickAddCompany = () => {
    navigate(`/store/new-company`);
  };

  const handleCancelClick = (id: GridRowId) => () => {};

  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
    itemCode: true,
    itemName: true,
    translatedName: true,
    description: true,
    retailPrice: true,
    promotionPrice: true,
    caseSize: true,
    uom: true,
    vatId: true,
    brandId: true,
    countryOfOrigin: true,
  });

  
  const form = useForm<z.infer<typeof productFromSupplierSchema>>({
    resolver: zodResolver(productFromSupplierSchema),
    defaultValues: {
      eanDeliScale: "",
      description: "",
      supplier: "",
      supplierCode: "",
    },
  });

  const { handleSubmit, formState, reset, setValue } = form;
  useEffect(() => {
    //  const fetch = async () => {
    //      try {
    //          const result = await getCompanyById(id);
    //          setCompanyDetails(result.data.data)
    //          reset(result.data.data)
    //          if (result.status !== 200) {
    //              console.error(result.data);
    //              return;
    //          }
    //      } catch (e) {
    //          console.error(e);
    //      }
    //  };
    //  if (type == ModeType.Edit) {
    //      fetch();
    //  }
  }, []);

  const onSubmit = async (data: z.infer<typeof productFromSupplierSchema>) => {
    onSelectRow(selectedRow);
  };

  const onCloseProductFromSupplier=()=>{
    onClose(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 ">
              <InputField control={form.control} label="EAN (Deli Scale)" name="eanDeliScale" type="text" placeholder="Enter EAN (Deli Scale)" />
              <InputField control={form.control} label="Description" name="description" type="text" placeholder="Enter description" />
              <InputField control={form.control} label="Supplier" name="supplier" type="text" placeholder="Enter supplier" />
              <InputField control={form.control} label="Supplier Code" name="supplierCode" type="text" placeholder="Enter supplier code" />
            </div>
            <div className="flex justify-center mt-3">
              <Button className="btn-cyan text-sm px-4 py-2 mr-3">Search</Button>
              <Button className="btn-cyan text-sm px-4 py-2 ml-3">Reset</Button>
            </div>

            <div className="w-full mt-3">
              <div className="h-full w-full">
                <div>
                  <ThemeProvider theme={theme}>
                    <DataGrid
                      style={{ height: 350, width: "100%" }}
                      rowHeight={35}
                      rows={rows}
                      columns={columns}
                      getRowId={(row) => row.id}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 15, page: 0 },
                        },
                      }}
                      onRowSelectionModelChange={(selection) => {
                        const selectedIDs = new Set(selection);
                        const selectedRows: any = rows.filter((row) => selectedIDs.has(row.id));
                        setSelectedRow(selectedRows);
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
              <Button className="btn-zinc" onClick={onCloseProductFromSupplier}>Cancel</Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </div>
  );
};

export default AddProductFromSupplier;
