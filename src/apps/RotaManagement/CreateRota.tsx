import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import MultiDateField from "@/components/elements/MultiDateField";
import CardTitle from "@/components/elements/CardTitle";
import { Card } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { DataGrid, GridColDef, GridActionsCellItem, GridRowId, GridRowModes, GridRowModesModel, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/elements/GridTheme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { sample, status } from "../../data/constants";
import { CssBaseline, TextField } from "@mui/material";
import clsx from "clsx";
import { TimeEditCell } from "./TimeEditCell";

const rotaFormSchema = z.object({
  rotaTitle: z.string().min(1),
  assignedTo: z.string().min(1),
  shift: z.string().min(1),
  dates: z.array(z.date()).min(1),
});

const rows = [
  {
    id: 1,
    day: "Saturday, April 26, 2025",
    in: "7:30",
    out: "15:00",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:00",
  },
  {
    id: 2,
    day: "Monday, May 5, 2025",
    in: "",
    out: "",
    rota: "HOLIDAY",
    break: "",
    payroll: "00:00",
  },
  {
    id: 3,
    day: "Friday, May 9, 2025",
    in: "",
    out: "",
    rota: "HOLIDAY",
    break: "",
    payroll: "00:00",
  },
  {
    id: 4,
    day: "Friday, May 16, 2025",
    in: "",
    out: "",
    rota: "OFF",
    break: "",
    payroll: "00:00",
  },
  {
    id: 5,
    day: "Wednesday, May 14, 2025",
    in: "7:30",
    out: "15:00",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:00",
  },
  {
    id: 6,
    day: "Sunday, May 18, 2025",
    in: "22:15",
    out: "06:15",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:30",
  },
  {
    id: 7,
    day: "Monday, May 19, 2025",
    in: "9:00",
    out: "17:30",
    rota: "TRUE",
    break: "01:00",
    payroll: "07:30",
  },
  {
    id: 8,
    day: "Tuesday, May 20, 2025",
    in: "9:15",
    out: "17:45",
    rota: "TRUE",
    break: "00:45",
    payroll: "07:45",
  },
  {
    id: 9,
    day: "Wednesday, May 21, 2025",
    in: "8:45",
    out: "17:00",
    rota: "TRUE",
    break: "00:45",
    payroll: "07:30",
  },
  {
    id: 10,
    day: "Thursday, May 22, 2025",
    in: "",
    out: "",
    rota: "OFF",
    break: "",
    payroll: "00:00",
  },
  {
    id: 11,
    day: "Friday, May 23, 2025",
    in: "7:00",
    out: "14:30",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:00",
  },
  {
    id: 12,
    day: "Saturday, May 24, 2025",
    in: "",
    out: "",
    rota: "HOLIDAY",
    break: "",
    payroll: "00:00",
  },
  {
    id: 13,
    day: "Sunday, May 25, 2025",
    in: "22:00",
    out: "06:00",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:30",
  },
  {
    id: 14,
    day: "Monday, May 26, 2025",
    in: "7:30",
    out: "15:00",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:00",
  },
  {
    id: 15,
    day: "Tuesday, May 27, 2025",
    in: "7:45",
    out: "15:15",
    rota: "TRUE",
    break: "00:30",
    payroll: "07:00",
  },
];

const CreateRota = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenGrid, setIsOpenGrid] = useState(true);
  // const [rows, setRows] = useState<any[]>([]);

  const toggleCardBody = () => {
    setIsOpenGrid(!isOpenGrid);
  };

  const form = useForm<z.infer<typeof rotaFormSchema>>({
    resolver: zodResolver(rotaFormSchema),
    defaultValues: {
      rotaTitle: "",
      assignedTo: "",
      shift: "",
      dates: [],
    },
  });

  const onSubmit = (data: any) => {
    const newRow = {
      id: rows.length + 1,
      ...data,
      dates: data.dates.map((d: Date) => d.toLocaleDateString()).join(", "),
    };
    //  setRows([...rows, newRow]);
    form.reset();
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    //   setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // const columns: GridColDef[] = [
  //   {
  //     field: "actions",
  //     type: "actions",
  //     headerName: "Actions",
  //     width: 100,
  //     getActions: ({ id }) => {
  //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  //       if (isInEditMode) {
  //         return [<GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />, <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />];
  //       }
  //       return [<GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />, <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />];
  //     },
  //   },
  //   { field: "rotaTitle", headerName: "Rota Title", flex: 1 },
  //   { field: "assignedTo", headerName: "Assigned To", flex: 1 },
  //   { field: "shift", headerName: "Shift", flex: 1 },
  //   { field: "dates", headerName: "Dates", flex: 1 },
  // ];

  function calculatePayroll(inTime?: string, outTime?: string, breakTime?: string): string {
    if (!inTime || !outTime) return "00:00";

    const [inH, inM] = inTime.split(":").map(Number);
    const [outH, outM] = outTime.split(":").map(Number);
    const [brH = 0, brM = 0] = breakTime ? breakTime.split(":").map(Number) : [0, 0];

    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;
    const breakMinutes = brH * 60 + brM;

    let total = outMinutes - inMinutes - breakMinutes;
    if (total < 0) total += 24 * 60;

    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  type RotaRow = {
    id: number;
    day: string;
    in: string;
    out: string;
    rota: string;
    break: string;
    payroll?: string;
  };

  const formatTime = (value?: string): string => {
    if (!value) return "";
    const [h, m] = value.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "day", headerName: "DAY", flex: 1, minWidth: 200 },
    {
      field: "in",
      headerName: "IN",
      editable: true,
      // width: 110,
      renderEditCell: (params) => (
        <>
          {/* <TextField
          type="time"
          size="small"
          value={formatTime(params.value || "")}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: "in",
              value: e.target.value,
            })
          }
          inputProps={{ step: 300 }} // 5-minute interval
        /> */}
        </>
      ),
    },
    {
      field: "out",
      headerName: "OUT",
      editable: true,
      //width: 110,
      renderEditCell: (params) => (
        <>
          {/* <TextField
          type="time"
          size="small"
          value={formatTime(params.value || "")}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: "out",
              value: e.target.value,
            })
          }
          inputProps={{ step: 300 }} // 5-minute interval
        /> */}
        </>
      ),
    },
    {
      field: "rota",
      headerName: "ROTA",
      width: 100,
      renderCell: (params) => (
        <span
          className={clsx("font-semibold", {
            "text-green-600": params.value === "TRUE",
            "text-red-500": params.value === "FALSE",
            "text-purple-600": params.value === "HOLIDAY",
          })}
        >
          {params.value}
        </span>
      ),
    },
    { field: "break", headerName: "BREAK", width: 100, editable: true },
    {
      field: "payroll",
      headerName: "PAYROLL HOURS",
      width: 150,
      valueGetter: (params: any) => {
        const row = params;
        if (!row) return "00:00"; // default if row is undefined

        const { in: inTime, out: outTime, break: breakTime } = row;
        return calculatePayroll(inTime, outTime, breakTime);
      },
      renderCell: (params) => <span className="font-bold text-orange-500">{params.value}</span>,
    },
  ];

  return (
    <React.Fragment>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title || "Create Rota"} />

          <Card className="card-one mt-2">
            <CardTitle title="Rota Details" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
                    <SelectField control={form.control} label="Emplyee Name" name="companyName" options={sample} />
                    <SelectField control={form.control} label="Start Date" name="startDate" options={sample} />
                    <SelectField control={form.control} label="End Date" name="endDate" options={status} />
                    <SelectField control={form.control} label="Owner Name" name="ownerName" options={sample} />
                    <SelectField control={form.control} label="Postcode" name="postcode" options={sample} />
                    <SelectField control={form.control} label="City" name="city" options={sample} />
                    {/* <SelectField control={form.control} label="Country" name="country" options={countries} /> */}
                    <SelectField control={form.control} label="Tax Number" name="taxNo" options={sample} />
                    {/* <InputField control={form.control} label="Email" name="email" type="email" />
                    <InputField control={form.control} label="Phone" name="phone" type="text" />
                    <InputField control={form.control} label="Website" name="website" type="url" /> */}
                  </div>

                  <hr className="border-t border-zinc-300 my-4" />

                  <div className="flex justify-end space-x-4">
                    <button type="button" className="btn-zinc" onClick={() => form.reset()}>
                      Clear
                    </button>
                    <Button type="submit" disabled={isLoading} className="btn-cyan">
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                        </>
                      ) : (
                        "Create Rota"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Form>
          </Card>

          <Card className="card-one mt-4">
            <CardTitle title="Rota List" onToggle={toggleCardBody} isOpen={isOpenGrid} />
            {isOpenGrid && (
              <CardContent>
                <div className="w-full mt-3">
                  <ThemeProvider theme={theme}>
                    {/* <CssBaseline /> */}
                    <div className="  w-full bg-white rounded-xl shadow-md">
                      <DataGrid rows={rows} columns={columns} />
                    </div>
                  </ThemeProvider>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRota;
