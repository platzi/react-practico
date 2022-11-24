import React, { useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@styles/CreateContractor.scss";
import BusinessIcon from "@material-ui/icons/Business";
import { useAuth } from "@redux/Auth";
import { useBusiness } from "@redux/Business";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
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

export default function CreateContractor({
  close,
  open,
  setOpen,
}: ICreateContractor): JSX.Element {
  const { user } = useAuth();
  const { newBusiness, CreateBusinessRedux, ListBusinessRedux }= useBusiness();
  const form = useRef(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const payload = {
        name: formData.get("name"),
        reg_patronal: formData.get("reg_patronal"),
        rfc: formData.get("rfc"),
        id_user: user.id,
      };
      await CreateBusinessRedux(payload);
      if (newBusiness) {
        ListBusinessRedux(user.id);
        toast.success("Empresa Creada Correctamente.");
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
            <BusinessIcon className="label" /> Agregar Empresa
          </h4>
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de la empresa :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Business Corp"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Regimen Patronal :</Form.Label>
              <Form.Control
                type="text"
                name="reg_patronal"
                placeholder="XXXXXXXX-XX-X"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>RFC :</Form.Label>
              <Form.Control
                type="text"
                name="rfc"
                placeholder="XXXXXXXXXXXXX"
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
    </>
  );
}
