import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { alpha } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { replaceAll } from "@helpers/Convert";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useJobs, INewJobs } from "@redux/Jobs";

export default function Resident() {
  const { useState } = React;
  const { business } = useAviato();
  const { user } = useAuth();
  const { jobs, ListJobsRedux, CreateJobsRedux, UpdateJobsRedux, DeleteJobsRedux } =
    useJobs();
  const [columns, setColumns] = useState([
    { title: "#", field: "id", editable: "onUpdate" },
    { title: "Nombre", field: "name", initialEditValue: "puesto" },
    { title: "Salario", field: "salary", initialEditValue: "0", render: rowData => {
      return (
        <div>{parseFloat(rowData.salary).toFixed(2)}</div>
      )
    },},
  ]);
  const handleCreateJob = async (newJob: INewJobs) => {
    const payload = {
      name: newJob.name,
      salary: parseFloat(replaceAll(newJob.salary, ",", "")).toFixed(2),
      id_business: business.id,
      id_user: user.id,
    };
    await CreateJobsRedux(payload).then((res: any) => {
      toast.success("Se ha creado el puesto correctamente");
    });
    await ListJobsRedux(business.id);
  };

  useEffect(() => {
    ListJobsRedux(business.id);
  }, []);

  return (
    <Paper sx={{ maxWidth: 1600, margin: "auto", overflow: "hidden" }}>
      <MaterialTable
        title="Puestos"
        columns={columns}
        data={jobs}
        localization={{ body: { editRow: { deleteText: 'Estas seguro de eliminar el puesto ?' } } }}
        options={{
          headerStyle: {
            backgroundColor: "rgb(32, 201, 151)",
            color: "#FFF",
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreateJob(newData);
                resolve(jobs);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await UpdateJobsRedux(oldData?.id, newData);
                await ListJobsRedux(business.id);
                resolve(jobs);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await DeleteJobsRedux(oldData.id);
                await ListJobsRedux(business.id);
                resolve(jobs);
              }, 1000);
            }),
        }}
      />
      <ToastContainer />
    </Paper>
  );
}
