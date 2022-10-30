import React, { useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@styles/CreateContractor.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "@redux/Auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 330,
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  elevation: 24,
};

interface ICreateChecker {
  close: any;
  open: any;
  setOpen: any;
}

export default function AddChecker({
  close,
  open,
  setOpen,
}: ICreateChecker): JSX.Element {
  const { user } = useAuth();

  const form = useRef(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
            <AccountCircleIcon className="label" /> Agregar Checadora
          </h4>
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre Completo"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo :</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo Electronico"
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
