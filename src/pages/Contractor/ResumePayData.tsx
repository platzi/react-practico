import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MaterialTable from "material-table";
import { useAviato } from "@redux/Aviato";
import { useAuth } from "@redux/Auth";
import { useJobs, IJobsItem } from "@redux/Jobs";
import { IResumePay } from "@redux/ResumePay";
import { useCities, ICitiesItem } from "@redux/Cities";
import {
  useResumePayData,
} from "@redux/ResumePayData";
import {
  useConstructionSite,
  IConstructionSiteItem,
} from "@redux/ConstructionSite";
import { useResident, IResidentItem } from "@redux/Resident";

interface IResumePayDataTable {
  data: IResumePay;
}
export default function ResumePayData({ data }: IResumePayDataTable) {
  const { useState } = React;
  const { contractorSelected } = useAviato();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const {
    resumePayData,
    ListResumePayDataRedux,
  } = useResumePayData();
  const { constructionSite, ListConstructionSiteRedux } = useConstructionSite();
  const { resident, ListResidentRedux } = useResident();
  const [columns, setColumns] = useState<any>([
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
      title: "Deposito",
      field: "deposit",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.deposit).toFixed(2)}</div>;
      },
    },
    {
      title: "Salario",
      field: "salary",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.salary).toFixed(2)}</div>;
      },
    },
    {
      title: "INFONAVIT",
      field: "infonavit",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.infonavit).toFixed(2)}</div>;
      },
    },
    {
      title: "FONACOT",
      field: "fonacot",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.fonacot).toFixed(2)}</div>;
      },
    },
    {
      title: "Horas Extras",
      field: "overtime",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.overtime).toFixed(2)}</div>;
      },
    },
    {
      title: "Total a pagar",
      field: "total_pay",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.total_pay).toFixed(2)}</div>;
      },
    },
    {
      title: "Faltas",
      field: "faults",
      render: (rowData: any) => {
        return <div>{rowData.faults}</div>;
      },
    },
    { title: "Comentarios", field: "comment" },
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
      title: "Resident",
      field: "id_resident",
      lookup: resident.reduce((acc: IResidentItem, item: IResidentItem) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    },
    {
      title: "Tabulador",
      field: "id_job",
      render: (rowData: any) => {
        const job = jobs.find((item: IJobsItem) => item.id === rowData.id_job);
        return <div>{parseFloat(job.salary).toFixed(2)}</div>;
      },
    },
  ]);

  const handleChargerData = async () => {
    await ListJobsRedux(contractorSelected.id_business);
    await ListCitiesRedux(contractorSelected.id_business);
    await ListConstructionSiteRedux(contractorSelected.id_business);
    await ListResidentRedux(contractorSelected.id_business);
    await ListResumePayDataRedux(data.id);
  };

  useEffect(() => {
    handleChargerData();
  }, []);

  return (
    <Paper>
      <MaterialTable
        title={`Resumen de Pago ${data.name}`}
        columns={columns}
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
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(changes);
                resolve(resumePayData);
              }, 1000);
            }),
        }}
      />
    </Paper>
  );
}
