import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import AddProductFromSupplier from "./AddProductFromSupplier";
import CheckboxField from "@/components/elements/CheckboxField";
import PriceHistoryGrid from "./PriceHistoryGrid";
import ImageUploader from "@/components/elements/ImageUploader";
import InputField from "@/components/elements/InputField";
import IOSSwitch from "@/components/elements/toggleTheme";
import LabelField from "@/components/elements/LabelField";
import MenuItem from "@/components/elements/MenuItem";
import RadioField from "@/components/elements/RadioField";
import SelectField from "@/components/elements/SelectField";
import { imageUrl } from "@/_config";
import { addProduct, getItemDetail, uploadProductImage } from "@/service/product.service";
import { getBrand } from "@/service/brand.service";
import { getCategory } from "@/service/category.service";
import { productFormSchema } from "@/lib/utils";
import { ModeType, countries, reorderLevelType } from "@/data/enum";
import { ProductDetails } from "@/interface/productInterfaces";
import { CalendarInput } from "@/components/elements/CalendarInput";
import { ThemeProvider, TextField, Box } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import theme from "@/components/elements/GridTheme";
import AddBarCode from "./AddBarCode";
// Define TypeScript interfaces
interface ProductFormProps {
  id?: number;
  type: ModeType;
}

interface Category {
  value: string;
  label: string;
  level: number;
  children: Category[];
}

interface Brand {
  value: string;
  label: string;
}

interface Option {
  value: string;
  label: string;
}

// Define the form data type from the Zod schema
type ProductFormData = z.infer<typeof productFormSchema>;

const ProductForm: React.FC<ProductFormProps> = ({ id, type }) => {
  const [activeItem, setActiveItem] = useState<"ProductDetails" | "Barcodes" | "Pricing" | "SupplierDetails" | "StockDetails" | "Promotions" | "StockSalesAnalytics" | "AuditTrail" | "OtherConfigurations">("ProductDetails");
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [grandchildCategories, setGrandChildCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [showPromotionButton, setShowPromotionButton] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openBulkUpload, setOpenBulkUpload] = useState<boolean>(false);

  const [openBarcode, setOpenBarcode] = useState<boolean>(false);
  const [supplierItemData, setSupplierItemData] = useState<any>([]);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: 0,
      itemCode: "",
      itemName: "",
      translatedName: "",
      description: "",
      labelName: "",
      invoiceName: "",
      tillMessage: "",
      ingredients: "",
      translatedIngredients: "",
      allergicDetails: "",
      translatedAllergicDetails: "",
      item_image: "",
      uom: "",
      retailUom: "",
      wastagePercentage: "0.00000",
      itemType: "",
      minOrderQty: "0.00000",
      maxOrderQty: "0.00000",
      leadTime: "0",
      reorderLevel: "0.00000",
      reorderLevelType: "",
      safetyStock: "0.00000",
      shelfLife: 0,
      shelfLifeType: "",
      countryOfOrigin: "",
      vatId: null,
      brandId: null,
      parentCategory: "",
      childCategory: "",
      categoryId: "",
      item_details: {
        tags: null,
        isPluCoded: false,
        isSeasoned: false,
        isStoreUse: false,
        isWeighted: false,
        hasLeadTime: false,
        canBeInPromo: false,
        canSplitSell: false,
        canStockTake: false,
        isOutOfStock: false,
        needPreOrder: false,
        splitSellQty: null,
        hasBoxBarcode: false,
        hasLinkedItem: false,
        isPriceMarked: false,
        minSellingQty: null,
        isDiscontinued: false,
        isDiscountable: false,
        isStoreVisible: false,
        hasOuterBarcode: false,
        isAgeRestricted: false,
        canOrderInPallet: false,
        hasMinSellingQty: false,
        hasPalletBarcode: false,
        isStoreTransferable: false,
        isConsideredForPurchasePlan: false,
      },
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await getCategory();
        if (result.status === 200) {
          setParentCategories(
            result.data.data.map((category: any) => ({
              value: category.category_id.toString(),
              label: category.category_name,
              level: category.level,
              children: category.children,
            }))
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchBrand = async () => {
      try {
        const result = await getBrand();
        if (result.status === 200) {
          setBrandList(
            result.data.data.map((brand: any) => ({
              value: brand.id.toString(),
              label: brand.brandName,
            }))
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const result = await getItemDetail(id);
        if (result.status === 200) {
          setProductDetails(result.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchCategory();
    fetchBrand();
    if (type === ModeType.Edit && id) {
      fetchProductDetails();
    }
  }, [id, type]);

  useEffect(() => {
    if (productDetails) {
      setImagePreview(`${imageUrl}items/${productDetails.item_image}`);
      reset(productDetails);
    }
  }, [productDetails, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      const result = await addProduct(data);
      if (result.status === 201) {
        if (selectedImageFile) {
          await uploadImage(result.data.data);
        }
        toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
      } else {
        toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
      }
    } catch (e: any) {
      toast({ variant: "destructive", title: e.response?.status || "Error", description: e.response?.data?.message || "An error occurred", duration: 800 });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("imageFor", "items");
      formData.append("id", id || "");
      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      }
      const result = await uploadProductImage(formData);
      if (result.status !== 200) {
        console.error(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuItemClick = (item: "ProductDetails" | "Barcodes" | "Pricing" | "SupplierDetails" | "StockDetails" | "Promotions" | "StockSalesAnalytics" | "AuditTrail" | "OtherConfigurations") => {
    setActiveItem(item);
  };

  const toggleSwitchPromotion = () => {
    setShowPromotionButton(!showPromotionButton);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    setSelectedImage(imagePreview);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const handleParentCategoryChange = (value: string) => {
    setSelectedParent(value);
    const selectedCategory = parentCategories.find((x) => x.value === value);
    setChildCategories(
      selectedCategory?.children.map((category: any) => ({
        value: category.category_id.toString(),
        label: category.category_name,
        level: category.level,
        children: category.children,
      })) || []
    );
    setGrandChildCategories([]);
  };

  const handleChildCategoryChange = (value: string) => {
    const parent = parentCategories.find((x) => x.value === selectedParent);
    const selectedChild = parent?.children.find((x: any) => x.category_id == value);
    setGrandChildCategories(
      selectedChild?.children.map((category: any) => ({
        value: category.category_id.toString(),
        label: category.category_name,
        level: category.level,
        children: category.children,
      })) || []
    );
  };

  const handleRowSelection = (rowData: any) => {
    debugger;
    console.log("Selected Row Data:", rowData);
    setSupplierItemData(rowData[0]);
    setOpen(false);
  };

  const onCloseProductFromSupplier = () => {
    debugger;
    setOpen(false);
  };

  useEffect(() => {
    form.reset(supplierItemData);
  }, [supplierItemData]);

  const rewardsOptions: Option[] = [
    { value: "fixedRetail", label: "Fixed Retail" },
    { value: "multiBuy", label: "Multi Buy" },
    { value: "mixAndMatch", label: "Mix and Match" },
    { value: "fixedDiscountAmount", label: "Fixed Discount by Amount" },
    { value: "comebackVoucher", label: "Comeback Voucher" },
    { value: "comebackRedeem", label: "Comeback Redeem" },
  ];

  const triggerSettingOptions: Option[] = [
    { value: "byQuantity", label: "By Quantity" },
    { value: "byValue", label: "By Value" },
  ];

  const [rows, setRows] = useState([]);
  const [newBarcode, setNewBarcode] = useState({
    inner: "",
    outer: "",
    linked: "",
    plu: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleAddBarcode = () => {
    const newRow = {
      id: Date.now(), // unique id
      ...newBarcode,
    };
    setRows((prev) => [...prev, newRow]);
    setNewBarcode({ inner: "", outer: "", linked: "", plu: "" });
  };

  const columns: GridColDef[] = [
    { field: "inner", headerName: "Inner Barcode (EAN)", width: 200, editable: true },
    { field: "outer", headerName: "Outer Barcode", width: 200, editable: true },
    { field: "linked", headerName: "Linked Barcode", width: 200, editable: true },
    { field: "plu", headerName: "PLU Code (Optional)", width: 180, editable: true },
  ];

  const priceHistoryRows = [
    {
      id: 1,
      date: "2025-02-01",
      ean: "1234567890123",
      shortDescription: "Coconut Water 500ml",
      minRrp: 1.49,
      maxRrp: 1.69,
      retail: 1.59,
      promRetail: null,
      cost: 1.45,
    },
    {
      id: 2,
      date: "2025-02-14",
      ean: "1234567890123",
      shortDescription: "Coconut Water 500ml - Valentine Promo",
      minRrp: 1.49,
      maxRrp: 1.69,
      retail: 1.59,
      promRetail: 1.29,
      cost: 1.3,
    },
    {
      id: 3,
      date: "2025-03-01",
      ean: "1234567890123",
      shortDescription: "Coconut Water 500ml",
      minRrp: 1.59,
      maxRrp: 1.79,
      retail: 1.69,
      promRetail: null,
      cost: 1.75,
    },
    {
      id: 4,
      date: "2025-03-17",
      ean: "9876543210987",
      shortDescription: "Organic Almond Milk 1L - St. Patrick Promo",
      minRrp: 2.1,
      maxRrp: 2.5,
      retail: 2.3,
      promRetail: 1.99,
      cost: 2.0,
    },
    {
      id: 5,
      date: "2025-04-01",
      ean: "9876543210987",
      shortDescription: "Organic Almond Milk 1L",
      minRrp: 2.2,
      maxRrp: 2.6,
      retail: 2.4,
      promRetail: null,
      cost: 2.5,
    },
    {
      id: 6,
      date: "2025-04-12",
      ean: "5556667778888",
      shortDescription: "Sparkling Water Lime 330ml",
      minRrp: 0.79,
      maxRrp: 0.99,
      retail: 0.89,
      promRetail: 0.69,
      cost: 0.82,
    },
    {
      id: 7,
      date: "2025-04-25",
      ean: "5556667778888",
      shortDescription: "Sparkling Water Lime 330ml - Spring Clearance",
      minRrp: 0.69,
      maxRrp: 0.89,
      retail: 0.79,
      promRetail: 0.59,
      cost: 0.85,
    },
  ];

  const priceColumns = [
    { field: "date", headerName: "Date", width: 140 },
    { field: "ean", headerName: "EAN", width: 160 },
    { field: "shortDescription", headerName: "Description", flex: 1 },
    { field: "unit", headerName: "Unit", width: 80 },
    { field: "supplierName", headerName: "Supplier", width: 150 },
    { field: "minRrp", headerName: "Min RRP", width: 100, type: "number", editable: true },
    { field: "maxRrp", headerName: "Max RRP", width: 100, type: "number", editable: true },
    { field: "retail", headerName: "Retail", width: 100, type: "number", editable: true },
    { field: "promRetail", headerName: "Promo Retail", width: 120, type: "number", editable: true },
    { field: "promoStartDate", headerName: "Promo Start", width: 130 },
    { field: "promoEndDate", headerName: "Promo End", width: 130 },
    { field: "cost", headerName: "Cost", width: 100, type: "number", editable: true },
    {
      field: "margin",
      headerName: "Margin",
      width: 100,
      valueGetter: (params) => {
        // const cost = params.row.cost;
        // const retail = params.row.retail;
        // if (!cost || !retail || cost === 0) return "-";
        // return `${(((retail - cost) / cost) * 100).toFixed(1)}%`;
      },
    },
    { field: "salesAtThisPrice", headerName: "Sales Qty", width: 110, type: "number" },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => <span className={`px-2 py-1 rounded text-xs font-medium ${params.value === "Approved" ? "bg-green-200 text-green-800" : params.value === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>{params.value}</span>,
    },
    { field: "requestedPrice", headerName: "Requested Price", width: 130, type: "number" },
    { field: "priceNotes", headerName: "Notes", width: 200, editable: true },
    { field: "modifiedBy", headerName: "Modified By", width: 130 },
    { field: "modifiedAt", headerName: "Modified At", width: 150 },
  ];

  return (
    <Card className="card-one mt-2">
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="md:flex">
              <ul className="flex-column space-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:me-4 mb-4 md:mb-0 mt-1">
                <MenuItem href="#" text="Product Details" isActive={activeItem === "ProductDetails"} onClick={() => handleMenuItemClick("ProductDetails")} />
                <MenuItem href="#" text="Barcodes" isActive={activeItem === "Barcodes"} onClick={() => handleMenuItemClick("Barcodes")} />
                <MenuItem href="#" text="Pricing" isActive={activeItem === "Pricing"} onClick={() => handleMenuItemClick("Pricing")} />
                <MenuItem href="#" text="Supplier Details" isActive={activeItem === "SupplierDetails"} onClick={() => handleMenuItemClick("SupplierDetails")} />
                <MenuItem href="#" text="Stock Details" isActive={activeItem === "StockDetails"} onClick={() => handleMenuItemClick("StockDetails")} />
                <MenuItem href="#" text="Promotions" isActive={activeItem === "Promotions"} onClick={() => handleMenuItemClick("Promotions")} />
                <MenuItem href="#" text="Sales Analytics" isActive={activeItem === "StockSalesAnalytics"} onClick={() => handleMenuItemClick("StockSalesAnalytics")} />
                <MenuItem href="#" text="Audit Trail" isActive={activeItem === "AuditTrail"} onClick={() => handleMenuItemClick("AuditTrail")} />
                <MenuItem href="#" text="Configurations" isActive={activeItem === "OtherConfigurations"} onClick={() => handleMenuItemClick("OtherConfigurations")} />
              </ul>

              <div className="pl-3 pr-3 pb-3 pt-1 bg-zinc-50 text-medium text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 rounded-lg w-full">
                {activeItem === "ProductDetails" && (
                  <>
                    <div className="flex gap-4 mb-3">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="btn-cyan mb-3">Add Product from Supplier</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1200px]">
                          <DialogHeader>
                            <DialogTitle>Add product from Supplier</DialogTitle>
                            <DialogDescription>Add the product from the supplier plof and search if it's already exist in the system</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <AddProductFromSupplier onSelectRow={handleRowSelection} onClose={onCloseProductFromSupplier} />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="btn-cyan mb-3">Add Product from Supplier</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1200px]">
                          <DialogHeader>
                            <DialogTitle>Add Product from Excel</DialogTitle>
                            <DialogDescription>Add the product from the supplier plof and search if it's already exist in the system</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">{/* <AddProductFromExcel onSelectRow={handleRowSelection} onClose={onCloseProductFromSupplier} /> */}</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex w-full gap-6">
                      {/* Left Side: Fields */}
                      <div className="w-5/6">
                        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg p-6 bg-white dark:bg-zinc-900 transition-all">
                          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6">
                            <InputField control={form.control} label="Item Code" name="itemCode" placeholder="Enter item code" type="text" clipboard />
                            <InputField control={form.control} label="Item Name / Description" name="itemName" placeholder="Enter item name" type="text" clipboard />
                            <InputField control={form.control} label="Item Type" name="itemType" placeholder="Enter item type" type="text" />
                            <InputField control={form.control} label="Item Group" name="itemGroup" placeholder="Enter item group" type="text" />

                            <InputField control={form.control} label="Item Size" name="itemSize" placeholder="Enter item size" type="text" />
                            <InputField control={form.control} label="Case Size" name="caseSize" placeholder="Enter case size" type="text" />
                            <SelectField
                              control={form.control}
                              label="Item Status"
                              name="itemStatus"
                              options={[
                                { label: "Active", value: "Active" },
                                { label: "Discontinued", value: "Discontinued" },
                              ]}
                            />
                            <InputField control={form.control} label="VAT Rate (%)" name="vat" placeholder="Enter VAT %" type="text" />

                            <SelectField
                              control={form.control}
                              label="Sales Type"
                              name="salesType"
                              options={[
                                { label: "Fixed Price", value: "Fixed Price" },
                                { label: "Weight Based", value: "Weight Based" },
                              ]}
                            />
                            <InputField control={form.control} label="Weight (Optional)" name="weight" placeholder="Enter weight" type="number" />
                            <InputField control={form.control} label="Ingredient Details (Optional)" name="ingredients" placeholder="Enter ingredients" type="text" />
                            <InputField control={form.control} label="Sale Size (Optional)" name="saleSize" placeholder="Enter sale size" type="text" />

                            <InputField control={form.control} label="UOM (Unit of Measure)" name="uom" placeholder="Enter unit of measurement" type="text" />
                            <InputField control={form.control} label="Comparison Unit" name="comparisonUnit" placeholder="Enter comparison unit" type="text" />
                            <SelectField
                              control={form.control}
                              label="Weight Type"
                              name="weightType"
                              options={[
                                { label: "Unit", value: "Unit" },
                                { label: "Weight Based", value: "Weight Based" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Product Image */}
                      <div className="w-1/6 flex flex-col items-center justify-start">
                        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg p-4 bg-white dark:bg-zinc-900 transition-all">
                          <h4 className="text-md font-semibold text-zinc-700 dark:text-zinc-200 mb-2 text-center">Product Image</h4>
                          <ImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} onImageClick={handleImageClick} isPopupOpen={isPopupOpen} onClosePopup={handleClosePopup} selectedImage={selectedImage} />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeItem === "Barcodes" && (
                  <div>
                    {/* Add Barcode Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                      {/* <DialogTrigger asChild>
                    <Button className="btn-cyan mb-3">Add Barcode</Button>
                  </DialogTrigger> */}
                      <DialogContent className="ml-36 sm:max-w-[1600px]">
                        <DialogHeader>
                          <DialogTitle>Add new Barcode</DialogTitle>
                        </DialogHeader>
                        <div>
                          <AddBarCode form={form} />
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Toolbar with Icons */}
                    <div className="flex items-center gap-2 mb-2">
                      <Button className="btn-cyan mb-3">➕ Add Barcode </Button>
                      <Button className="btn-cyan mb-3">✏️ Edit Barcode</Button>
                      <Button className="btn-cyan mb-3">🗑️ Delete Barcode</Button>
                    </div>

                    {/* Color Legend */}
                    <div className="flex gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-500" /> Inner Barcode
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-orange-500" /> Outer Barcode
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-blue-600" /> Reduce to Clear
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-green-600" /> Price Mark
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-cyan-300" /> Linked Barcode
                      </div>
                    </div>

                    {/* DataGrid Table */}
                    <ThemeProvider theme={theme}>
                      <DataGrid
                        autoHeight
                        rows={rows}
                        columns={[
                          {
                            field: "main",
                            headerName: "Main",
                            width: 80,
                            renderCell: (params) => <input type="radio" name="mainBarcode" checked={params.row.main === true} onChange={() => handleMainChange(params.row.id)} />,
                          },
                          { field: "shortDescription", headerName: "Short Description", flex: 1 },
                          { field: "ean", headerName: "EAN", width: 160 },
                          { field: "itemSize", headerName: "Item Size", width: 100 },
                          { field: "minRrp", headerName: "Min RRP", width: 100 },
                          { field: "maxRrp", headerName: "Max RRP", width: 100 },
                          { field: "retail", headerName: "Retail", width: 100 },
                          { field: "promStartDate", headerName: "Prom Start Date", width: 150 },
                          { field: "promEndDate", headerName: "Prom End Date", width: 150 },
                          { field: "promRetail", headerName: "Prom Retail", width: 100 },
                        ]}
                        getRowId={(row: any) => row.id}
                        rowHeight={35}
                        columnVisibilityModel={columnVisibility}
                        onColumnVisibilityModelChange={(newModel) => setColumnVisibility(newModel)}
                        onRowSelectionModelChange={(newSelection: any) => setRowSelectionModel(newSelection)}
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 15, page: 0 },
                          },
                          filter: {
                            filterModel: {
                              items: [],
                              quickFilterValues: [searchQuery],
                            },
                          },
                        }}
                        pageSizeOptions={[15, 25, 50]}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{ toolbar: { showQuickFilter: true } }}
                      />
                    </ThemeProvider>
                  </div>
                )}

                {activeItem === "Pricing" && (
                  <div className="grid  w-full">
                    <h2 className="text-lg font-semibold mb-2">📈 Price History</h2>
                    <PriceHistoryGrid row={priceHistoryRows} />

                    {/* <ul className="list-disc pl-5">
                      <li>
                        <span className="inline-block w-3 h-3 mr-2 align-middle bg-green-100 border border-green-400"></span>
                        <strong>Promo Price</strong>: Promo &lt; Retail
                      </li>
                      <li>
                        <span className="inline-block w-3 h-3 mr-2 align-middle bg-yellow-100 border border-yellow-400"></span>
                        <strong>Cost Warning</strong>: Cost &gt; Retail
                      </li>
                      <li>
                        <span className="inline-block w-3 h-3 mr-2 align-middle bg-red-100 border border-red-400"></span>
                        <strong>Low Margin</strong>: Margin &lt; 5%
                      </li>
                    </ul>

                    <ThemeProvider theme={theme}>
                      <DataGrid
                        autoHeight
                        rows={priceHistoryRows}
                        columns={priceColumns}
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
                        processRowUpdate={(newRow, oldRow) => ({
                          ...newRow,
                          modifiedBy: "Ajithan",
                          modifiedAt: new Date().toISOString(),
                        })}
                        onProcessRowUpdateError={(error) => console.error("Update error:", error)}
                        disableRowSelectionOnClick
                      />
                    </ThemeProvider> */}

                    {/* <InputField control={form.control} label="Retail Price (Selling Price)" placeholder="Enter retail price" name="retailPrice" type="number" step="0.01" required />
                    <InputField control={form.control} label="Recommended Retail Price (RRP)" placeholder="Enter RRP" name="rrp" type="number" step="0.01" />
                    <InputField control={form.control} label="Promotion Retail Price (Discounted Price)" placeholder="Enter promotion retail price" name="promotionRetailPrice" type="number" step="0.01" />
                    <InputField control={form.control} label="Supplier Cost" placeholder="Enter supplier cost" name="supplierCost" type="number" step="0.01" required />
                    <InputField control={form.control} label="Retailer Cost" placeholder="Enter retailer cost" name="retailerCost" type="number" step="0.01" required />
                    <InputField control={form.control} label="Last Delivery Cost" placeholder="Enter last delivery cost" name="lastDeliveryCost" type="number" step="0.01" />
                    <InputField control={form.control} label="Margin (%)" placeholder="Enter margin percentage" name="margin" type="text" />
                    <InputField control={form.control} label="FIFO Price" placeholder="Enter FIFO price" name="fifoPrice" type="number" step="0.01" />
                    <InputField control={form.control} label="LIFO Price" placeholder="Enter LIFO price" name="lifoPrice" type="number" step="0.01" />
                    <CalendarInput control={form.control} label="Promotion Start Date" name="promotionStartDate" required />
                    <CalendarInput control={form.control} label="Promotion End Date" name="promotionEndDate" /> */}
                  </div>
                )}

                {activeItem === "SupplierDetails" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <InputField control={form.control} label="Supplier Name" placeholder="Enter supplier name" name="supplierName" type="text" required />
                    <InputField control={form.control} label="Supplier Item Code" placeholder="Enter supplier item code" name="supplierItemCode" type="text" />
                    <InputField control={form.control} label="Supplier Inner EAN" placeholder="Enter supplier inner EAN" name="supplierInnerEan" type="text" />
                    <InputField control={form.control} label="Supplier Outer Barcode" placeholder="Enter supplier outer barcode" name="supplierOuterBarcode" type="text" />
                    <InputField control={form.control} label="Supplier Case Size" placeholder="Enter supplier case size" name="supplierCaseSize" type="text" />
                    <InputField control={form.control} label="Supplier RRP" placeholder="Enter supplier RRP" name="supplierRrp" type="number" step="0.01" />
                    <InputField control={form.control} label="Supplier Case Cost" placeholder="Enter supplier case cost" name="supplierCaseCost" type="number" step="0.01" />
                    <InputField control={form.control} label="Supplier Cost Each" placeholder="Enter supplier cost each" name="supplierCostEach" type="number" step="0.01" />
                    <CalendarInput control={form.control} label="Supplier Promotion Order Start Date" name="supplierPromotionStartDate" />
                    <CalendarInput control={form.control} label="Supplier Promotion Order End Date" name="supplierPromotionEndDate" />

                    <SelectField
                      control={form.control}
                      label="Supplier Blacklist Status"
                      name="supplierBlacklistStatus"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select blacklist status"
                    />

                    {/* Multiple Supplier Links Note */}
                    <div className="col-span-5">
                      <p className="text-sm text-zinc-600 italic">You can link multiple suppliers to one product (handle in supplier management module).</p>
                    </div>
                  </div>
                )}

                {activeItem === "StockDetails" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <InputField control={form.control} label="In Stock Quantity" placeholder="Enter in-stock quantity" name="inStockQty" type="number" />
                    <InputField control={form.control} label="On Order Quantity" placeholder="Enter on-order quantity" name="onOrderQty" type="number" />
                    <CalendarInput control={form.control} label="Stock Runout Date" name="stockRunoutDate" />
                    <CalendarInput control={form.control} label="Expected Stock Runout Date" name="expectedStockRunoutDate" />
                    <CalendarInput control={form.control} label="Last Stock Take Date" name="lastStockTakeDate" />

                    <CalendarInput control={form.control} label="Last Sold Date" name="lastSoldDate" />
                    <InputField control={form.control} label="Last Sold Quantity" placeholder="Enter last sold quantity" name="lastSoldQty" type="number" />
                    <InputField control={form.control} label="Last Sold Retail Price" placeholder="Enter last sold retail price" name="lastSoldRetailPrice" type="number" step="0.01" />
                    <InputField control={form.control} label="Last Sold Barcode" placeholder="Enter last sold barcode" name="lastSoldBarcode" type="text" />

                    <CalendarInput control={form.control} label="Last Received Date" name="lastReceivedDate" />
                    <InputField control={form.control} label="Last Received Supplier" placeholder="Enter last received supplier" name="lastReceivedSupplier" type="text" />
                    <InputField control={form.control} label="Last Received Quantity" placeholder="Enter last received quantity" name="lastReceivedQty" type="number" />
                    <InputField control={form.control} label="Last Received Case Size" placeholder="Enter last received case size" name="lastReceivedCaseSize" type="text" />
                    <InputField control={form.control} label="Last Received Cost" placeholder="Enter last received cost" name="lastReceivedCost" type="number" step="0.01" />

                    <CalendarInput control={form.control} label="Next Delivery Date" name="nextDeliveryDate" />
                    <InputField control={form.control} label="Next Delivery Supplier" placeholder="Enter next delivery supplier" name="nextDeliverySupplier" type="text" />
                    <InputField control={form.control} label="Next Delivery Quantity" placeholder="Enter next delivery quantity" name="nextDeliveryQty" type="number" />
                    <InputField control={form.control} label="Next Delivery Cost" placeholder="Enter next delivery cost" name="nextDeliveryCost" type="number" step="0.01" />
                  </div>
                )}

                {activeItem === "Promotions" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <InputField control={form.control} label="Current Promotion Name" placeholder="Enter promotion name" name="currentPromotionName" type="text" required />

                    <SelectField
                      control={form.control}
                      label="Reward Type"
                      name="rewardType"
                      options={[
                        { label: "Fixed Retail", value: "Fixed Retail" },
                        { label: "Discount", value: "Discount" },
                        { label: "Cashback", value: "Cashback" },
                        { label: "Mix & Match", value: "Mix & Match" },
                      ]}
                      placeholder="Select reward type"
                      required
                    />

                    <CalendarInput control={form.control} label="Promotion Start Date" name="promotionStartDate" required />

                    <CalendarInput control={form.control} label="Promotion End Date" name="promotionEndDate" />

                    <InputField control={form.control} label="Promotion Retail Price" placeholder="Enter promotion retail price" name="promotionRetailPrice" type="number" step="0.01" />
                  </div>
                )}

                {activeItem === "AuditTrail" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <CalendarInput control={form.control} label="Created Date" name="createdDate" />
                    <InputField control={form.control} label="Created By" placeholder="Enter creator's name" name="createdBy" type="text" />
                    <CalendarInput control={form.control} label="Last Updated Date" name="lastUpdatedDate" />
                    <InputField control={form.control} label="Updated By" placeholder="Enter updater's name" name="updatedBy" type="text" />

                    <InputField control={form.control} label="Change Log / Audit History" placeholder="Enter change log or audit notes" name="changeLog" type="text" />

                    <InputField control={form.control} label="Module Name" placeholder="Enter module name" name="moduleName" type="text" />

                    <InputField control={form.control} label="Field Changed" placeholder="Enter field changed" name="fieldChanged" type="text" />

                    <InputField control={form.control} label="Old Value" placeholder="Enter old value" name="oldValue" type="text" />

                    <InputField control={form.control} label="New Value" placeholder="Enter new value" name="newValue" type="text" />

                    <CalendarInput control={form.control} label="Modified Date" name="modifiedDate" />

                    <SelectField
                      control={form.control}
                      label="Changes From"
                      name="changesFrom"
                      options={[
                        { label: "System", value: "System" },
                        { label: "Manual", value: "Manual" },
                      ]}
                      placeholder="Select changes source"
                    />

                    <InputField control={form.control} label="User Name" placeholder="Enter user name" name="auditUserName" type="text" />

                    <SelectField
                      control={form.control}
                      label="Type"
                      name="auditType"
                      options={[
                        { label: "Auto", value: "Auto" },
                        { label: "Manual", value: "Manual" },
                      ]}
                      placeholder="Select type"
                    />
                  </div>
                )}

                {activeItem === "StockSalesAnalytics" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <InputField control={form.control} label="Today Sale Quantity" placeholder="Enter today's sale quantity" name="todaySaleQty" type="number" />
                    <InputField control={form.control} label="Yesterday Sale Quantity" placeholder="Enter yesterday's sale quantity" name="yesterdaySaleQty" type="number" />
                    <InputField control={form.control} label="This Week Sale Quantity" placeholder="Enter this week's sale quantity" name="thisWeekSaleQty" type="number" />
                    <InputField control={form.control} label="Last Week Sale Quantity" placeholder="Enter last week's sale quantity" name="lastWeekSaleQty" type="number" />
                    <InputField control={form.control} label="Year To Date Sale Quantity" placeholder="Enter YTD sale quantity" name="ytdSaleQty" type="number" />
                    <InputField control={form.control} label="Last 4 Weeks Sale Quantity" placeholder="Enter last 4 weeks sale quantity" name="last4WeeksSaleQty" type="number" />
                    <InputField control={form.control} label="Last 13 Weeks Sale Quantity" placeholder="Enter last 13 weeks sale quantity" name="last13WeeksSaleQty" type="number" />
                    <InputField control={form.control} label="Last 26 Weeks Sale Quantity" placeholder="Enter last 26 weeks sale quantity" name="last26WeeksSaleQty" type="number" />
                    <InputField control={form.control} label="Last 52 Weeks Sale Quantity" placeholder="Enter last 52 weeks sale quantity" name="last52WeeksSaleQty" type="number" />
                    <InputField control={form.control} label="Sale Retail Value" placeholder="Enter sale retail value" name="saleRetailValue" type="number" step="0.01" />
                    <InputField control={form.control} label="Margin Value" placeholder="Enter margin value" name="marginValue" type="number" step="0.01" />
                    <InputField control={form.control} label="Wastage Quantity" placeholder="Enter wastage quantity" name="wastageQty" type="number" />
                    <InputField control={form.control} label="Wastage Retail Value" placeholder="Enter wastage retail value" name="wastageRetailValue" type="number" step="0.01" />
                    <InputField control={form.control} label="RTC (Reduce to Clear) Quantity" placeholder="Enter RTC quantity" name="rtcQty" type="number" />

                    {/* Yearly History Note */}
                    <div className="col-span-5">
                      <p className="text-sm text-zinc-600 italic">Yearly History (last 4-5 years sales) will be visualized in reports/graphs. Maintain history records separately.</p>
                    </div>
                  </div>
                )}

                {activeItem === "OtherConfigurations" && (
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 border border-zinc-200 p-4 rounded-lg shadow-md w-full">
                    <SelectField
                      control={form.control}
                      label="Stock Control"
                      name="stockControl"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select stock control option"
                    />

                    <SelectField
                      control={form.control}
                      label="Suggested Order"
                      name="suggestedOrder"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select suggested order option"
                    />

                    <InputField control={form.control} label="Minimum Stock Level" placeholder="Enter minimum stock level" name="minStockLevel" type="number" />
                    <InputField control={form.control} label="Maximum Stock Level" placeholder="Enter maximum stock level" name="maxStockLevel" type="number" />
                    <InputField control={form.control} label="Minimum Order Quantity" placeholder="Enter minimum order quantity" name="minOrderQty" type="number" />
                    <InputField control={form.control} label="Maximum Order Quantity" placeholder="Enter maximum order quantity" name="maxOrderQty" type="number" />
                    <InputField control={form.control} label="Shelf Life (days)" placeholder="Enter shelf life in days" name="shelfLifeDays" type="number" />

                    <SelectField
                      control={form.control}
                      label="Price Override Allowed"
                      name="priceOverrideAllowed"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select price override option"
                    />

                    <SelectField
                      control={form.control}
                      label="Return Allowed"
                      name="returnAllowed"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select return allowed option"
                    />

                    <SelectField
                      control={form.control}
                      label="General Discount Allowed"
                      name="generalDiscountAllowed"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select general discount option"
                    />

                    <SelectField
                      control={form.control}
                      label="Staff Discount Allowed"
                      name="staffDiscountAllowed"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select staff discount option"
                    />

                    <SelectField
                      control={form.control}
                      label="Display in Dashboard"
                      name="displayInDashboard"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select dashboard display option"
                    />

                    <SelectField
                      control={form.control}
                      label="Label Required"
                      name="labelRequired"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select label requirement"
                    />

                    <InputField control={form.control} label="Label Type" placeholder="Enter label type (Paper, Plastic etc.)" name="labelType" type="text" />
                    <InputField control={form.control} label="Label Format" placeholder="Enter label format (Standard, 7x3 etc.)" name="labelFormat" type="text" />
                    <InputField control={form.control} label="Label Quantity" placeholder="Enter label quantity" name="labelQuantity" type="number" />
                    <InputField control={form.control} label="Till Message (Optional)" placeholder="Enter till message" name="tillMessage" type="text" />

                    <SelectField
                      control={form.control}
                      label="Prevent Auto Deletion"
                      name="preventAutoDeletion"
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                      placeholder="Select auto deletion option"
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="border-t border-zinc-300" />
            <div className="flex justify-end space-x-4 mt-2 pr-4">
              <Button variant="outline" className="btn-zinc">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="btn-cyan">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Loading...
                  </>
                ) : type === ModeType.Edit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
