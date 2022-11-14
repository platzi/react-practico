import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MaterialTable from "material-table";
import Link from "@mui/material/Link";
import { useAuth } from "@redux/Auth";
import { useJobs, IJobsItem } from "@redux/Jobs";
import { useResumePay, IResumePay } from "@redux/ResumePay";
import { useCities, ICitiesItem } from "@redux/Cities";
import { useResumePayData } from "@redux/ResumePayData";
import { useContractor } from "@redux/Contractor";
import {
  useConstructionSite,
  IConstructionSiteItem,
} from "@redux/ConstructionSite";
import { useResident, IResidentItem } from "@redux/Resident";

interface IResumePayDataTable {
  data: IResumePay;
}
const options = [
  {id: 0, value: false, name: "Falta" },
  {id: 1, value: true, name: "Asistencia" },
  {id: 2, value: null, name: "Permiso" },
  {id: 3, value: null, name: "Incapacidad" },
  {id: 4, value: null, name: "Permiso" },
]
export default function CheckerList() {
  const { useState } = React;
  const { user } = useAuth();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const { resumePayData, ListResumePayDataRedux } = useResumePayData();
  const { checkerContractor, GetContractorRedux } = useContractor();
  const { resumePay, ListResumePayRedux } = useResumePay();
  const { constructionSite, ListConstructionSiteRedux } = useConstructionSite();
  const { resident, ListResidentRedux } = useResident();
  const [viewTable, setViewTable] = useState("");
  const [columnsResumenPay, setColumnsResumePay] = useState<any>([
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
            <Button
              variant="contained"
              endIcon={<FileOpenIcon />}
              onClick={() => {
                handleGetAsistencia(rowData.id);
              }}
            >
              Asistencia
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              variant="contained"
              endIcon={<FileOpenIcon />}
              onClick={() => {
                handleGetListPay(rowData.id);
              }}
            >
              Lista De Pago
            </Button>
          </div>
        );
      },
    },
  ]);
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
      title: "Salario",
      field: "salary",
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.salary).toFixed(2)}</div>;
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
      editComponent: (props: any) => {
        const total = parseFloat(props.rowData.salary) + parseFloat(props.rowData.overtime);
        return <div>{total.toFixed(2)}</div>;
      },
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.total_pay).toFixed(2)}</div>;
      },
    },
    {
      title: "Deposito",
      field: "deposit",
      editComponent: (props: any) => {
        const total = parseFloat(props.rowData.salary) + parseFloat(props.rowData.overtime);
        const deposit = (total - parseFloat(props.rowData.infonavit) - parseFloat(props.rowData.fonacot));
        return <div>{deposit.toFixed(2)}</div>;
      },
      render: (rowData: any) => {
        return <div>{parseFloat(rowData.deposit).toFixed(2)}</div>;
      },
    },
  ]);
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

  const handleGetAsistencia = async (id: number) => {
    await ListResumePayDataRedux(id);
    setViewTable("asistencia");
  };

  const handleGetListPay = async (id: number) => {
    await ListResumePayDataRedux(id);
    setViewTable("listPay");
  };

  const handleChargerData = async () => {
    await GetContractorRedux(user?.id_contractor);
    await ListJobsRedux(checkerContractor?.id_business);
    await ListCitiesRedux(checkerContractor?.id_business);
    await ListConstructionSiteRedux(checkerContractor?.id_business);
    await ListResidentRedux(checkerContractor?.id_business);
    await ListResumePayRedux(user?.id_contractor);
    setViewTable("resumePay");
  };

  useEffect(() => {
    handleChargerData();
  }, []);

  return (
    <>
      <Paper>
        {viewTable === "resumePay" && (
          <MaterialTable
            title={`Lista de resumen de pago`}
            columns={columnsResumenPay}
            data={resumePay}
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
          />
        )}

        {viewTable === "asistencia" && (
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
        )}

        {viewTable === "listPay" && (
          <MaterialTable
            title={`Lista De Pago`}
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
        )}
      </Paper>
    </>
  );
}
