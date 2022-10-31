import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useResident, INewResident } from "@redux/Resident";

export default function Resident() {
  const { useState } = React;
  const { business } = useAviato();
  const { user } = useAuth();
  const { resident, ListResidentRedux, CreateResidentRedux, UpdateResidentRedux, DeleteResidentRedux } =
    useResident();
  const [columns, setColumns] = useState([
    { title: "#", field: "id", editable: "onUpdate" },
    { title: "Nombre", field: "name", initialEditValue: "nombre del residente" },
  ]);
  const handleCreateResident = async (newJob: INewResident) => {
    const payload = {
      name: newJob.name,
      id_business: business.id,
      id_user: user.id,
    };
    await CreateResidentRedux(payload).then((res: any) => {
      toast.success("Se ha creado el residente correctamente");
    });
    await ListResidentRedux(business.id);
  };

  useEffect(() => {
    ListResidentRedux(business.id);
  }, []);

  return (
    <Paper sx={{ maxWidth: 1600, margin: "auto", overflow: "hidden" }}>
      <MaterialTable
        title="Residentes"
        columns={columns}
        data={resident}
        localization={{ body: { editRow: { deleteText: 'Estas seguro de eliminar al residente ?' } } }}
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
                handleCreateResident(newData);
                resolve(resident);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await UpdateResidentRedux(oldData?.id, newData);
                await ListResidentRedux(business.id);
                resolve(resident);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await DeleteResidentRedux(oldData.id);
                await ListResidentRedux(business.id);
                resolve(resident);
              }, 1000);
            }),
        }}
      />
      <ToastContainer />
    </Paper>
  );
}
