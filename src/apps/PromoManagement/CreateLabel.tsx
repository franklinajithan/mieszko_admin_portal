import React, { useEffect, useState } from "react";
import HeaderComponents from "@/components/elements/HeaderSection";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import CardTitle from "@/components/elements/CardTitle";
import { GridActionsCellItem, DataGrid, GridColDef, GridRowModesModel, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/elements/GridTheme';
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "@/components/ui/button";
import { RotatingSquaresLoader } from "@/components/elements/SquaresLoader";
import { Tooltip } from "@mui/material";
import IOSSwitch from "@/components/elements/toggleTheme";

const CreateLabel = ({ title, icon }: any) => {
  const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [showBarcodeButton, setShowBarcodeButton] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [imageUrl, setImageUrl] = useState<any>('http://192.168.128.126:5000/api/img/');

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === 'edit';
        return isInEditMode ? [
          <GridActionsCellItem icon={<SaveIcon />} label="Save" />,
        ] : [
          <GridActionsCellItem icon={<UploadIcon fontSize="small" />} label="Upload" />,
        ];
      }
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => {
        const imageUrlWithNoCache = `${imageUrl}${params.row.pluCode}.webp`;
        return (
          <Tooltip title={<img src={imageUrlWithNoCache} alt="Enlarged Product" className="w-70 h-auto max-w-xs object-contain" />} arrow placement="top">
            <img src={imageUrlWithNoCache} alt="Product" className="w-30 h-auto object-contain" />
          </Tooltip>
        );
      },
    },
    { field: 'Plu Code', headerName: 'pluCode', flex: 1 },
    { field: 'brand', headerName: 'name', flex: 2 },
    { field: 'price', headerName: 'Price', flex: 1 },
  ];

  const createExcelWithHeaders = () => {
    const headers = [
      { header: 'Plu Code', key: 'pluCode' },
      { header: 'Name', key: 'name' },
      { header: 'Price', key: 'price' }
    ];
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers.map(h => h.key) });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.header)], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Promotions');
    XLSX.writeFile(workbook, 'PromotionList.xlsx');
  };

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const formattedData = jsonData.map((row: any, index: number) => ({
        ...row,
        labelId: index // Unique ID for the DataGrid
      }));

      setRows(formattedData); // Update rows with the formatted data
    };
    reader.readAsBinaryString(file); // Ensure this line is uncommented
  };

  const toggleSwitchBarcode = () => {
    setShowBarcodeButton(!showBarcodeButton);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">
        <HeaderComponents icon={icon} title={title} />
        <Card className="card-one mt-2">
          <CardTitle title="Upload Excel" />
          <CardContent>
            <div className="flex justify-between items-center mt-2 mb-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                  <span className="btn-cyan">Upload Promotion Excel</span>
                </label>
                <Button className="btn-cyan" onClick={createExcelWithHeaders}>
                  Download Excel Template
                </Button>
                <div className="btn-toggle-cyan flex items-center">
                  <span>Barcode</span>
                  <IOSSwitch checked={showBarcodeButton} onChange={toggleSwitchBarcode} className="ml-2" />
                </div>
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
                  style={{ height: 650, width: '100%' }}
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
      </div>
    </div>
  );
}

export default CreateLabel;
