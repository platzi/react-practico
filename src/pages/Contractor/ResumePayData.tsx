import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useJobs, IJobsItem } from "@redux/Jobs";
import { useResumePay, INewResumePay, IResumePay } from "@redux/ResumePay";
import { useCities, ICitiesItem } from "@redux/Cities";

export default function ResumePayData() {
  const { useState } = React;
  const { contractor } = useAviato();
  const { user } = useAuth();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const {
    resumePay,
    ListResumePayRedux,
    CreateResumePayRedux,
    UpdateResumePayRedux,
    DeleteResumePayRedux,
  } = useResumePay();
  const [columns, setColumns] = useState<any>([
    { title: "#", field: "id", editable: "offUpdate" },
    {
      title: "Dia De Pago",
      field: "period",
      type: "date",
      dateSetting: {
        format: "YYYY-MM-DD",
      },
    },
    { title: "Nombre", field: "name", initialEditValue: "nombre" },
    {
      title: "Resumen",
      field: "id_contractor",
      editable: "offUpdate",
      render: (rowData: any) => {
        return (
          <div>
            <Button variant="contained" endIcon={<FileOpenIcon />}>
              Abrir
            </Button>
          </div>
        );
      },
    },
  ]);
  const handleCreateResumePay = async (newResumePay: INewResumePay) => {
    const payload = {
      name: newResumePay.name,
      period: newResumePay.period,
      id_contractor: contractor.id,
      id_user: user.id,
    };
    await CreateResumePayRedux(payload).then((res: any) => {
      toast.success("Se ha creado el resumen correctamente");
    });
    await ListResumePayRedux(contractor.id);
  };

  useEffect(() => {
    ListResumePayRedux(contractor.id);
  }, []);

  return (
    <Paper sx={{ maxWidth: 1600, margin: "auto", overflow: "hidden" }}>
      <MaterialTable
        title="Bulk Edit Preview"
        columns={columns}
        data={resumePay}
        editable={{
          onBulkUpdate:selectedRows=>new Promise((resolve,reject)=>{
            const rows=Object.values(selectedRows)
            console.log("🚀 ~ file: ResumePayData.tsx ~ line 99 ~ onBulkUpdate:selectedRows=>newPromise ~ rows", rows)
           
            setTimeout(()=>{
              resolve()
            },2000)
          }),
        }}
      />
      <ToastContainer />
    </Paper>
  );
}
