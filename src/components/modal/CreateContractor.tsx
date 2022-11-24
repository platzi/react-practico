import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@styles/CreateBusiness.scss";
import { useAuth } from "@redux/Auth";
import { useBusiness } from "@redux/Business";
import { useContractor } from "@redux/Contractor";
import { ToastContainer, toast } from "react-toastify";

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
}: any): JSX.Element {
  const form = useRef(null);
  const { user } = useAuth();
  const { business, ListBusinessRedux }= useBusiness();
  const { newContractor, CreateContractorRedux, ListContractorRedux } = useContractor();
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const payload = {
        name: formData.get("name"),
        rfc: formData.get("rfc"),
        id_business: formData.get("id_business"),
        id_user: user.id,
      };
      await CreateContractorRedux(payload);
      if (newContractor) {
        ListContractorRedux(user.id);
        toast.success("Contratista Creado Correctamente.");
        close();
      }
    }
  };
  
  const GetReduxContractor = async () => {
    await ListBusinessRedux(user.id);
  };

  useEffect(() => {
    GetReduxContractor();
  }, []);

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
        <h4 className="modal-title">Agregar Contratista</h4>
        <Form ref={form}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre completo :</Form.Label>
            <Form.Control type="text" name="name" placeholder="Jhon Terry" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>RFC :</Form.Label>
            <Form.Control type="text" name="rfc" placeholder="XXXXXXXXXXXXXXXX" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Empresa :</Form.Label>
          <Form.Select aria-label="Selecciona una empresa" name="id_business">
            <option>Selecciona una empresa</option>
            {business.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
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
