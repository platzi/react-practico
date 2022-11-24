import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import Selected from "@components/selects/selected";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useResident, INewResident, IResidentItem } from "@redux/Resident";
import {
  useConstructionSite,
  INewConstructionSite,
} from "@redux/ConstructionSite";

export default function ConstructionSite() {
  const { useState } = React;
  const { businessSelected } = useAviato();
  const { user } = useAuth();
  const { resident, ListResidentRedux } = useResident();
  const {
    constructionSite,
    ListConstructionSiteRedux,
    CreateConstructionSiteRedux,
    UpdateConstructionSiteRedux,
    DeleteConstructionSiteRedux,
  } = useConstructionSite();
  const [columns, setColumns] = useState([
    { title: "#", field: "id", editable: "onUpdate" },
    { title: "Nombre", field: "name", initialEditValue: "nombre de la obra" },
    {
      title: "Ubicacion",
      field: "location",
      initialEditValue: "ubicacion de la obra",
    },
    {
      title: "Residente",
      field: "id_resident",
      lookup: resident.reduce((acc: any, item: IResidentItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
  ]);
  const handleCreateConstructionSite = async (
    newConstructionSite: INewConstructionSite
  ) => {
    const payload = {
      name: newConstructionSite.name,
      location: newConstructionSite.location,
      id_resident: newConstructionSite.id_resident,
      id_business: businessSelected.id,
      id_user: user.id,
    };
    await CreateConstructionSiteRedux(payload).then((res: any) => {
      toast.success("Se ha creado el puesto correctamente");
    });
    await ListConstructionSiteRedux(businessSelected.id);
  };

  const handleUpdateConstructionSite = async () => {
    await ListConstructionSiteRedux(businessSelected.id);
  };

  useEffect(() => {
    handleUpdateConstructionSite();
  }, []);

  return (
    <Paper sx={{ maxWidth: 1600, margin: "auto", overflow: "hidden" }}>
      <MaterialTable
        title="Obras"
        columns={columns}
        data={constructionSite}
        localization={{
          body: {
            editRow: { deleteText: "Estas seguro de eliminar la obra ?" },
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
                handleCreateConstructionSite(newData);
                resolve(constructionSite);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                const payload = {
                  name: newData.name,
                  location: newData.location,
                  id_resident: newData.id_resident,
                };
                await UpdateConstructionSiteRedux(oldData?.id, payload);
                await ListConstructionSiteRedux(businessSelected.id);
                resolve(constructionSite);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await DeleteConstructionSiteRedux(oldData.id);
                await ListConstructionSiteRedux(businessSelected.id);
                resolve(constructionSite);
              }, 1000);
            }),
        }}
      />
    </Paper>
  );
}
