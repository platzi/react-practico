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
export default function CheckerList({ setViewTable }: any) {
  const { useState } = React;
  const { user } = useAuth();
  const { jobs, ListJobsRedux } = useJobs();
  const { cities, ListCitiesRedux } = useCities();
  const { resumePayData, ListResumePayDataRedux } = useResumePayData();
  const { checkerContractor, GetContractorRedux } = useContractor();
  const { resumePay, ListResumePayRedux } = useResumePay();
  const { constructionSite, ListConstructionSiteRedux } = useConstructionSite();
  const { ListResidentRedux } = useResident();
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
        const total =
          parseFloat(props.rowData.salary) + parseFloat(props.rowData.overtime);
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
        const total =
          parseFloat(props.rowData.salary) + parseFloat(props.rowData.overtime);
        const deposit =
          total -
          parseFloat(props.rowData.infonavit) -
          parseFloat(props.rowData.fonacot);
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
    <div>
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
    </div>
  );
}
