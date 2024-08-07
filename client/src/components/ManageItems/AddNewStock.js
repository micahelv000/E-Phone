import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import RowComponent from "./RowComponent";
import axios from "axios";

function AddNewStock() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://phone-specs-api.vercel.app/brands")
      .then((response) => {
        if (response.data.status) {
          setRows(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Brand Name</TableCell>
            <TableCell align="right">Device Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <RowComponent key={row.brand_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddNewStock;