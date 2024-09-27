import React, { useEffect, useState } from "react";
import HeaderComponents from "@/components/elements/HeaderSection";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { GridActionsCellItem, DataGrid, GridColDef, GridRowId, GridRowModes, GridRowModesModel, GridToolbar, GridColumnVisibilityModel, GridRowSelectionModel, GridEventListener, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { getPromotionProductList, updateProductList, uploadLabelImage, uploadPromotionList } from "@/service/promotion.service";
import { useNavigate } from "react-router-dom";
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";
import CardTitle from "@/components/elements/CardTitle";
import Tooltip from "@mui/material/Tooltip";
import IOSSwitch from "@/components/elements/toggleTheme";
import HtmlToPdf from "@/components/elements/HtmlToPdf";
import { DatePickerWithRange } from "@/components/elements/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/lib/formatDate";

const PromotionList: React.FC<{ title: string; icon: any }> = ({ title, icon }) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadImageId, setUploadImageId] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const random = Math.floor(Math.random() * 100000);
  const [imageUrl, setImageUrl] = useState<any>('http://192.168.128.126:5000/public/img/label/');
  const timestamp = new Date().getTime();
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({});

  const [dataForPdf, setDataForPdf] = useState([]);
  const [promoStartDate, setPromoStartDate] = useState<string | null>(null);
  const [promoEndDate, setPromoEndDate] = useState<string | null>(null);
  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const promotionResponse = await getPromotionProductList();
      if (promotionResponse.status === 200 || promotionResponse.status === 201) {
        promotionResponse.data.data.forEach((element: any) => {
          element.image = element.barcode + '.webp';
        });
        setRows(promotionResponse.data.data);
      } else {
        console.error(promotionResponse.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {


    fetchPromotions();
  }, []);

  useEffect(() => {
    setReloadFrame(false)
    console.log(rows)
    if(rows.length > 0) {
      const selectedRows: any = rows.filter((row) =>
        rowSelectionModel.includes(row.labelId)
      );
  
      setDataForPdf(selectedRows);
    }

    setReloadFrame(true)
  }, [rowSelectionModel]);







  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return isInEditMode ? [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(id)}
          />
        ] : [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<UploadIcon fontSize="small" />} // or "medium" or "large"
            label="Upload"
            onClick={handleUploadClick(id)} // Make sure to use the correct handler
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />
        ];
      }
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      editable: false,
      renderCell: (params) => {
        //  const imageUrlWithNoCache = `${imageUrl}${params.row.image}?${new Date().getTime()}`; 
        const imageUrlWithNoCache = `${imageUrl}${params.row.image}`;
        return (
          <Tooltip
            title={
              <img
                src={imageUrlWithNoCache}
                alt="Enlarged Product"
                className="w-70 h-auto max-w-xs object-contain"
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
    { field: 'barcode', headerName: 'Barcode', flex: 1, editable: false },
    { field: 'brand', headerName: 'Brand', flex: 1, editable: true },
    { field: 'uom', headerName: 'Unit of Measure', flex: 1, editable: true },
    { field: 'size', headerName: 'Size', flex: 1, editable: true },
    { field: 'itemName', headerName: 'Item Name', flex: 2, editable: true },
    // { field: 'translatedName', headerName: 'Translated Name', flex: 1 },
    // { field: 'ingredients', headerName: 'Ingredients', flex: 1 },
    // { field: 'translatedIngredients', headerName: 'Translated Ingredients', flex: 1 },
    // { field: 'allergicDetails', headerName: 'Allergic Details', flex: 1 },
    // { field: 'translatedAllergicDetails', headerName: 'Translated Allergic Details', flex: 1 },
    // { field: 'status', headerName: 'Status', flex: 1, type: 'boolean' },
    { field: 'price', headerName: 'Price', flex: 1, editable: true },

  ];

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const rowData = rows.find((row) => row.labelId === id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleUploadClick = (id: any) => () => {
    setCurrentRowId(id);
    setUploadDialogOpen(true);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateImage(event);
    setUploadDialogOpen(false);
  };


  const updateImage = async (event: any) => {
    debugger
    const file = event.target.files?.[0];
    //  setIsLoading(true);

    try {
      let getBarcode = rows.find((row: any) => row.labelId === currentRowId);

      const formData = new FormData();
      formData.append('imageName', getBarcode.barcode || '');
      formData.append('image', file || '');

      const result = await uploadLabelImage(formData);

      if (result.status === 200) {
        const timestamp = new Date().getTime(); // Generate a timestamp for cache busting
        const updatedRows = rows.map((row: any) =>
          row.labelId === currentRowId
            ? { ...row, image: row.image.split('?')[0] + '?' + timestamp } // Update only the specific row image URL
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



  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: any, oldRow: any) => {
debugger;
    const updatePromoData = async () => {
      setReloadFrame(false);
      try {
        const promotionResponse = await updateProductList(newRow.labelId, newRow);
        if (promotionResponse.status === 200 || promotionResponse.status === 201) {
                setRows(promotionResponse.data.data);
        } else {
          console.error(promotionResponse.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setReloadFrame(true);
      }
    };
    updatePromoData()
    // Update the rows state with the new data
    const updatedRows = rows.map((row) => (row.labelId === newRow.labelId ? newRow : row));
    setRows(updatedRows);

    return newRow; // Return the updated row
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const headers = [
    'barcode', 'brand', 'uom', 'size', 'itemName', 'price', 'image', 'date'

  ];



  // const updatePromotions = async (formattedData: any) => {
  //   setIsLoading(true);
  //   try {

  //     let data = {
  //       "canUpdateDuplicates": true,
  //       "item_details": formattedData
  //     }
  //     const promotionResponse = await uploadPromotionList(data);
  //     if (promotionResponse.status === 200 || promotionResponse.status === 201) {
  //       setRows(promotionResponse.data.data.updated_label_details);

  //     } else {
  //       console.error(promotionResponse.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };




  const CreatePdfFile = () => {
    const pdfContent = document.getElementById("pdf")?.innerHTML;

    if (pdfContent) {
      const myWindow = window.open('', "theFrame");

      myWindow?.document.write(`
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"></script>
   
          </head>
          <body >
            <div class="mx-auto">
              ${pdfContent}
            </div>
          </body>
        </html>
      `);

      myWindow?.document.close();

      // Wait for the window to load before printing
      myWindow?.addEventListener('load', () => {
        myWindow.focus(); // Focus on the new window
        myWindow.print(); // Print the content
        myWindow.close(); // Close the window after printing
      });
    } else {
      console.error("No content available for PDF generation.");
    }
  };

  const [showBarcodeButton, setShowBarcodeButton] = useState(false);
  const [reloadFrame, setReloadFrame] = useState(true);
  const toggleSwitchBarcode = () => {
    setShowBarcodeButton(!showBarcodeButton);
    setReloadFrame(false)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setReloadFrame(true)
    }, 1000);

  };


  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    const formattedStartDate = range?.from ? formatDate(range.from) : '';
    const formattedEndDate = range?.to ? formatDate(range.to) : '';
    setSelectedRange(range); // This still works for range selection
    setPromoStartDate(formattedStartDate); // No error, since it accepts string
    setPromoEndDate(formattedEndDate);
    console.log("Selected Date Range:", range);
  };
  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">

        <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogActions>
            {/* <Button onClick={handleUpload}>Upload</Button> */}
            <Button className="btn-zinc" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .webp"
                onChange={handleUpload}
                className="hidden"
              />
              <span className="btn-cyan ">
                Upload Image
              </span>
            </label>
          </DialogActions>
        </Dialog>

        <HeaderComponents icon={icon} title={title} />

        <Card className="card-one mt-2">
          <CardTitle title="Upload Excel" />
          <CardContent>

            <div className="flex justify-between items-center mt-2 mb-2">
              {/* Left side buttons */}
              <div className="flex items-center space-x-4">

                <DatePickerWithRange
                  dateRange={selectedRange}
                  onSelectDateRange={handleDateRangeSelect}
                  className="custom-class"
                />

                <div className="flex items-end h-full">
                  <div className="w-full">
                    <div className="btn-toggle-cyan flex items-center">
                      <div className="mr-2">
                        <span>Barcode</span>
                      </div>
                      <div className="ml-auto">
                        <IOSSwitch checked={showBarcodeButton} onChange={toggleSwitchBarcode} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="btn-cyan" onClick={CreatePdfFile}>
                  Create Pdf File
                </Button>
              </div>


            </div>




          </CardContent>
        </Card>
        <Card className="card-one mt-2">
          <CardTitle title="Promotion List" />
          <CardContent>
            <div className="mt-3">
              {isLoading ? (
                <RotatingSquaresLoader />
              ) : (
                <ThemeProvider theme={theme}>
                  <DataGrid autoHeight
                    // disableColumnFilter
                    // disableColumnSelector
                    // disableDensitySelector
                    checkboxSelection

                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                      setRowSelectionModel(newRowSelectionModel);
                    }}
                    columnVisibilityModel={columnVisibility}
                    onColumnVisibilityModelChange={(newModel) =>
                      setColumnVisibility(newModel)
                    }
                    processRowUpdate={processRowUpdate}
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
                    }
                    }
                  />
                </ThemeProvider>
              )}
            </div>

          </CardContent>
        </Card>


        <Card className="card-one mt-2">
          <CardTitle title="Uploaded Excel" />
          <div className="ml-auto">
            <CardContent className="w-9/12 ">
              {reloadFrame && <div> <iframe className="bg-white" id="theFrame" name="theFrame"></iframe>
                <HtmlToPdf data={dataForPdf} barcode={showBarcodeButton} startDate={promoStartDate} endDate={promoEndDate} /></div>}
            </CardContent>
          </div>

        </Card>
      </div>
    </div>
  );
};

export default PromotionList;
