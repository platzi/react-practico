import React, { useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@styles/CreateContractor.scss";
import MapIcon from '@mui/icons-material/Map';
import BusinessIcon from "@material-ui/icons/Business";
import { useAuth } from "@redux/Auth";
import { useAviato } from "@redux/Aviato";
import { useCities } from '@redux/Cities';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 230,
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  elevation: 24,
};

interface ICreateContractor {
  close: any;
  open: any;
  setOpen: any;
}

export default function AddEstado({
  close,
  open,
  setOpen,
}: ICreateContractor): JSX.Element {
  const { user } = useAuth();
  const { business } = useAviato();
  const { newCities, CreateCitiesRedux, ListCitiesRedux }= useCities();
  const form = useRef(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const payload = {
        name: formData.get("name"),
        id_business: business?.id, 
        id_user: user.id,
      };
      await CreateCitiesRedux(payload);
      if (newCities) {
        ListCitiesRedux(business.id);
        toast.success("Estado Agregado Correctamente.");
        close();
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="modal-title">
            <MapIcon className="label" /> Agregar Estado
          </h4>
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre del estado :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre del estado"
              />
            </Form.Group>
          </Form>
          <div className="modalContractorFooter">
            <Button
              variant="danger"
              onClick={() => {
                close();
              }}
            >
              Cancelar
            </Button>{" "}
            <Button variant="primary" onClick={handleSubmit}>
              Guardar
            </Button>{" "}
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}
