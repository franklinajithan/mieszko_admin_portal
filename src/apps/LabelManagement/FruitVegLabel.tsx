import React, { useEffect, useState } from "react";
import HeaderComponents from "@/components/elements/HeaderSection";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import CardTitle from "@/components/elements/CardTitle";
import { GridActionsCellItem, DataGrid, GridColDef, GridRowModesModel, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import SaveIcon from "@mui/icons-material/Save";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@/components/ui/button";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";
import { Tooltip } from "@mui/material";
import IOSSwitch from "@/components/elements/toggleTheme";
import ImageProcessor from "@/components/elements/ImageProcessor";
import { UpdateLabelList, uploadLabelImage } from "@/service/promotion.service";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { imageUrl } from "@/_config";
import FruitVegCard from "@/components/elements/FruitVegCard";

const FruitVegLabel = ({ title, icon }: any) => {
  const [skin, setSkin] = useState(localStorage.getItem("skin-mode") ? "dark" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [showBarcodeButton, setShowBarcodeButton] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const imgUrl: any = imageUrl;
  const [currentRowId, setCurrentRowId] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<UploadIcon fontSize="small" />}
          label="Upload"
          onClick={handleUploadClick(id)} // Ensure this is correct
        />,
      ],
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
      renderCell: (params) => {
        // const imageUrlWithNoCache = `${imageUrl}${params.row.image}?${new Date().getTime()}`;
        const imageUrlWithNoCache = `${imageUrl}label/${params.row.image}`;
        return (
          <Tooltip title={<ImageProcessor imageUrl={imageUrlWithNoCache} maxHeight={300} maxWidth={300} backgroundWhite />} arrow placement="top" classes={{ tooltip: "bg-transparent" }}>
            <img src={imageUrlWithNoCache} alt="Product" className="w-30 h-auto object-contain" />
          </Tooltip>
        );
      },
    },
    { field: "barcode", headerName: "barcode", flex: 1 },
    { field: "itemName", headerName: "itemName", flex: 2 },
    { field: "price", headerName: "price", flex: 1 },
    { field: "uom", headerName: "uom", flex: 1 },
  ];

  const handleUploadClick = (id: any) => () => {
    setCurrentRowId(id);
    setUploadDialogOpen(true);
  };

  const createExcelWithHeaders = () => {
    const headers = [
      { header: "Barcode", key: "barcode" },
      { header: "itemName", key: "itemName" },
      { header: "Price", key: "price" },
      { header: "UOM", key: "uom" },
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers.map((h) => h.key) });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.header)], { origin: "A1" });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Promotions");
    XLSX.writeFile(workbook, "FruitVegLabel.xlsx");
  };

  const headers = ["barcode", "itemName", "price", "uom"];

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
      const formattedData = jsonData
        .map((row: any, index: number) => {
          const rowData: any = {};
          headers.forEach((header, headerIndex) => {
            rowData[header] = row[headerIndex] !== undefined ? row[headerIndex] : ""; // Default to empty string if value is missing
          });
          rowData.labelId = index; // Assign a unique id based on the index

          // Only include row if the barcode is not empty
          return rowData.barcode ? rowData : null;
        })
        .filter((row) => row !== null); // Remove null entries
      formattedData.forEach((element: any) => {
        element.image = element.barcode + ".webp";
      });
      UpdateLabels(formattedData);
      setRows(formattedData); // Update rows with the formatted data
    };
    reader.readAsBinaryString(file);
  };

  const UpdateLabels = async (formattedData: any) => {
    setIsLoading(true);
    try {
      let data = {
        canUpdateDuplicates: true,
        labelType: "2",
        storeId: "2",
        item_details: formattedData,
      };
      const result = await UpdateLabelList(data);
      if (result.status === 200 || result.status === 201) {
        result.data.data.updated_label_details.forEach((element: any) => {
          element.image = element.barcode + ".webp";
        });
        setRows(result.data.data.updated_label_details);
      } else {
        console.error(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSwitchBarcode = () => {
    setShowBarcodeButton(!showBarcodeButton);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const CreatePdfFile = () => {
    const pdfContent = document.getElementById("pdf")?.innerHTML;

    if (pdfContent) {
      const myWindow = window.open("", "theFrame");

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
      myWindow?.addEventListener("load", () => {
        myWindow.focus(); // Focus on the new window
        myWindow.print(); // Print the content
        myWindow.close(); // Close the window after printing
      });
    } else {
      console.error("No content available for PDF generation.");
    }
  };

  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debugger;
  //   updateImage(event);
  //   setUploadDialogOpen(false);
  // };

  // const updateImage = async (event: any) => {
  //   const file = event.target.files?.[0];
  //   //  setIsLoading(true);

  //   try {
  //     let getBarcode = rows.find((row: any) => row.labelId === currentRowId);

  //     const formData = new FormData();
  //     formData.append("imageName", getBarcode.barcode || "");
  //     formData.append("image", file || "");

  //     const result = await uploadLabelImage(formData);
  //     if (result.status === 200) {
  //       const timestamp = new Date().getTime(); // Generate a timestamp for cache busting
  //       const updatedRows = rows.map((row: any) =>
  //         row.labelId === currentRowId
  //           ? { ...row, image: row.image.split("?")[0] + "?" + timestamp } // Update only the specific row image URL
  //           : row
  //       );
  //       setRows(updatedRows); // Update the rows with the new image URL for the specific row
  //       //    setIsLoading(false); // Stop loading spinner after image upload
  //     } else {
  //       console.error(result.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     //   setIsLoading(false);
  //   }
  // };

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
      formData.append("id", getBarcode.barcode || "");
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

  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">
        <HeaderComponents icon={icon} title={title} />

        <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogActions>
            {/* <Button onClick={handleUpload}>Upload</Button> */}
            <Button className="btn-zinc" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <label className="flex items-center cursor-pointer">
              <input type="file" accept=".jpg, .png, .jpeg, .webp" onChange={handleUpload} className="hidden" />
              <span className="btn-cyan ">Upload Image</span>
            </label>
          </DialogActions>
        </Dialog>

        <Card className="card-one mt-2">
          <CardTitle title="Upload Excel" />
          <CardContent>
            <div className="flex justify-between items-center mt-2 mb-2">
              {/* Left side buttons */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="hidden" />
                  <span className="btn-cyan">Upload Promotion Excel</span>
                </label>
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
                  <FontAwesomeIcon icon={faPrint} className="mr-2" />
                  Print
                </Button>
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
                  style={{ height: 650, width: "100%" }}
                  rowHeight={35}
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.labelId} // Ensure this matches the unique id set in formatted data
                  pagination
                  initialState={{
                    pagination: { paginationModel: { pageSize: 15, page: 0 } },
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
              {/* {reloadFrame && */}
              <iframe className="bg-white" id="theFrame" name="theFrame"></iframe>
              <div id="pdf">
                <FruitVegCard data={rows} barcode={showBarcodeButton} />
                {/* } */}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FruitVegLabel;
