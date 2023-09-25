import React, { useEffect } from "react";
import { getPrintBookingbyId } from "@/services/app/booking";

import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { toast } from "react-toastify";
import { Div, DivFlex, H1 } from "./index.style";

import { DataGridStyle, StyleGrid } from "../booking/component/index.style";

export default function PrintForm(bookingData: any) {
  const [respData, setRespData] = React.useState<any>([]);
  const [isPrintData, setIsPrintData] = React.useState(false);

  const handleOpenModal = async (id: any) => {
    if (id) {
      try {
        const resp = await getPrintBookingbyId(id.toString());
        resp.payment_method = [resp.payment_method] as any;
        setRespData(resp.service_detail);
        setIsPrintData(true);
      } catch (err: any) {
        console.log("error", err);
        setIsPrintData(false);
        toast.error(`Unable to get booking with ${id} due to ${err.message} `);
      }
    }
  };
  useEffect(() => {
    if (isPrintData) {
      window.print();
    }
  }, [isPrintData]);

  useEffect(() => {
    if (bookingData.id !== undefined) {
      handleOpenModal(bookingData.id);
    }
  }, [bookingData.id]);
  const columns: GridColDef[] = [
    { field: "service_name", headerName: "Service", width: 200 },
    {
      field: "room_name",
      headerName: "Room",
      width: 200,
      editable: true,
    },
    {
      field: "therapists",
      headerName: "Therapists ",
      width: 300,
      editable: true,
    },
    {
      field: "optional_therapists",
      headerName: "Optional Therapists ",
      width: 250,
      editable: true,
    },
    {
      field: "booked_time",
      headerName: "Time Slot",
      type: "number",
      width: 250,
      editable: true,
      align: "left",
    },
  ];

  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <DivFlex>
        <H1>{`Booking # ${bookingData.id}`}</H1>
      </DivFlex>
      <Paper elevation={5}>
        <Div>
          <DataGridStyle
            style={{ height: "75vh" }}
            autoHeight={false}
            columns={columns}
            checkboxSelection={false}
            rows={respData}
            disableColumnMenu={true}
            disableRowSelectionOnClick={true}
            loading={false}
          />
        </Div>
      </Paper>
    </StyleGrid>
  );
}
