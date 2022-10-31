import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import { replaceAll } from "@helpers/Convert";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useJobs, IJobsItem } from "@redux/Jobs";
import { useEmploye, INewEmploye } from "@redux/Employe";
import { useCities, ICitiesItem } from "@redux/Cities";
export default function Employes() {
  const { useState } = React;
  const { contractor } = useAviato();
  const { user } = useAuth();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const {
    employe,
    ListEmployeRedux,
    CreateEmployeRedux,
    UpdateEmployeRedux,
    DeleteEmployeRedux,
  } = useEmploye();
  const [columns, setColumns] = useState<any>([
    { title: "#", field: "id", editable: "offUpdate" },
    {
      title: "Estado",
      field: "id_city",
      lookup: cities.reduce((acc: any, item: ICitiesItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    { title: "Code", field: "code", initialEditValue: "codigo" },
    { title: "Nombre", field: "name", initialEditValue: "nombre" },
    {
      title: "Puesto",
      field: "id_job",
      lookup: jobs.reduce((acc: any, item: IJobsItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "INFONAVIT",
      field: "infonavit",
      initialEditValue: "0",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.infonavit).toFixed(2)}</div>;
      },
    },
    {
      title: "FONACOT",
      field: "fonacot",
      initialEditValue: "0",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.fonacot).toFixed(2)}</div>;
      },
    },
  ]);
  const handleCreateEmploye = async (newEmploye: INewEmploye) => {
    const payload = {
      id_city: +newEmploye.id_city,
      code: newEmploye.code,
      name: newEmploye.name,
      id_job: newEmploye.id_job,
      infonavit: parseFloat(replaceAll(newEmploye.infonavit, ",", "")).toFixed(
        2
      ),
      fonacot: parseFloat(replaceAll(newEmploye.fonacot, ",", "")).toFixed(2),
      id_contractor: contractor.id,
      id_user: user.id,
    };
    await CreateEmployeRedux(payload).then((res: any) => {
      toast.success("Se ha creado el empleado correctamente");
    });
    await ListEmployeRedux(contractor.id);
  };

  useEffect(() => {
    ListEmployeRedux(contractor.id);
  }, []);

  return (
    <Paper>
      <MaterialTable
        title="Lista De Trabajadores"
        columns={columns}
        data={employe}
        localization={{
          body: {
            editRow: { deleteText: "Estas seguro de eliminar al empleado ?" },
          },
        }}
        options={{
          headerStyle: {
            backgroundColor: "rgb(32, 201, 151)",
            color: "#FFF",
          },
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreateEmploye(newData);
                resolve(employe);
              }, 1000);
            }),
          onRowUpdate: (newData: any, oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                const payload = {
                  id_city: +newData.id_city,
                  code: newData.code,
                  name: newData.name,
                  id_job: newData.id_job,
                  infonavit: parseFloat(
                    replaceAll(newData.infonavit, ",", "")
                  ).toFixed(2),
                  fonacot: parseFloat(
                    replaceAll(newData.fonacot, ",", "")
                  ).toFixed(2),
                };
                await UpdateEmployeRedux(oldData?.id, payload).then(() => {
                  toast.success("El Trabajador se ha actualizado correctamente");
                }).catch(() => {
                  toast.error("Se produjo un error intenta de nuevo");
                });
                await ListEmployeRedux(contractor.id);
                resolve(employe);
              }, 1000);
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await DeleteEmployeRedux(oldData.id).then(() => {
                  toast.success("El Trabajador se ha eliminado correctamente");
                }).catch(() => {
                  toast.error("Se produjo un error intenta de nuevo");
                });;
                await ListEmployeRedux(contractor.id);
                resolve(employe);
              }, 1000);
            }),
        }}
      />
      <ToastContainer />
    </Paper>
  );
}
