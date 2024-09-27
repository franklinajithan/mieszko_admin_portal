import React, { useEffect, useState } from "react";
import HeaderComponents from "@/components/elements/HeaderSection";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import CardTitle from "@/components/elements/CardTitle";
import { GridActionsCellItem, DataGrid, GridColDef, GridRowId, GridRowModes, GridRowModesModel, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { getPromotionProductList, uploadLabelImage, uploadPromotionList } from "@/service/promotion.service";
import { useNavigate } from "react-router-dom";
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";
import { Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import HtmlToPdf from "@/components/elements/HtmlToPdf";
import IOSSwitch from "@/components/elements/toggleTheme";

const CreatePromotion: React.FC<{ title: string; icon: any }> = ({ title, icon }) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [reloadFrame, setReloadFrame] = useState(true);
  const [imageUrl, setImageUrl] = useState<any>('http://192.168.128.126:5000/api/img/');
  // useEffect(() => {
  //   const fetchPromotions = async () => {
  //     setIsLoading(true);
  //     try {
  //       const promotionResponse = await getPromotionProductList();
  //       if (promotionResponse.status === 200) {
  //         //   setRows(promotionResponse.data.data);
  //       } else {
  //         console.error(promotionResponse.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPromotions();
  // }, []);

  const headers = [
    'barcode', 'brand', 'uom', 'size', 'itemName', 'price', 'image', 'date'

  ];

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Convert to desired format and ensure headers match
      const formattedData = jsonData.map((row: any, index: number) => {

        const rowData: any = {};
        headers.forEach((header, headerIndex) => {
          rowData[header] = row[headerIndex] || ''; // Default to empty string if value is missing
        });
        rowData.labelId = index; // Assign a unique id based on the index
        return rowData;
      });


      updatePromotions(formattedData);
      setRows(formattedData); // Update rows with the formatted data
    };
    reader.readAsBinaryString(file);
  };


  const updatePromotions = async (formattedData: any) => {
    setIsLoading(true);
    try {



      let data = {
        "canUpdateDuplicates": true,
        "item_details": formattedData
      }
      const promotionResponse = await uploadPromotionList(data);
      if (promotionResponse.status === 200 || promotionResponse.status === 201) {
        setRows(promotionResponse.data.data.updated_label_details);
      } else {
        console.error(promotionResponse.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const createExcelWithHeaders = () => {
    // Define headings
    const headers = [
      { header: 'Barcode', key: 'barcode' },
      { header: 'Brand', key: 'brand' },
      { header: 'Unit of Measure', key: 'uom' },
      { header: 'Size', key: 'size' },
      { header: 'Item Name', key: 'itemName' },
      { header: 'Translated Name', key: 'translatedName' },
      { header: 'Ingredients', key: 'ingredients' },
      { header: 'Translated Ingredients', key: 'translatedIngredients' },
      { header: 'Allergic Details', key: 'allergicDetails' },
      { header: 'Translated Allergic Details', key: 'translatedAllergicDetails' },
      { header: 'Status', key: 'status' },
      { header: 'Price', key: 'price' }
    ];

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers.map(h => h.key) });

    // Add the headers to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.header)], { origin: 'A1' });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Promotions');

    // Generate buffer and create an XLSX file
    XLSX.writeFile(workbook, 'PromotionList.xlsx');
  };


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
      }
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      editable: false,
      renderCell: (params) => {
        //  const imageUrlWithNoCache = `${imageUrl}${params.row.image}?${new Date().getTime()}`; // Append timestamp
        const imageUrlWithNoCache = `${imageUrl}${params.row.barcode}.webp`; // Append timestamp
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
    { field: 'barcode', headerName: 'Barcode', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'uom', headerName: 'Unit of Measure', flex: 1 },
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'itemName', headerName: 'Item Name', flex: 2 },
    // { field: 'translatedName', headerName: 'Translated Name', flex: 1 },
    // { field: 'ingredients', headerName: 'Ingredients', flex: 1 },
    // { field: 'translatedIngredients', headerName: 'Translated Ingredients', flex: 1 },
    // { field: 'allergicDetails', headerName: 'Allergic Details', flex: 1 },
    // { field: 'translatedAllergicDetails', headerName: 'Translated Allergic Details', flex: 1 },
    // { field: 'status', headerName: 'Status', flex: 1, type: 'boolean' },
    { field: 'price', headerName: 'Price', flex: 1, },

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
  const [showBarcodeButton, setShowBarcodeButton] = useState(false);

  const toggleSwitchBarcode = () => {
    setShowBarcodeButton(!showBarcodeButton);
    setReloadFrame(false)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setReloadFrame(true)
    }, 1000);

  };


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
          <body class="">
            <div class="container mx-auto">
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
                <label className="flex items-center cursor-pointer">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                  <span className="btn-cyan">
                    Upload Promotion Excel
                  </span>
                </label>
                <Button className="btn-cyan" onClick={CreatePdfFile}>
                  Create Pdf File
                </Button>
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
              </div>

              {/* Right side button */}
              <Button className="btn-cyan" onClick={createExcelWithHeaders}>
                Download Excel Template
              </Button>
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
                  style={{ height: 650, width: '100%' }}
                  rowHeight={35}
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.labelId}
                  pagination
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 15, page: 0 },
                    },
                  }}
                  pageSizeOptions={[15, 25, 50]}
                  slots={{ toolbar: GridToolbar }}
                />
              </ThemeProvider>
            )}
          </CardContent>


        </Card>


        <Card className="card-one mt-2">
          <CardTitle title="Uploaded Excel" />
          <div className="ml-auto">
            <CardContent className="w-9/12 ">
              {reloadFrame && <div> <iframe className="bg-white" id="theFrame" name="theFrame"></iframe>
                <HtmlToPdf data={rows} barcode={showBarcodeButton} /></div>}
            </CardContent>
          </div>

        </Card>
      </div>
    </div>
  );
};

export default CreatePromotion;
