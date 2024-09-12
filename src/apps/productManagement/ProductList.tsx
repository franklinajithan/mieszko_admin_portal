import React, { useEffect, useState } from "react";
import { Card, Nav, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../../layouts/Header";
import HeaderComponents from "@/components/elements/HeaderSection";
import CardTitle from "@/components/elements/CardTitle";
import InputField from "@/components/elements/InputField";
import SelectField from "@/components/elements/SelectField";
import { sample } from "../../data/constants";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { productSearchFormSchema } from "@/lib/utils";
import CheckboxField from "@/components/elements/CheckboxField";
import { getBrand } from "@/service/brand.service";
import defaultProductImage from '../../assets/img/default-product-image.png';
import { addProduct, getItemCode, getProduct } from "@/service/product.service";

import { useToast } from "@/hooks/use-toast";
import { debug } from "console";
import { getParentCategory } from "@/service/category.service";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FiDownload, FiFilter, FiSettings, FiBookmark, FiUsers } from "react-icons/fi";
import MenuItem from '@/components/elements/MenuItem';
import { getUser } from "@/service/user.service";
import { CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import theme from "@/components/elements/GridTheme";
import { decryptParam } from "@/lib/cryptoUtils";
import { encryptParam } from "@/lib/cryptoUtils";

const exampleDepartmentOptions = [
    { value: '1', label: 'HR' },
    { value: '2', label: 'Finance' },
    { value: '3', label: 'Engineering' },
];

const exampleSupplierOptions = [
    { value: '1', label: 'Supplier A' },
    { value: '2', label: 'Supplier B' },
];

const exampleBarcodePluOptions = [
    { value: '123', label: '123-456' },
    { value: '456', label: '456-789' },
];

const exampleItemCodeOptions = [
    { value: 'A1', label: 'Item A1' },
    { value: 'B2', label: 'Item B2' },
];

const exampleItemNameOptions = [
    { value: 'item1', label: 'Item One' },
    { value: 'item2', label: 'Item Two' },
];

const exampleStatusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'out-of-stock', label: 'Out of Stock' },
];

const exampleBrandOptions = [
    { value: 'brand1', label: 'Brand One' },
    { value: 'brand2', label: 'Brand Two' },
];

const examplePriceMarkedItemOptions = [
    { value: 'marked1', label: 'Marked Item One' },
    { value: 'marked2', label: 'Marked Item Two' },
];

const exampleCaseSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'large', label: 'Large' },
];

const exampleFastestDeliveryOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '48h', label: '48 Hours' },
];


const ProductList = ({ title, icon }: any) => {

    const { t } = useTranslation("global");
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
    const { toast } = useToast()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image URL
    const [isLoading, setIsLoading] = useState(false);
    const [brandList, setBrandList] = useState<any[]>([]);
    const [ItemCode, setItemCode] = useState();
    const [department, setDepartment] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState(exampleDepartmentOptions);
    const [supplierOptions, setSupplierOptions] = useState(exampleSupplierOptions);
    const [barcodePluOptions, setBarcodePluOptions] = useState(exampleBarcodePluOptions);
    const [itemCodeOptions, setItemCodeOptions] = useState(exampleItemCodeOptions);
    const [itemNameOptions, setItemNameOptions] = useState(exampleItemNameOptions);
    const [statusOptions, setStatusOptions] = useState(exampleStatusOptions);
    const [brandOptions, setBrandOptions] = useState(exampleBrandOptions);
    const [priceMarkedItemOptions, setPriceMarkedItemOptions] = useState(examplePriceMarkedItemOptions);
    const [caseSizeOptions, setCaseSizeOptions] = useState(exampleCaseSizeOptions);
    const [fastestDeliveryOptions, setFastestDeliveryOptions] = useState(exampleFastestDeliveryOptions);

    const form = useForm<z.infer<typeof productSearchFormSchema>>({
        resolver: zodResolver(productSearchFormSchema),
        defaultValues: {
            department: '',
            supplier: '',
            barcodePlu: '',
            itemCode: '',
            itemName: '',
            status: '',
            brand: '',
            priceMarkedItem: '',
            caseSize: '',
            fastestDelivery: '',

        }
    });

    const { handleSubmit, formState, reset, setValue } = form;
    const { isValid, isDirty, errors } = formState;
    const [rows, setRows] = useState([]);
    const [isOpenGrid, setIsOpenGrid] = useState(true);
    const toggleGridCardBody = () => { setIsOpenGrid(!isOpenGrid); };
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const toggleSearchCardBody = () => { setIsOpenSearch(!isOpenSearch); };
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {

                const product = await getProduct();
                if (product.status !== 200) {
                    console.error(product.data);
                    return;
                };
                setRows(product.data.data)

                const category = await getParentCategory();
                if (category.status !== 200) {
                    console.error(category.data);
                    return;
                };
                setDepartment(category.data.data.map((item: any) => ({
                    value: item.category_id.toString(),
                    label: item.category_name,
                })));

                const result = await getBrand();
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                };
                setBrandList(result.data.data.map((item: any) => ({
                    value: item.brand_id.toString(),
                    label: item.brand_name,
                })));

                const ItemId: any = await getItemCode();

                // setItemCode(ItemId.data.data.item_code)
                // setValue('itemCode', ItemId.data.data.item_code);



            } catch (e) {
                console.error(e);
            } finally {

            }
        };

        fetchUser();
    }, [])





    const onSubmit = (values: z.infer<typeof productSearchFormSchema>) => {


        const fetchUser = async () => {
            let result: any
            setIsLoading(true);

            try {
                let data = {
                    department: values.department,


                }

                result = await addProduct(data);

                if (result.status == 201) {
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800, })
                } else {
                    toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800, })
                }
            } catch (e: any) {
                toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800, })
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        fetchUser();
    };



    const handleEditClick = (id: GridRowId) => () => {

        navigate(`/product/edit-product/${encryptParam(id.toString())}`);
        //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow: any = rows.find((row: any) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row: any) => row.id !== id));
        }
    };

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const columns: GridColDef[] = [{
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'itemCode', headerName: 'Item Code', flex: 1 },
    { field: 'itemName', headerName: 'Item Name', flex: 1 },
    { field: 'translatedName', headerName: 'Translated Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'labelName', headerName: 'Label Name', flex: 1 },
    { field: 'invoiceName', headerName: 'Invoice Name', flex: 1 },
    { field: 'tillMessage', headerName: 'Till Message', flex: 1 },
    { field: 'ingredients', headerName: 'Ingredients', flex: 1 },
    { field: 'translatedIngredients', headerName: 'Translated Ingredients', flex: 1 },
    { field: 'allergicDetails', headerName: 'Allergic Details', flex: 1 },
    { field: 'translatedAllergicDetails', headerName: 'Translated Allergic Details', flex: 1 },
    { field: 'item_image', headerName: 'Item Image', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'retailUom', headerName: 'Retail UOM', flex: 1 },
    { field: 'wastagePercentage', headerName: 'Wastage Percentage', flex: 1 },
    { field: 'itemType', headerName: 'Item Type', flex: 1 },
    { field: 'minOrderQty', headerName: 'Min Order Qty', flex: 1 },
    { field: 'maxOrderQty', headerName: 'Max Order Qty', flex: 1 },
    { field: 'leadTime', headerName: 'Lead Time', flex: 1 },
    { field: 'reorderLevel', headerName: 'Reorder Level', flex: 1 },
    { field: 'reorderLevelType', headerName: 'Reorder Level Type', flex: 1 },
    { field: 'safetyStock', headerName: 'Safety Stock', flex: 1 },
    { field: 'shelfLife', headerName: 'Shelf Life', flex: 1 },
    { field: 'shelfLifeType', headerName: 'Shelf Life Type', flex: 1 },
    { field: 'countryOfOrigin', headerName: 'Country of Origin', flex: 1 },
        // { field: 'vat.vatCode', headerName: 'VAT Code', flex: 1 },
        // { field: 'vat.vatRate', headerName: 'VAT Rate', flex: 1 },
        // { field: 'vat.effectiveFrom', headerName: 'VAT Effective From', flex: 1 },
        // { field: 'brand.brandName', headerName: 'Brand Name', flex: 1 },
        // { field: 'brand.description', headerName: 'Brand Description', flex: 1 },
        // { field: 'category.categoryName', headerName: 'Category Name', flex: 1 },
        // { field: 'category.isPLU', headerName: 'Category PLU', flex: 1 },
        // { field: 'category.pluCode', headerName: 'Category PLU Code', flex: 1 },
        // { field: 'item_details.tags', headerName: 'Tags', flex: 1 },
        // { field: 'item_details.isPluCoded', headerName: 'Is PLU Coded', flex: 1 },
        // { field: 'item_details.isSeasoned', headerName: 'Is Seasoned', flex: 1 },
        // { field: 'item_details.isStoreUse', headerName: 'Is Store Use', flex: 1 },
        // { field: 'item_details.isWeighted', headerName: 'Is Weighted', flex: 1 },
        // { field: 'item_details.hasLeadTime', headerName: 'Has Lead Time', flex: 1 },
        // { field: 'item_details.canBeInPromo', headerName: 'Can Be In Promo', flex: 1 },
        // { field: 'item_details.canSplitSell', headerName: 'Can Split Sell', flex: 1 },
        // { field: 'item_details.canStockTake', headerName: 'Can Stock Take', flex: 1 },
        // { field: 'item_details.isOutOfStock', headerName: 'Is Out Of Stock', flex: 1 },
        // { field: 'item_details.needPreOrder', headerName: 'Need Pre Order', flex: 1 },
        // { field: 'item_details.splitSellQty', headerName: 'Split Sell Qty', flex: 1 },
        // { field: 'item_details.hasBoxBarcode', headerName: 'Has Box Barcode', flex: 1 },
        // { field: 'item_details.hasLinkedItem', headerName: 'Has Linked Item', flex: 1 },
        // { field: 'item_details.isPriceMarked', headerName: 'Is Price Marked', flex: 1 },
        // { field: 'item_details.minSellingQty', headerName: 'Min Selling Qty', flex: 1 },
        // { field: 'item_details.isDiscontinued', headerName: 'Is Discontinued', flex: 1 },
        // { field: 'item_details.isDiscountable', headerName: 'Is Discountable', flex: 1 },
        // { field: 'item_details.isStoreVisible', headerName: 'Is Store Visible', flex: 1 },
        // { field: 'item_details.hasOuterBarcode', headerName: 'Has Outer Barcode', flex: 1 },
        // { field: 'item_details.isAgeRestricted', headerName: 'Is Age Restricted', flex: 1 },
        // { field: 'item_details.canOrderInPallet', headerName: 'Can Order In Pallet', flex: 1 },
        // { field: 'item_details.hasMinSellingQty', headerName: 'Has Min Selling Qty', flex: 1 },
        // { field: 'item_details.hasPalletBarcode', headerName: 'Has Pallet Barcode', flex: 1 },
        // { field: 'item_details.canPurchaseLocally', headerName: 'Can Purchase Locally', flex: 1 },
        // { field: 'item_details.isStoreTransferable', headerName: 'Is Store Transferable', flex: 1 },
        // { field: 'item_details.isConsideredForPurchasePlan', headerName: 'Is Considered For Purchase Plan', flex: 1 }
    ];


    const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({
        id: false,
        itemCode: true,
        itemName: true,
        translatedName: false,
        description: true,
        labelName: true,
        invoiceName: true,
        tillMessage: true,
        ingredients: true,
        translatedIngredients: false,
        allergicDetails: true,
        translatedAllergicDetails: false,
        item_image: false,
        uom: true,
        retailUom: true,
        wastagePercentage: false,
        itemType: true,
        minOrderQty: true,
        maxOrderQty: true,
        leadTime: true,
        reorderLevel: false,
        reorderLevelType: false,
        safetyStock: false,
        shelfLife: false,
        shelfLifeType: false,
        countryOfOrigin: false,
        vat: false,
        brand: false,
        category: false,
        item_details: false,

    });

    const handleRedirect = () => {
        navigate('/product/new-product'); // Redirect to the desired path
    };



    return (
        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Search" onToggle={toggleSearchCardBody} isOpen={isOpenSearch} />
                        {isOpenSearch && (<Card.Body>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                    <div className="grid w-full grid-cols-5 gap-4">
                                        <SelectField control={form.control} label="Department" name="department" options={departmentOptions} />
                                        <SelectField control={form.control} label="Supplier" name="supplier" options={supplierOptions} />
                                        <SelectField control={form.control} label="Barcode/Plu" name="barcodePlu" options={barcodePluOptions} />
                                        <SelectField control={form.control} label="Item Code" name="itemCode" options={itemCodeOptions} />
                                        <SelectField control={form.control} label="Item Name" name="itemName" options={itemNameOptions} />
                                        <SelectField control={form.control} label="Status" name="status" options={statusOptions} />
                                        <SelectField control={form.control} label="Brand" name="brand" options={brandOptions} />
                                        <SelectField control={form.control} label="Price Marked Item" name="priceMarkedItem" options={priceMarkedItemOptions} />
                                        <SelectField control={form.control} label="Case Size" name="caseSize" options={caseSizeOptions} />
                                        <SelectField control={form.control} label="Fastest Delivery" name="fastestDelivery" options={fastestDeliveryOptions} />
                                    </div>



                                    <hr className="border-t border-zinc-300 " />
                                    <div className="flex justify-end space-x-4  mt-2 pr-4">
                                        <button className="btn-zinc">
                                            Reset
                                        </button>
                                        <Button type="submit" disabled={isLoading} className='btn-cyan'>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                                </>)
                                                : "Search"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </Card.Body>)}
                    </Card>
             
                    <Card className="card-one mt-2">
                        <CardTitle title="Product List" onToggle={toggleGridCardBody} isOpen={isOpenGrid} />
                        {isOpenGrid && (<CardContent>
                            <div className="flex justify-start space-x-4  mt-2 pr-4">
                                <Button type="submit" className='btn-cyan' onClick={handleRedirect}>
                                    New Product
                                </Button>
                            </div>
                            <div className="w-full mt-3"> {/* TailwindCSS classes for height and width */}
                                <div className="h-full w-full"> {/* Container for DataGrid */}
                                    <div>
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
                                                        showQuickFilter: true,
                                                    },
                                                }
                                                }
                                            />
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>

                        </CardContent>)}

                    </Card>
                </div>
            </div>
        </>
    );
};

export default ProductList;
