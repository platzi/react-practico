import React, { useEffect } from "react";
import { Button } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MaterialTable from "material-table";
import { useAuth } from "@redux/Auth";
import { useJobs, IJobsItem } from "@redux/Jobs";
import { useResumePay } from "@redux/ResumePay";
import { useCities, ICitiesItem } from "@redux/Cities";
import { useResumePayData } from "@redux/ResumePayData";
import { useContractor } from "@redux/Contractor";
import {
  useConstructionSite,
  IConstructionSiteItem,
} from "@redux/ConstructionSite";
import { useResident } from "@redux/Resident";

const options = [
  { id: 0, value: "falta", name: "Falta" },
  { id: 1, value: "asistencia", name: "Asistencia" },
  { id: 2, value: "permiso", name: "Permiso" },
  { id: 3, value: "incapacidad", name: "Incapacidad" },
];
export default function ListPay() {
  const { useState } = React;
  const { user } = useAuth();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const { resumePayData, ListResumePayDataRedux } = useResumePayData();
  const { checkerContractor, GetContractorRedux } = useContractor();
  const { resumePay, ListResumePayRedux } = useResumePay();
  const { constructionSite, ListConstructionSiteRedux } = useConstructionSite();
  const { ListResidentRedux } = useResident();
  const [columnsAsistencia, setColumnsAsistencia] = useState<any>([
    { title: "#", field: "id" },
    {
      title: "Estado",
      field: "id_city",
      lookup: cities.reduce((acc: ICitiesItem, item: ICitiesItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    { title: "Code", field: "code" },
    { title: "Nombre", field: "name" },
    {
      title: "Puesto",
      field: "id_job",
      lookup: jobs.reduce((acc: IJobsItem, item: IJobsItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "Obra",
      field: "id_construction_site",
      lookup: constructionSite.reduce(
        (acc: IConstructionSiteItem, item: IConstructionSiteItem) => {
          acc[item.id] = item.name;
          return acc;
        },
        {}
      ),
    },
    {
      title: "L",
      field: "lunes",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "M",
      field: "Martes",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "M",
      field: "Miercoles",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "J",
      field: "Jueves",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "V",
      field: "Viernes",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "S",
      field: "Sabado",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "D",
      field: "Domingo",
      lookup: options.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
  ]);

  const handleChargerData = async () => {
    await GetContractorRedux(user?.id_contractor);
    await ListJobsRedux(checkerContractor?.id_business);
    await ListCitiesRedux(checkerContractor?.id_business);
    await ListConstructionSiteRedux(checkerContractor?.id_business);
    await ListResidentRedux(checkerContractor?.id_business);
    await ListResumePayRedux(user?.id_contractor);
  };

  useEffect(() => {
    handleChargerData();
  }, []);

  return (
    <div>
      <MaterialTable
        title={`Lista De Asistencia`}
        columns={columnsAsistencia}
        data={resumePayData}
        localization={{
          toolbar: {
            searchPlaceholder: "Buscar",
            searchTooltip: "Buscar empleado",
          },
          header: {
            actions: "Acciones",
          },
          body: {
            editRow: {
              deleteText: "Estas seguro de eliminar el resumen ?",
            },
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
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(changes);
                resolve(resumePayData);
              }, 1000);
            }),
        }}
      />
    </div>
  );
}
