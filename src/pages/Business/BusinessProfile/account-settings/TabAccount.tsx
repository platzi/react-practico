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
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddEstado from "@components/modal/AddEstado";
import { useAviato } from "@redux/Aviato";
import { useBusiness } from "@redux/Business";
import { useCities, ICitiesItem } from "@redux/Cities";

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
  const { businessSelected } = useAviato();
  const { deleteCities, cities, ListCitiesRedux, DeleteCitiesRedux } =
    useCities();
  const { updateBusiness, UpdateBusinessRedux } = useBusiness();
  const [businessProfile, setBusinessProfile] = useState<ICitiesItem>();
  const [open, setOpen] = useState(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ** Function to handle set business state on change of input value
  const handleInputChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setBusinessProfile({ ...businessProfile, [name]: value });
  };

  // Function to handle form submit delete cities
  const handleDeleteCities = async (id: number) => {
    await DeleteCitiesRedux(id);
    if (deleteCities) {
      ListCitiesRedux(businessSelected.id);
      toast.success("Estado Eliminado Correctamente.");
    }
  };

  //Create fuction to handle form submit update cities
  const handleSubmitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      name: businessProfile?.name,
      reg_patronal: businessProfile?.reg_patronal,
      rfc: businessProfile?.rfc,
    };
    await UpdateBusinessRedux(businessProfile?.id, payload).then(async() => {
      await ListCitiesRedux(businessSelected.id);
      toast.success("Empresa Actualizada Correctamente.");
    });
  };

  useEffect(() => {
    if (businessSelected) {
      ListCitiesRedux(businessSelected.id);
      setBusinessProfile(businessSelected);
    }
  }, [businessSelected]);

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
                placeholder={businessProfile?.name}
                defaultValue={businessProfile?.name}
                value={businessProfile?.name || ""}
                name="name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                color="secondary"
                fullWidth
                label="Regimen Patronal"
                placeholder={businessProfile?.reg_patronal}
                defaultValue={businessProfile?.reg_patronal}
                value={businessProfile?.reg_patronal || ""}
                name="reg_patronal"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                color="secondary"
                fullWidth
                label="RFC"
                placeholder={businessProfile?.rfc}
                defaultValue={businessProfile?.rfc}
                value={businessProfile?.rfc || ""}
                name="rfc"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                component="h2"
                style={{ marginBottom: "5px", marginTop: "-15px" }}
              >
                Estados
              </Typography>
              <Box
                component="span"
                sx={{
                  p: 2,
                  border: "1px dashed grey",
                  display: "inline-block",
                }}
              >
                {cities?.map((city: ICitiesItem) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      color: "#FFF",
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                    onClick={() => handleDeleteCities(city.id)}
                  >
                    {city.name}
                    <RemoveIcon></RemoveIcon>
                  </Button>
                ))}
                <Button
                  variant="contained"
                  color="success"
                  style={{ color: "#FFF" }}
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  Agregar Estado <AddIcon></AddIcon>
                </Button>
              </Box>
              <AddEstado close={handleClose} open={open} setOpen={setOpen} />
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
