import React, { useEffect, useState } from "react";
import HeaderComponents from "@/components/elements/HeaderSection";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import CardTitle from "@/components/elements/CardTitle";
import {
  GridActionsCellItem,
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridToolbar,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import {
  getPromotionProductList,
  printLog,
  uploadLabelImage,
  uploadPromotionList,
} from "@/service/promotion.service";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";
import { Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import PromoCard from "@/components/elements/PromoCard";
import IOSSwitch from "@/components/elements/toggleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { imageUrl } from "@/_config";
import { DatePickerWithRange } from "@/components/elements/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/lib/formatDate";
import SelectField from "@/components/elements/SelectField";
import { getStore } from "@/service/store.service";
const CreatePromotion: React.FC<{ title: string; icon: any }> = ({
  title,
  icon,
}) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<GridColumnVisibilityModel>({});
  const [currentRowId, setCurrentRowId] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [reloadFrame, setReloadFrame] = useState(true);
  const [storeList, setStoreList] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const store = await getStore();
        if (store.status !== 200) {
          console.error(store.data);
          return;
        }
        setStoreList(
          store.data.data.map((item: any) => ({
            value: item.storeId.toString(),
            label: item.storeName,
          }))
        );
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    fetchStore();
  }, []);

  const headers = [
    "barcode",
    "brand",
    "uom",
    "size",
    "itemName",
    "price",
    "date",
  ];

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Convert to desired format and ensure headers match
      const formattedData = jsonData.map((row: any, index: number) => {
        const rowData: any = {};
        headers.forEach((header, headerIndex) => {
          rowData[header] = row[headerIndex] || ""; // Default to empty string if value is missing
        });
        rowData.labelId = index; // Assign a unique id based on the index
        return rowData;
      });

      formattedData.forEach((element: any) => {
        element.image = element.barcode + ".webp";
      });
      updatePromotions(formattedData);
      setRows(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const updatePromotions = async (formattedData: any) => {
    const batchSize = 100; // Define a manageable batch size
    const maxRetries = 3; // Maximum retries for failed batches
    setIsLoading(true);

    // Function to split data into smaller chunks
    const chunkData = (data: any[], size: number) => {
      const chunks = [];
      for (let i = 0; i < data.length; i += size) {
        chunks.push(data.slice(i, i + size));
      }
      return chunks;
    };

    // Retry function
    const retry = async (fn: Function, retries: number) => {
      for (let i = 0; i < retries; i++) {
        try {
          return await fn();
        } catch (error) {
          if (i === retries - 1) throw error; // If it's the last attempt, throw the error
        }
      }
    };

    const batches: any = chunkData(formattedData, batchSize);
    let allUploadedRows: any[] = [];

    try {
      for (const [index, batch] of batches.entries()) {
        const uploadBatch = async () => {
          const data = {
            canUpdateDuplicates: true,
            item_details: batch,
          };

          const promotionResponse: any = await uploadPromotionList(data);

          if (
            promotionResponse.status === 200 ||
            promotionResponse.status === 201
          ) {
            promotionResponse.data.data.updated_label_details.forEach(
              (element: any) => {
                element.image = element.barcode + ".webp";
              }
            );
            return promotionResponse.data.data.updated_label_details;
          } else {
            throw new Error("Failed batch upload");
          }
        };

        // Attempt to upload the batch with retry logic
        const uploadedRows = await retry(uploadBatch, maxRetries);
        allUploadedRows = [...allUploadedRows, ...uploadedRows]; // Accumulate successful uploads
      }

      // Update the UI with all uploaded rows after all batches are processed
      setRows(allUploadedRows);

      // Final validation to ensure all data was uploaded
      if (allUploadedRows.length === formattedData.length) {
      } else {
        console.warn(
          `Uploaded ${allUploadedRows.length} out of ${formattedData.length} records.`
        );
      }
    } catch (error) {
      console.error("Error uploading promotions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createExcelWithHeaders = () => {
    // Define headings
    const headers = [
      { header: "Barcode", key: "barcode" },
      { header: "Brand", key: "brand" },
      { header: "Unit of Measure", key: "uom" },
      { header: "Size", key: "size" },
      { header: "Item Name", key: "itemName" },
      // { header: 'Translated Name', key: 'translatedName' },
      // { header: 'Ingredients', key: 'ingredients' },
      // { header: 'Translated Ingredients', key: 'translatedIngredients' },
      // { header: 'Allergic Details', key: 'allergicDetails' },
      // { header: 'Translated Allergic Details', key: 'translatedAllergicDetails' },
      // { header: 'Status', key: 'status' },
      { header: "Price", key: "price" },
      { header: "Date", key: "date" },
    ];

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], {
      header: headers.map((h) => h.key),
    });

    // Add the headers to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.header)], {
      origin: "A1",
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Promotions");

    // Generate buffer and create an XLSX file
    XLSX.writeFile(workbook, "PromotionList.xlsx");
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return isInEditMode
          ? [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />,
            ]
          : [
              // <GridActionsCellItem
              //   icon={<EditIcon />}
              //   label="Edit"
              //   onClick={handleEditClick(id)}
              // />,
              <GridActionsCellItem
                icon={<UploadIcon fontSize="small" />} // or "medium" or "large"
                label="Upload"
                onClick={handleUploadClick(id)} // Make sure to use the correct handler
              />,
              // <GridActionsCellItem
              //   icon={<DeleteIcon />}
              //   label="Delete"
              //   onClick={handleDeleteClick(id)}
              // />
            ];
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
      renderCell: (params) => {
        //  const imageUrlWithNoCache = `${imageUrl}${params.row.image}?${new Date().getTime()}`; // Append timestamp
        const imageUrlWithNoCache = `${imageUrl}label/${params.row.image}`;

        return (
          <Tooltip
            title={
              <img
                src={imageUrlWithNoCache}
                alt="Product"
                className="w-70 h-auto object-contain"
              />
            }
            arrow
            placement="top"
            classes={{ tooltip: "bg-transparent" }}
          >
            <img
              src={imageUrlWithNoCache}
              alt="Product"
              className="w-30 h-auto object-contain"
            />
          </Tooltip>
        );
      },
    },
    { field: "barcode", headerName: "Barcode", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 2 },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "uom", headerName: "Unit of Measure", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },

    // { field: 'translatedName', headerName: 'Translated Name', flex: 1 },
    // { field: 'ingredients', headerName: 'Ingredients', flex: 1 },
    // { field: 'translatedIngredients', headerName: 'Translated Ingredients', flex: 1 },
    // { field: 'allergicDetails', headerName: 'Allergic Details', flex: 1 },
    // { field: 'translatedAllergicDetails', headerName: 'Translated Allergic Details', flex: 1 },
    // { field: 'status', headerName: 'Status', flex: 1, type: 'boolean' },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  const handleUploadClick = (id: any) => () => {
    setCurrentRowId(id);
    setUploadDialogOpen(true);
  };

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/store/edit-company/${id}`);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateImage(event);
    setUploadDialogOpen(false);
  };

  const updateImage = async (event: any) => {
    const file = event.target.files?.[0];
    //  setIsLoading(true);

    try {
      let getBarcode = rows.find((row: any) => row.labelId === currentRowId);

      const formData = new FormData();
      formData.append("imageName", getBarcode.barcode || "");
      formData.append("image", file || "");

      const result = await uploadLabelImage(formData);
      if (result.status === 200) {
        const timestamp = new Date().getTime(); // Generate a timestamp for cache busting
        const updatedRows = rows.map((row: any) =>
          row.labelId === currentRowId
            ? { ...row, image: row.image.split("?")[0] + "?" + timestamp } // Update only the specific row image URL
            : row
        );
        setRows(updatedRows); // Update the rows with the new image URL for the specific row
        //    setIsLoading(false); // Stop loading spinner after image upload
      } else {
        console.error(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      //   setIsLoading(false);
    }
  };
  const [showBarcodeButton, setShowBarcodeButton] = useState(false);

  const toggleSwitchBarcode = () => {
    setShowBarcodeButton(!showBarcodeButton);
    setReloadFrame(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setReloadFrame(true);
    }, 1000);
  };
  const updatePrintLog = async (data: any) => {
    const log = await printLog(data);
    if (log.status !== 200) {
      console.error(log.data);
      return;
    }
  };

  const CreatePdfFile = () => {
    let data = {
      storeId: selectedStore,
      labelType: "Promotion",
      comment: "",
    };
    updatePrintLog(data);

    const pdfContent = document.getElementById("pdf")?.innerHTML;

    if (pdfContent) {
      const myWindow = window.open("", "theFrame");

      myWindow?.document.write(`
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <script src="https://cdn.tailwindcss.com"></script>
   
          </head>
          <body class="">
            <div class="container mx-auto">
              ${pdfContent}
            </div>
          </body>
        </html>
      `);

      myWindow?.document.close();

      // Wait for the window to load before printing
      myWindow?.addEventListener("load", () => {
        myWindow.focus(); // Focus on the new window
        myWindow.print(); // Print the content
        myWindow.close(); // Close the window after printing
      });
    } else {
      console.error("No content available for PDF generation.");
    }
  };

  const [dataForPdf, setDataForPdf] = useState([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [promoStartDate, setPromoStartDate] = useState<string | null>(null);
  const [promoEndDate, setPromoEndDate] = useState<string | null>(null);
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    const formattedStartDate = range?.from ? formatDate(range.from) : "";
    const formattedEndDate = range?.to ? formatDate(range.to) : "";
    setSelectedRange(range);
    setPromoStartDate(formattedStartDate);
    setPromoEndDate(formattedEndDate);
  };

  useEffect(() => {
    setReloadFrame(false);
    if (rows.length > 0) {
      const selectedRows: any = rows.filter((row) =>
        rowSelectionModel.includes(row.labelId)
      );

      setDataForPdf(selectedRows);
    }

    setReloadFrame(true);
  }, [rowSelectionModel]);

  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">
        <Dialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
        >
          <DialogTitle>Upload Image</DialogTitle>
          <DialogActions>
            {/* <Button onClick={handleUpload}>Upload</Button> */}
            <Button
              className="btn-zinc"
              onClick={() => setUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .webp"
                onChange={handleUpload}
                className="hidden"
              />
              <span className="btn-cyan ">Upload Image</span>
            </label>
          </DialogActions>
        </Dialog>

        <HeaderComponents icon={icon} title={title} />

        <Card className="card-one mt-2">
          <CardTitle title="Upload Excel" />
          <CardContent>
            <div className="grid grid-cols-6 gap-4 items-end mb-2 mt-2">
              {/* Upload Excel Button */}

              <div className="col-span-1">
                <label className="flex">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                  <span className="btn-cyan w-full items-center">
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Upload Excel
                  </span>
                </label>
              </div>

              <div className="col-span-1">
                <Button
                  className="btn-cyan w-full"
                  onClick={createExcelWithHeaders}
                >
                  <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                  Template
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 items-end mb-3">
              {/* Date Picker */}
              <div className="col-span-2">
                <DatePickerWithRange
                  dateRange={selectedRange}
                  onSelectDateRange={handleDateRangeSelect}
                  className="w-full custom-class"
                />
              </div>

              {/* Barcode Toggle */}
              <div className="col-span-1">
                <div className="btn-toggle-cyan flex justify-between items-center">
                  <div>
                    <span>Barcode</span>
                  </div>
                  <IOSSwitch
                    checked={showBarcodeButton}
                    onChange={toggleSwitchBarcode}
                    className="ml-2"
                  />
                </div>
              </div>

              {/* Store Select Field */}
              <div className="col-span-1">
                <SelectField
                  label="Store"
                  name="store"
                  placeholder="Select Store"
                  options={storeList}
                  onChange={(store: any) => setSelectedStore(store)}
                />
              </div>

              {/* Print Button */}
              <div className="col-span-1">
                <Button
                  className="btn-cyan w-full"
                  onClick={CreatePdfFile}
                  disabled={!selectedStore}
                >
                  <FontAwesomeIcon icon={faPrint} className="mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-one mt-2">
          <CardTitle title="Uploaded Excel" />
          <CardContent>
            {isLoading ? (
              <RotatingSquaresLoader />
            ) : (
              <ThemeProvider theme={theme}>
                <DataGrid
                  autoHeight
                  // disableColumnFilter
                  // disableColumnSelector
                  // disableDensitySelector
                  checkboxSelection
                  editMode="row"
                  rowModesModel={rowModesModel}
                  // onRowModesModelChange={handleRowModesModelChange}
                  //  onRowEditStop={handleRowEditStop}
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  // columnVisibilityModel={columnVisibility}
                  // onColumnVisibilityModelChange={(newModel) =>
                  //   setColumnVisibility(newModel)
                  // }
                  //   processRowUpdate={processRowUpdate}
                  getRowId={(row) => row.labelId}
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
                  }}
                />
              </ThemeProvider>
            )}
          </CardContent>
        </Card>

        <Card className="card-one mt-2">
          <CardTitle title="Uploaded Excel" />
          <div className="ml-auto">
            <CardContent
              className="w-full"
              style={{ transform: "scale(0.5)", transformOrigin: "top left" }}
            >
              {reloadFrame && (
                <div>
                  {" "}
                  <iframe
                    className="bg-white"
                    id="theFrame"
                    name="theFrame"
                  ></iframe>
                  <PromoCard
                    data={dataForPdf.length == 0 ? rows : dataForPdf}
                    barcode={showBarcodeButton}
                  />
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatePromotion;
