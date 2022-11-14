import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import MaterialTable from "material-table";
import ResumePayData from "./ResumePayData";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useResumePay, INewResumePay, IResumePay } from "@redux/ResumePay";


export default function ResumePay() {
  const { useState } = React;
  const { contractorSelected } = useAviato();
  const { user } = useAuth();
  const {
    resumePay,
    ListResumePayRedux,
    CreateResumePayRedux,
    UpdateResumePayRedux,
    DeleteResumePayRedux,
  } = useResumePay();
  const [viewResumePay, setViewResumePay] = useState(true);
  const [resumePayItem, setNewResumePay] = useState<IResumePay>();
  const [columns, setColumns] = useState<any>([
    { title: "#", field: "id", editable: "offUpdate" },
    {
      title: "Dia De Pago",
      field: "period",
      type: "date",
    },
    { title: "Nombre", field: "name", initialEditValue: "nombre" },
    {
      title: "Resumen",
      field: "id_contractor",
      editable: "offUpdate",
      render: (rowData: any) => {
        return (
          <div>
            <Button variant="contained" endIcon={<FileOpenIcon />} onClick={() =>{ handleSetResumePayData(rowData)}}>
              Abrir
            </Button>
          </div>
        );
      },
    },
  ]);

  const handleSetResumePayData = (rowData: IResumePay) => {
    setNewResumePay(rowData);
    setViewResumePay(false);
  };
  const handleCreateResumePay = async (newResumePay: INewResumePay) => {
    const payload = {
      name: newResumePay.name,
      period: newResumePay.period,
      id_contractor: contractorSelected.id,
      id_user: user.id,
    };
    await CreateResumePayRedux(payload).then((res: any) => {
      toast.success("Se ha creado el resumen correctamente");
    });
    await ListResumePayRedux(contractorSelected.id);
  };

  useEffect(() => {
    ListResumePayRedux(contractorSelected.id);
  }, []);

  return (
    <Paper sx={{ maxWidth: 1600, margin: "auto", overflow: "hidden" }}>
      {viewResumePay ? (
      <MaterialTable
        title="Lista De Resumen De Pagos"
        columns={columns}
        data={resumePay}
        localization={{
          toolbar: {
            searchPlaceholder: "Buscar",
            searchTooltip: "Buscar Resumen De Pago",
          },
          header: {
            actions: "Acciones",
          },
          body: {
            editRow: { deleteText: "Estas seguro de eliminar el resumen ?" },
          },
        }}
        options={{
          headerStyle: {
            backgroundColor: "rgb(32, 201, 151)",
            color: "#FFF",
          },
          actionsColumnIndex: -1,
          showFirstLastPageButtons: true,
          pageSize: 5,
          pageSizeOptions: [5, 20, 50],
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreateResumePay(newData);
                resolve(resumePay);
              }, 1000);
            }),
          onRowUpdate: (newData: IResumePay, oldData: IResumePay) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                const payload = {
                  period: newData.period,
                  name: newData.name,
                };
                await UpdateResumePayRedux(oldData?.id, payload)
                  .then(() => {
                    toast.success("El resumen se ha actualizado correctamente");
                  })
                  .catch(() => {
                    toast.error("Se produjo un error intenta de nuevo");
                  });
                await ListResumePayRedux(contractorSelected.id);
                resolve(resumePay);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await DeleteResumePayRedux(oldData.id)
                  .then(() => {
                    toast.success(
                      "El Trabajador se ha eliminado correctamente"
                    );
                  })
                  .catch(() => {
                    toast.error("Se produjo un error intenta de nuevo");
                  });
                await ListResumePayRedux(contractorSelected.id);
                resolve(resumePay);
              }, 1000);
            }),
        }}
      />
      ) : <ResumePayData data={resumePayItem}/>}
    </Paper>
  );
}
