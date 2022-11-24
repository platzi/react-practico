import React, { useEffect } from "react";
import ResumePay from "./ResumePay";
import ListPay from "./ListPay";
import ListAttendance from "./ListAttendance";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function CheckerList() {
  const { useState } = React;
  const [viewTable, setViewTable] = useState("resumePay");
  useEffect(() => {
    console.log("viewTable", viewTable);
  }, [viewTable]);
  return (
    <div>
      <Stack direction="row" alignItems="left" spacing={2}>
        <IconButton
          color="primary"
          aria-label="home"
          component="label"
          onClick={() => {
            setViewTable("resumePay");
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      {viewTable === "resumePay" && <ResumePay setViewTable={setViewTable} />}
      {viewTable === "listPay" && <ListPay />}
      {viewTable === "asistencia" && (
        <ListAttendance />
      )}
    </div>
  );
}
