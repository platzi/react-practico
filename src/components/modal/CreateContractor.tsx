import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@styles/CreateContractor.scss";
import { textFieldClasses } from "@mui/material";

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

export default function CreateContractor({
  close,
  open,
  setOpen,
}): JSX.Element {
  const form = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    console.log(formData.get("name"));
    console.log(formData.get("business"));
  };
  return (
    <Modal
      open={open}
      onClose={() => {setOpen(false);}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h4 className="modal-title">Agregar Contratista</h4>
        <Form ref={form}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre completo :</Form.Label>
            <Form.Control type="text" name="name" placeholder="Jhon Terry" />
          </Form.Group>
          <Form.Select aria-label="Selecciona una empresa" name="business">
            <option>Selecciona una empresa</option>
            <option value="1">Vidanta SA de C.V</option>
            <option value="2">CARSO SA de C.V</option>
            <option value="3">ARGO CONSTRUCTION</option>
          </Form.Select>
        </Form>
        <div className="modalContractorFooter">
        <Button variant="danger" onClick={() =>{close();}} >Cancelar</Button>{' '}
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>{' '}
        </div>
      </Box>
    </Modal>
  );
}
