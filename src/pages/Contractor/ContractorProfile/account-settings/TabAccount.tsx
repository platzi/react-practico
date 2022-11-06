// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";
import { ToastContainer, toast } from "react-toastify";
// ** MUI Imports
import Form from "react-bootstrap/Form";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MaterialTable from "material-table";
import { useAuth } from "@redux/Auth";
import { useAviato } from "@redux/Aviato";
import { useContractor, IContractorItem } from "@redux/Contractor";
import { useBusiness } from "@redux/Business";


// ** Icons Imports

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  buttonRight: {
    float: "right",
  },
}));

const TabAccount = () => {
  // ** State
  const classes = useStyles();
  const { checkers, RegisterUserRedux, SendCredencialCheckerRedux, ListCheckersRedux, DeleteCheckerRedux, UpdateCheckersRedux } = useAuth();
  const { contractorSelected } = useAviato();
  const { UpdateContractorRedux } = useContractor();
  const { business } = useBusiness();
  const [contractorProfile, setContractorProfile] = useState<IContractorItem>();
  const [imgSrc, setImgSrc] = useState<string>(
    "https://image.shutterstock.com/image-photo/external-wall-insulation-energy-efficiency-600w-2126965325.jpg"
  );

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  // ** Function to handle set business state on change of input value
  const handleInputChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setContractorProfile({ ...contractorProfile, [name]: value });
  };

  //Create fuction to handle form submit update
  const handleSubmitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      name: contractorProfile?.name,
      reg_patronal: contractorProfile?.reg_patronal,
      rfc: contractorProfile?.rfc,
    };
    await UpdateContractorRedux(contractorProfile?.id, payload).then(() => {
      toast.success("Contratista Actualizado Correctamente.");
    });
  };

  useEffect(() => {
    if (contractorSelected) {
      setContractorProfile(contractorSelected);
      ListCheckersRedux(contractorSelected.id);
    }
  }, [contractorSelected]);

  return (
    <>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImgStyled src={imgSrc} alt="Profile Pic" />
                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                  >
                    Cargar una nueva foto
                    <input
                      hidden
                      type="file"
                      onChange={onChange}
                      accept="image/png, image/jpeg"
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  <Typography variant="body2" sx={{ marginTop: 5 }}>
                    Puedes cargar PNG o JPEG.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                color="secondary"
                fullWidth
                label="Name"
                placeholder={contractorProfile?.name}
                defaultValue={contractorProfile?.name}
                value={contractorProfile?.name || ""}
                name="name"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                color="secondary"
                fullWidth
                label="RFC"
                placeholder={contractorProfile?.rfc}
                defaultValue={contractorProfile?.rfc}
                value={contractorProfile?.rfc || ""}
                name="rfc"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MaterialTable
                title="Checadores"
                columns={[
                  { title: "#", field: "id" },
                  { title: "Nombre", field: "name" },
                  { title: "Correo", field: "email" },
                ]}
                data={checkers}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async() => {
                        const payload = {
                          name: newData.name,
                          email: newData.email,
                          password: "Aviato2022",
                          role: "checker",
                          id_contractor: contractorProfile?.id,
                        };
                        await RegisterUserRedux(payload).then(() => {
                          toast.success("Checador creado correctamente");
                        });
                        await SendCredencialCheckerRedux(payload.email, payload.password);
                        await ListCheckersRedux(contractorProfile?.id);
                        resolve(checkers);
                      }, 1000);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async() => {
                        await UpdateCheckersRedux(newData.id, newData).then(() => {
                          toast.success("Checador actualizado correctamente");
                        });
                        resolve(checkers);
                      }, 1000);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
                        await DeleteCheckerRedux(oldData.id);
                        toast.success("Contratista eliminado Correctamente.");
                        await ListCheckersRedux(contractorProfile?.id);
                        resolve(checkers);
                      }, 1000);
                    }),
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Select
                  aria-label="Selecciona"
                  onChange={(e) => {
                    setContractorProfile({
                      ...contractorProfile,
                      id_business: e.target.value,
                    });
                  }}
                  value={contractorProfile?.id_business}
                >
                  {business.map((item: any) => (
                    <option
                      key={item.id}
                      value={item.id}
                      defaultValue={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Grid>
          
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.buttonRight}
                variant="contained"
                color="success"
                sx={{ marginRight: 3.5 }}
                onClick={handleSubmitUpdate}
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <ToastContainer />
    </>
  );
};

export default TabAccount;
